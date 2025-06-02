import { Link } from "react-router-dom";
import { firestore } from "../../../config/firestoreConfig";
import { useState } from "react";
import { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";

//리스트
function FreeBoardList(props) {
  //게시글 목록을 저장할 state를 생성
  const [databoard, setDataBoard] = useState([]);

  useEffect(() => {
    const lists = databoard.map((row) => (
      <tr key={row.no}>
        <td className="cen">{row.content}</td>
        <td><Link to={"./view/" + row.no}>{row.title}</Link></td>
        <td className="cen">{row.writer}</td>
        <td className="cen">{row.date}</td>
      </tr>
    ));
  }, [databoard])


  //파이어스토어에서 게시글 목록을 가져오는 비동기 함수
  useEffect(() => {
    const fetchData = async () => {

      try {
        const querySnapshot = await getDocs(collection(firestore, "freeboard"));
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setDataBoard(posts);
      } catch (err) {
        console.error("데이터를 불러오는 중 오류 발생:", err);
        alert("오류가 발생했어요");
      }
    };
    fetchData();
  }, []);


  //row와 idx를 사용해서 새로운 JSX를 만듬
  //row는 props.freeboard안에 들어있는 하나의 게시글 정보이다.
  return (<>
    <div className="board-container">
      <Link to="/freewrite">글쓰기</Link>
      <header>
        <h2 className="board-title">💬 자유게시판</h2>
      </header>
      <div className="board-post-form">
        <button className="board-submit">작성하기</button>
      </div>
      <nav>
      </nav>
      <article>
        <table className="board-table">
          <thead>
            <tr>
              <th className="col-no">No</th>
              <th className="col-title">제목</th>
              <th className="col-writer">작성자</th>
              <th className="col-date">날짜</th>
            </tr>
          </thead>
          <tbody>
            {databoard.map((row) => (
              <tr key={row.no} className="board-row">
                <td className="cen">{row.no}</td>
                <td className="title-cell">
                  <Link to={`/freeview/${row.id}`} className="title-link">
                    {row.title}
                  </Link>
                </td>
                <td className="cen">{row.writer}</td>
                <td className="cen">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </div>
  </>);
}
export default FreeBoardList; 