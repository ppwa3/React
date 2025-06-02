import { useParams, useNavigate } from "react-router-dom";
import { firestore } from "../../../config/firestoreConfig";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";

//리스트
function FreeBoardEdit(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  //게시글 목록을 저장할 state를 생성
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [nowdata, setNowData] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(firestore, "freeboard", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setNowData(data);
          setContent(data.content);
        } else {
          alert("게시글을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("게시글 불러오기 오류:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const docRef = doc(firestore, "freeboard", id);
      //setDoc은 덮어쓰기하는 친구
      await setDoc(docRef, { ...nowdata,
        title,
        content,
        updatedAt: new Date().toLocaleString(), // 수정 시간 기록
      });
      alert("게시글이 수정되었어요!");
      navigate("/freelist");
    } catch (error) {
      console.error("게시글 수정 오류:", error);
    }
  };

  return (<>
      <div className="p-4">
      <h2>게시글 수정</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"/>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} 
      placeholder="내용"/>
      <button onClick={handleUpdate}>수정</button>
    </div>
  </>);
}
export default FreeBoardEdit; 