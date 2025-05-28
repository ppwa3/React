import { NavLink } from "react-router-dom";

function TopNavi(props) {
  return (<>
    <nav>
      <NavLink to="/">Home</NavLink>&nbsp;&nbsp;
      <NavLink to="/regist">회원가입</NavLink>
    </nav>
  </>);
}
export default TopNavi;