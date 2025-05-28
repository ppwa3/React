import { Link } from "react-router-dom";

function InforMem(props) {
  return (<>
    <Link to="/">Home</Link>
    <h2>회원정보수정</h2>
    <div class="profile-container">
    <form class="profile-form">
      <input type="text" placeholder="이름" name="name" class="input-field" />
      <input type="text" placeholder="아이디" name="username" class="input-field" disabled />
      <input type="password" placeholder="새 비밀번호" name="password" class="input-field" />
      <input type="password" placeholder="새 비밀번호 확인" name="confirmPassword" class="input-field" />
      <input type="email" placeholder="이메일" name="email" class="input-field" />
      <input type="text" placeholder="휴대전화번호" name="phone" class="input-field" />
      <input type="text" placeholder="우편번호" name="zipcode" class="input-field" />
      <input type="text" placeholder="기본주소" name="address1" class="input-field" />
      <input type="text" placeholder="상세주소" name="address2" class="input-field" />
      <button type="submit" class="save-button">저장하기</button>
    </form>
  </div>
  </>); 
}
export default InforMem; 