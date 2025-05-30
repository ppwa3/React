import { Link } from "react-router-dom";
import { firestore } from "../../../config/firestoreConfig";
//리스트
function FreeBoard(props) {
  const lb = async (newMem) => {
      await setDoc(doc(firestore, "members", newMem.id), newMem);
    }
  
//row와 idx를 사용해서 새로운 JSX를 만듬
//row는 props.freeboard안에 들어있는 하나의 게시글 정보이다.
const lists = props.freeboard.map((row)=>{
  return (
    <tr key={row.no}>
      {/* row.no : 게시글 번호 출력 */}
      <td className="cen">{row.no}</td>
      <td><Link to={"/view/"+row.no}>{row.title}</Link></td>
      <td className="cen">{row.writer}</td>
      <td className="cen">{row.date}</td>
    </tr>
  );
});
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