import { Link } from "react-router-dom";



const saveUser = (e) => {
  e.preventDefault();
  localStorage.setItem("user", e.target.username.value );//userId가 키, react가 값 -> 저장할값
  console.log('실행됨' );
};


function Log(props) {

  const getUser = () => {
    const savedId = localStorage.getItem("user");
    if(savedId !== null){
      console.log('로그인 이미 했음', savedId);
    }
    else{
      console.log('로그인 안됨', savedId);
    }
  }
  const logout = () => {
    localStorage.clear("user");
  }
  

  return (<>
    <Link to="/">Home</Link>
    <h2>로그인</h2>
    <div className="login-container">
      <form className="login-form"
        onSubmit={(e)=>saveUser(e)}>
        <input type="text" placeholder="아이디" id="inputId" name="username" className="input-field" />
        <input type="password" placeholder="비밀번호" name="password" className="input-field" />
        <button type="submit" className="login-button">로그인</button>
        <div className="login-links">
          <a href="#">아이디 찾기</a>
          <span>|</span>
          <a href="#">비밀번호 찾기</a>
          <span>|</span>
          <a href="#">회원가입</a>
        </div>
      </form>
      <button type="button" onClick={getUser}>getID</button>
      <button type="button" onClick={logout}>로그아웃</button>
    </div>
  </>);
}
export default Log; 