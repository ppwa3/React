import { Link } from "react-router-dom";

function Log(props) {
  return (<>
    <Link to="/">Home</Link>
    <h2>로그인</h2>
    <body>
      <div class="login-container">
        <form class="login-form">
          <input type="text" placeholder="아이디" name="username" class="input-field" />
          <input type="password" placeholder="비밀번호" name="password" class="input-field" />
          <button type="submit" class="login-button">로그인</button>
          <div class="login-links">
            <a href="#">아이디 찾기</a>
            <span>|</span>
            <a href="#">비밀번호 찾기</a>
            <span>|</span>
            <a href="#">회원가입</a>
          </div>
        </form>
      </div>
    </body>
  </>);
}
export default Log; 