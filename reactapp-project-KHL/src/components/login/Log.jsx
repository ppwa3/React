import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Log(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const navigate = useNavigate();

  const saveUser = (e) => {
    e.preventDefault();
    localStorage.setItem("user", e.target.username.value);//userId가 키, react가 값 -> 저장할값
    console.log('실행됨');
    setTrigger(!trigger);
    navigate("/");
  };
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
    localStorage.clear("user");
    setTrigger(!trigger);
  }

  useEffect(()=>{
    getUser();
  },[trigger]);

  return (<>
    <h2>로그인</h2>
    <div className="login-container">
      <form className="login-form"
        onSubmit={(e) => saveUser(e)}>
        <input type="text" placeholder="아이디" id="inputId" name="username" className="input-field"  />
        <input type="password" placeholder="비밀번호" name="password" className="input-field" />
        {isLoggedIn ? 
        (<button type="button" onClick={logout}>로그아웃</button>):
        (<button type="submit" className="login-button" onClick={getUser}>로그인</button>)}
        <div className="login-links">
          <a href="#">아이디 찾기</a>
          <span>|</span>
          <a href="#">비밀번호 찾기</a>
          <span>|</span>
          <a href="#">회원가입</a>
        </div>
      </form>
    </div>
  </>);
}
export default Log; 