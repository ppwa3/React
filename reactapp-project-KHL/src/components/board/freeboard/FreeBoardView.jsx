import { Link } from "react-router-dom";
import {  } from "../../../config/firestoreConfig";

function FreeBoard(props) {
  

  return (<>
 <Link to="/">Home</Link>
 <div className="board-container">
  <h2 className="board-title">💬 자유게시판</h2>
  <div className="board-post-form">
    <input type="text" placeholder="제목을 입력하세요" className="board-input title" />
    <textarea placeholder="내용을 입력하세요" className="board-input content"></textarea>
    <button className="board-submit">작성하기</button>
  </div>

  <ul className="board-posts">
    <li className="post-item">
      <h3 className="post-title">첫 번째 게시글</h3>
      <p className="post-content">화장품 추천해요! 다들 어떤 거 쓰세요?</p>
      <span className="post-meta">작성자: 뷰티러버 · 2025-05-30</span>
    </li>
    <li className="post-item">
      <h3 className="post-title">오늘 콜라겐 먹었어요</h3>
      <p className="post-content">매일 챙겨먹기 쉽지 않지만 효과 믿고 열심히!</p>
      <span className="post-meta">작성자: 건강맨 · 2025-05-29</span>
    </li>
  </ul>
</div>
  </>); 
}
export default FreeBoard; 