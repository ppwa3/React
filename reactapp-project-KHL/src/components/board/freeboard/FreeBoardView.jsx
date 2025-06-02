import { Link, useNavigate, useParams } from "react-router-dom";
import { firestore } from "../../../config/firestoreConfig";
import { useEffect, useState } from "react";
import { getDoc, deleteDoc, doc } from "firebase/firestore";

function FreeBoardView(props) {
  //지금 데이터를 불러오는 중이에요 라는 의미로 loading을 true로 시작
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState();
  const params = useParams();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(firestore, "freeboard", id)); // 파이어스토어에서 삭제
      setPost((prevPosts) => prevPosts.filter((post) => post.id !== id)); // 화면에서도 제거
      alert("게시글이 삭제되었어요");
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제하는 데 문제가 생겼어요. 다시 시도해 주세요.");
    }
  };
  useEffect(() => {
    //게시글을 불러오는 비동기 함수 만들기
    const fetchPosts = async () => {
      try {
        //파이어스토어의 freeboard 라는 글 모음(컬렉션)에서 모든 글들을 가져옴
        const querySnapshot = await getDoc(doc(firestore, "freeboard", params.id));
        //가져온 글들을 배열로 바꿈
        const postsData =
        {
          id: querySnapshot.id,         // 글의 고유 ID
          ...querySnapshot.data(),      // 글 내용 전체 (제목, 작성자, 날짜 등)
        };
        //이 배열을 상태에 저장해서 화면에 글 목록을 보여주게 한다.
        setPost(postsData);
      } catch (error) {
        console.error("게시글을 불러오는 중 오류가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    //아까 만든 게시글 불러오는 함수 실행
    fetchPosts();
  }, []);


  return (
    <div>
      <header>
        <h2 className="board-title">💬 자유게시판</h2>
      </header>

      <nav>
        <Link to="/freewrite">글쓰기</Link>
      </nav>

      <article>
        {!post ? (
          <p>아직 작성된 글이 없어요. 첫 글을 작성해보세요!</p>
        ) : (
          <table className="board-table">
            <thead>
              <tr>
                <th className="col-no">No</th>
                <th className="col-title">제목</th>
                <th className="col-writer">작성자</th>
                <th className="col-date">날짜</th>
                <th className="col-action">삭제</th>
              </tr>
            </thead>
            <tbody>
              <tr className="post-row">
                <td className="cen">{post.no}</td>
                <td className="title-cell">
                  <Link to={`/freeview/${post.id}`} className="title-link">
                    {post.title}
                  </Link>
                </td>
                <td className="cen">{post.writer}</td>
                <td className="cen">{post.date}</td>
                <td className="cen">
                  <button onClick={() => {handleDelete(post.id); navigate("/freelist");}} className="delete-button">
                    삭제
                  </button>
                  <button onClick={() => {navigate("/freeedit/"+ params.id);}} className="delete-button">
                    수정
                  </button>
                </td>
              </tr>
              <tr className="content-row">
                <td colSpan={5} className="content-cell">
                  <div className="content-box">
                    <strong>📄 내용</strong>
                    <p>{post.content}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </article>
    </div>
  );
}
export default FreeBoardView; 