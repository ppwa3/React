function Regist(props) {
  return (<>
    <div className="signup-container">
      <h2>회원가입</h2>
      <form className="signup-form">
        <table className="signup-table">
          <tbody>
            <tr>
              <th><label htmlFor="user-id">아이디</label></th>
              <td>
                <input type="text" id="user-id" name="userId" className="input-text" />
                <button type="button" className="btn-secondary">중복확인</button>
              </td>
            </tr>
            <tr>
              <th><label htmlFor="user-password">패스워드</label></th>
              <td><input type="password" id="user-password" name="password" className="input-text" /></td>
            </tr>
            <tr>
              <th><label htmlFor="user-password-confirm">패스워드 확인</label></th>
              <td><input type="password" id="user-password-confirm" name="passwordConfirm" className="input-text" /></td>
            </tr>
            <tr>
              <th><label htmlFor="user-name">이름</label></th>
              <td><input type="text" id="user-name" name="userName" className="input-text" /></td>
            </tr>
            <tr>
              <th><label htmlFor="user-email-id">이메일</label></th>
              <td className="email-wrapper">
                <input type="text" id="user-email-id" name="emailId" className="input-email" /> @
                <input
                  type="text"
                  id="user-email-domain"
                  name="emailDomain"
                  className="input-email"
                  value={emailDomain}
                  onChange={(e) => setEmailDomain(e.target.value)}
                />
                <select id="email-select" className="select-email" onChange={handleEmailSelectChange}>
                  <option value="">직접입력</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                </select>
              </td>
            </tr>
            <tr>
              <th><label htmlFor="user-phone">휴대전화번호</label></th>
              <td><input type="tel" id="user-phone" name="phone" className="input-text" /></td>
            </tr>
            <tr>
              <th><label htmlFor="user-zipcode">우편번호</label></th>
              <td>
                <input type="text" id="user-zipcode" name="zipcode" className="input-text short" />
                <button type="button" className="btn-secondary">우편번호찾기</button>
              </td>
            </tr>
            <tr>
              <th><label htmlFor="user-address1">기본주소</label></th>
              <td><input type="text" id="user-address1" name="address1" className="input-text" /></td>
            </tr>
            <tr>
              <th><label htmlFor="user-address2">상세주소</label></th>
              <td><input type="text" id="user-address2" name="address2" className="input-text" /></td>
            </tr>
          </tbody>
        </table>
        <div className="signup-submit">
          <button type="submit" className="btn-primary">회원가입</button>
        </div>
      </form>
    </div>
  </>);
}
export default Regist;
