import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { firestore } from "../../config/firestoreConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";


function JoinMem() {
  const [fireId, setFireId] = useState([]);
  const [checkResult, setCheckResult] = useState(false);
  const navigate = useNavigate();

  // 데이터베이스에서 id 가져오는 함수
  const getCollection = async () => {
    let trArray = [];
    const querySnapshot = await getDocs(collection(firestore, "members"));
    querySnapshot.forEach((doc) => {
      let memberInfo = doc.data();
      console.log(memberInfo.id);

      trArray.push(memberInfo.id);
    });
    setFireId(trArray);
  }

  const showId = () => {
    const userId = document.getElementById('userId').value;
    if (userId.length < 4) {
      alert("아이디는 4글자 이상이어야합니다.");
      setCheckResult(false);
      return;
    }
    for (let i = 0; i < fireId.length; i++) {
      if (fireId[i] === userId) {
        alert("아이디가 중복되었습니다.");
        //중복된 아이디가 있으므로 사용불가능한 아이디를 나타낸다.
        setCheckResult(false);
        //break같은 느낌
        return;
      }
    }
    alert("사용가능한 아이디입니다.");
    setCheckResult(true);

  }

  useEffect(() => {
    // 우편번호 api 가져오기
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // db에서 가져오기
    getCollection();
  }, []);

  //우편번호 찾기
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

  const memberWrite = async (newMem) => {
    await setDoc(doc(firestore, "members", newMem.id), newMem);
    alert('회원가입 완료');
  }


  //console.log('회원가입 정보:', newMember);
  // alert('회원가입 완료!');
  //form.reset();
  return (<>
    <form onSubmit={(event) => {
      event.preventDefault();
      //회원가입
      let i = event.target.userId.value;
      let p = event.target.password.value;
      let n = event.target.name.value;

      let e = event.target.emailId.value;
      let ed = event.target.emailDomain.value;
      //`` : + 기호 안쓰고 문자열 만들때 쓰는거
      let em = `${e}@${ed}`;

      let p1 = event.target.phone1.value;
      let p2 = event.target.phone2.value;
      let p3 = event.target.phone3.value;
      let ph = `${p1}-${p2}-${p3}`;

      let z = event.target.zipcode.value;
      let r = event.target.roadadd.value;
      let d = event.target.detailadd.value;

      const newMember = {
        id: i,
        name: n,
        pass: p,
        email: em,
        phone: ph,
        zipcode: z,
        roadadd: r,
        detailadd: d
      };

      if (!checkResult) {
        alert("아이디가 사용가능한지 확인하세요.");
        return;
      }

      if (p !== event.target.confirmPassword.value) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
      }


      memberWrite(newMember);

      navigate("/");
    }}>
      <button><Link to="/">Home</Link></button>
      <h2>회원가입</h2>
      <div class="form-row">
        <div class="form-group">
          <label for="userId">아이디</label>
          <input type="text" id="userId" name="userId" required />
        </div>
        <div class="form-group">
          <label>&nbsp;</label>
          <button type="button" class="btn-check" onClick={showId}>중복확인</button>
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
          <input type="text" id="emailId" className="border rounded px-3 py-2 w-1/2"
            placeholder="example" />
        </div>
        <div class="form-group">
          <label for="emailDomain">도메인</label>
          <input type="text" id="emailDomain" name="emailDomain" class="readonly" readOnly={isCustom} required value={domain} onChange={(e) => { setDomain() }} />
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
          <input type="text" id="phone1" name="phone1" maxlength="3" required placeholder="010" onKeyUp={(e) => { commonFocusMove("phone1", 3, "phone2") }} />
        </div>
        <div class="form-group">
          <label>&nbsp;</label>
          <input type="text" id="phone2" name="phone2" maxlength="4" required onKeyUp={(e) => { commonFocusMove("phone2", 4, "phone3") }} />
        </div>
        <div class="form-group">
          <label>&nbsp;</label>
          <input type="text" id="phone3" name="phone3" maxlength="4" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="zipcode">우편번호</label>
          <input type="text" id="zipcode" name="zipcode" placeholder="우편번호" readOnly /><br />
        </div>
        <div class="form-group">
          <label>&nbsp;</label>
          <button type="button" onClick={handleAddressSearch} class="btn-check">주소 찾기</button><br />

        </div>
      </div>

      <div class="form-group">
        <label for="address1">기본주소</label>
        <input type="text" id="roadAddress" name="roadadd" placeholder="도로명 주소" readOnly /><br />
      </div>

      <div class="form-group">
        <label for="address2">상세주소</label>
        <input type="text" id="detailAddress" name="detailadd" placeholder="상세주소" required />
      </div>

      <button type="submit" class="submit-btn">회원가입</button>

    </form >
  </>);

};



export default JoinMem;

