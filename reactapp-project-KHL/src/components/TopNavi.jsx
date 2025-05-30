import { NavLink, Link } from "react-router-dom";

function TopNavi(props) {
  return (<>
    <nav>
      <NavLink to="/">Home</NavLink>&nbsp;&nbsp;
      <Link to="/informem">회원정보</Link><br />
      <Link to="/joinmem">회원가입</Link><br />
      <Link to="/login">로그인</Link><br />
      <Link to="/data">자료 게시판</Link><br />
      <Link to="/free">자유 게시판</Link><br />
      <Link to="/qa">Q&A 게시판</Link>
    </nav>
  </>);
}
export default TopNavi;