import { Link } from "react-router-dom";
import { firestore } from "../../../config/firestoreConfig";
import { useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

function FreeBoardWrite(props) {
  //databoard : 미니냉장고 같은 역할 -> firestore에 이동
  const [databoard, setDataBoard] = useState(
    {
      no: '',
      title: "",
      content: "",
      writer: "",
      date: "",
    },
  );
  const getNextId = () => {
    /*로컬스토리지에서 board_id를 관리하며 새 글을 쓸 때마다 자동으로 1씩
    증가된 key를 생성하고 이 고유번호를 firestore에 함께 저장한다.*/
    const current = localStorage.getItem("board_id");
    const nextId = current ? parseInt(current) + 1 : 1;
    localStorage.setItem("board_id", nextId);
    return nextId;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataBoard({
      ...databoard, [name]: value,
    });
  };
  //날짜구현
  function nowDate() {
    const now = new Date();

    const pad = (num) => String(num).padStart(2, '0');

    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1); // 0-based
    const day = pad(now.getDate());

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const handleWrite = async (e) => {
    if (databoard.title === "" || databoard.content === "") {
      alert("제목과 내용을 모두 입력해주세요");
      return;
    }
    const newId = getNextId();
    const newPost = {
      no: newId,
      title: databoard.title,
      content: databoard.content,
      writer: databoard.writer,
      date: nowDate()
    };
    await setDoc(doc(firestore, "freeboard", String(newPost.no)), { ...newPost });

    setDataBoard(newPost);
  };

  return (<>
    <div className="board-container">
      {/* 상단 버튼 */}
      <div className="button-group">
        <Link to="/" className="nav-button">🏠 Home</Link>
        <Link to="/freelist" className="nav-button">📄 목록</Link>
      </div>

      {/* 제목 */}
      <h2 className="board-title">💬 자유게시판</h2>

      {/* 글 작성 폼 */}
      <form
        className="write-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleWrite();
          console.log("완료");
        }}
      >
        <input
          type="text"
          name="title"
          value={databoard.title}
          placeholder="제목을 입력하세요"
          onChange={handleChange}
          className="input-title"
        />
        <textarea
          name="content"
          value={databoard.content}
          placeholder="내용을 입력하세요"
          onChange={handleChange}
          rows="4"
          className="input-content"
        />
        <button type="submit" className="submit-button">✏️ 작성하기</button>
      </form>

      {/* 게시글 목록 테이블 */}
      <table className="board-table">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {/* 게시글 목록은 여기 map으로 출력하면 돼요 */}
          {/* posts.map((post, index) => ( ... )) */}
        </tbody>
      </table>
    </div>
  </>);
}

export default FreeBoardWrite; 