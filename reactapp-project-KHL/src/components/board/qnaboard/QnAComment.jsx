import { collection, getDocs, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../../config/firestoreConfig";
import { useParams } from "react-router-dom";

{/* 댓글 작성 버튼 */}
const CommentBtn = (props) => {
  return (<>
    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal" onClick={()=>props.newOpenModal()}>
      댓글 작성
    </button>
  </>);
}

{/* 댓글 작성 Modal */}
function ModalWindow(props) {
  return (<>
    <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="commentModalLabel">댓글 작성</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {/* 작성자명 입력 상자 추가 */}
                    <div className="mb-3">
                        <label htmlFor="commentAuthor" className="form-label">작성자명</label>
                        <input type="text" className="form-control" id="commentAuthor" placeholder="이름을 입력하세요" 
                          value={props.iWriter} onChange={(e) => props.setIWriter(e.target.value)}/>
                    </div>
                    {/* 댓글 입력 상자*/}
                    <label htmlFor="commentContent" className="form-label">댓글 내용</label>
                    <textarea className="form-control" id="commentContent" rows="3" placeholder="댓글을 입력하세요"
                      value={props.iContents} onChange={(e) => props.setIContents(e.target.value)}></textarea>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                    <button type="button" className="btn btn-primary" onClick={props.saveComment} data-bs-dismiss="modal">작성</button>
                </div>
            </div>
        </div>
    </div>
  </>); 
}
 
function CommentList(props) {
  return (<>{
    props.qnaComment.map((row)=>{
      return (
        <ul className="list-group mt-3" key={Math.random()}>
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <strong>{row.writer}</strong> <small className="ms-2">{row.postdate}</small>
              </div>
              <div>
                <button className="btn btn-outline-success btn-sm" onClick={()=>props.likePlus(row.idx)}>좋아요 ({row.likes})</button>
                <button className="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-target="#commentModal" onClick={()=>props.editComment(row.idx)}>수정</button>
                <button className="btn btn-outline-danger btn-sm" onClick={()=>props.deleteComment(row.idx)}>삭제</button>
              </div>
            </div>
            <p className="mt-2 mb-0">
                {row.contents}
            </p>
          </li>
        </ul>
      )
    })
  }</>); 
}

const QnAComment = () => {
  const [qnaComment, setQnaComment] = useState([
    {idx:1 , writer:'낙자쌤', postdate:'2025-05-27', contents: '내용 블라블라', 
      likes: 0},
  ]);
const [loading, setLoading] = useState(true);

  //파이어스토어 연결
  useEffect(() => {
    //게시글을 불러오는 비동기 함수 만들기
    const fetchComment = async () => {
      try {
        //파이어스토어의 freeboard 라는 글 모음(컬렉션)에서 모든 글들을 가져옴
        //Doc을 여러개 하면 collection이얌
        const querySnapshot = await getDocs(collection(firestore, "qnacomment"));
        //가져온 글들을 배열로 바꿈
        const postsData = querySnapshot.map((doc)=>{
          return({
            id: doc.id,         // 글의 고유 ID
            ...doc.data(),      // 글 내용 전체 (제목, 작성자, 날짜 등)
          });

        })
        //이 배열을 상태에 저장해서 화면에 글 목록을 보여주게 한다.
        setQnaComment(postsData);
      } catch (error) {
        console.error("게시글을 불러오는 중 오류가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    //아까 만든 게시글 불러오는 함수 실행
    fetchComment();
  }, []);


  //입력상자
  const [iWriter, setIWriter] = useState('');
  const [iContents, setIContents] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  //시퀀스
  const [nextVal, setNextVal] = useState(2);

  //댓글 작성 및 수정
  const saveCom = () => {
    
    if(editIdx===null){ // 댓글 작성
      const sysdate = new Date().toISOString().slice(0, 16).replace('T', ' ');
      const newData = {
        idx:nextVal , writer:iWriter, postdate:sysdate, contents: iContents, likes: 0
      };
      setQnaComment([...qnaComment, newData]); 
      
      setNextVal(nextVal+1);
    }
    else{ //댓글 수정
      const editData = boardData.map(row => {
        return (row.idx===editIdx) ? {...row, writer:iWriter, contents: iContents} : row;
      });
      setBoardData(editData);
    }

    setIWriter('');
    setIContents('');    
  }

  //좋아요
  const likePlus = (idx) => {
    const newData = boardData.map(row => {
      return (row.idx===idx) ? {...row, likes: row.likes+1} : row;
    });
    setBoardData(newData);
  }

  //댓글삭제
  const params = useParams();
  const deleteCom = async (id) => {
    if(confirm('댓글을 삭제할까요?')){
      try {
        await deleteDocs(collection(firestore, 'qnacomment', id));
        const filtered = qnaComment.filter(c => c.id !== id);
        setQnaComment(filtered);
      } catch (err) {
        console.error("댓글 삭제 실패", err);
      }
    }
  }

  //댓글수정
  const editComment = (idx) => {
    console.log(`${idx}번 게시물 수정하기`);
    const editData = boardData.find(row => row.idx === idx);
    if (editData) {
      setIWriter(editData.writer);
      setIContents(editData.contents);
      setEditIdx(idx);
    }
  }
    
  //댓글 작성을 위해 모달창을 열면 입력폼 초기화
  const newOpenModal = () => {
    setIWriter('');
    setIContents('');
    setEditIdx(null);
  };

  return (<>
    <div className="container mt-4">
      {/* 버튼 */}
      <CommentBtn newOpenModal={newOpenModal} /> 
      {/* 댓글 입력창 */}
      <ModalWindow qnaComment={qnaComment} setQnaComment={setQnaComment} 
        saveCom={saveCom} 
        iWriter={iWriter} setIWriter={setIWriter} 
        iContents={iContents} setIContents={setIContents} /> 
           {/* 데이터베이스에 있는 댓글 내용 */}
      <CommentList qnaComment={qnaComment} likePlus={likePlus} 
        deleteCom={deleteCom} editComment={editComment} />
    </div>
  </>);
};

export default QnAComment;