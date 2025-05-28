import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";


//우편번호 찾기
function JoinMem() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        document.getElementById("zipcode").value = data.zonecode;
        document.getElementById("roadAddress").value = data.roadAddress;
        document.getElementById("detailAddress").focus();
      }
    }).open();
  };

  //이메일 채우기
  const [isCustom, setIsCustom] = useState(false);
  const [domain, setDomain] = useState('');

  //휴대전화
  function commonFocusMove(thisObj, numLength, nextObj) {
    let input = document.getElementById(thisObj);
    let strLen = input.value.length;
    if (strLen == numLength) {
      document.getElementById(nextObj).focus();
    }
  }
  return (<>
    <Link to="/">Home</Link>
    <h2>회원가입</h2>
    <form>
      <div class="form-row">
        <div class="form-group">
          <label for="userId">아이디</label>
          <input type="text" id="userId" name="userId" required />
        </div>
        <div class="form-group">
          <label>&nbsp;</label>
          <button type="button" class="btn-check">중복확인</button>
        </div>
      </div>

      <div class="form-group">
        <label for="password">패스워드</label>
        <input type="password" id="password" name="password" required />
      </div>

      <div class="form-group">
        <label for="confirmPassword">패스워드 확인</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required />
      </div>

      <div class="form-group">
        <label for="name">이름</label>
        <input type="text" id="name" name="name" required />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="emailId">이메일</label>
          <input type="text" className="border rounded px-3 py-2 w-1/2"
            placeholder="example" />
        </div>
        <div class="form-group">
          <label for="emailDomain">도메인</label>
          <input type="text" id="emailDomain" name="emailDomain" class="readonly" readOnly={isCustom} value={domain} onChange={(e) => { setDomain() }} />
          <select id="emailSelect" onChange={(e) => {
            const selected = e.target.value;
            if (selected === '') {
              setIsCustom(false);
              setDomain('');
            } else {
              setIsCustom(true);
              setDomain(selected);
            }
          }}>
            <option value="">직접입력</option>
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            <option value="daum.net">daum.net</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="phone1">휴대전화</label>
          <input type="text" id="phone1" name="phone1" maxlength="3" required placeholder="010" onKeyUp={(e) => {commonFocusMove("phone1",3,"phone2")} }/>
        </div>
        <div class="form-group">
          <label>&nbsp;</label>
          <input type="text" id="phone2" name="phone2" maxlength="4" required onKeyUp={(e) => {commonFocusMove("phone2",4,"phone3")} }/>
        </div>
        <div class="form-group">
          <label>&nbsp;</label>
          <input type="text" id="phone3" name="phone3" maxlength="4" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="zipcode">우편번호</label>
          <input type="text" id="zipcode" placeholder="우편번호" readOnly /><br />
        </div>
        <div class="form-group">
          <label>&nbsp;</label>
          <button type="button" onClick={handleAddressSearch} class="btn-check">주소 찾기</button><br />

        </div>
      </div>

      <div class="form-group">
        <label for="address1">기본주소</label>
        <input type="text" id="roadAddress" placeholder="도로명 주소" readOnly /><br />
      </div>

      <div class="form-group">
        <label for="address2">상세주소</label>
        <input type="text" id="detailAddress" placeholder="상세주소" />
      </div>

      <button type="submit" class="submit-btn">회원가입</button>

    </form>
  </>);
};


export default JoinMem;

