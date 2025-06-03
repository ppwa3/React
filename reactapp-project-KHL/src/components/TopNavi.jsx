import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function TopNavi(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const getUser = () => {
    const savedId = localStorage.getItem("user");
    if (savedId !== null) {
      console.log('로그인 이미 했음', savedId);
      setIsLoggedIn(true);
    }
    else {
      console.log('로그인 안됨', savedId);
      setIsLoggedIn(false);
    }
  }
  const logout = () => {
    //removeItem은 지정한 부분만 지움
    localStorage.removeItem("user");
    navigate("/login");
    //새로고침하는 함수
    window.location.reload();
  }
  useEffect(() => {
    getUser();
  }, [])


  return (<>
    <nav className="nav">
      <h3> 𝑩𝒆𝒍𝒖𝒔𝒉𝒊 𝑪𝒐𝒎𝒑𝒂𝒏𝒚</h3>
      <Link to="/">Home</Link>&nbsp;&nbsp;
      {isLoggedIn ?
        (<Link to="/informem">회원정보</Link>) :
        (<Link to="/joinmem">회원가입</Link>)}<br />
      <Link to="/data">자료 게시판</Link><br />
      <Link to="/freewrite">자유 게시판</Link><br />
      <Link to="/qnalist">Q&A 게시판</Link><br />
      {/* 삼항연산자를 사용해서 로그인 상태에 따른 렌더링 */}
      {isLoggedIn ?
        (<button type="button" onClick={logout}>로그아웃</button>) :
        (<Link to="/login">로그인</Link>)}
    </nav>
  </>);
}
export default TopNavi;