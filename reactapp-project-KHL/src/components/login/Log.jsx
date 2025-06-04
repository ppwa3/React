import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firestore } from "../../config/firestoreConfig";
import { collection, getDocs } from "firebase/firestore";

/*이 컴포넌트는 로그인 기능을 담당하는 컴포넌트 입니다.
Firestore에 저장된 회원 정보를 불러와서 사용자가 입력한 아이디/비밀번호와 비교
하여 로그인 처리를 하는 부분 */

function Log(props) {
  //로그인 상태를 저장하는 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //로그인 시 useEffect 재실행을 위한 트리거
  const [trigger, setTrigger] = useState(false);
  //전체 회원 정보를 배열에 저장
  const [allMembers, setAllMebers] = useState([]);

  const navigate = useNavigate();
  //로그인 시 실행되는 함수
  const saveUser = async (e) => {
    e.preventDefault();
    //전체 회원 목록에서 아이디랑 비밀번호가 일치하는지 확인
    for(let i = 0 ; i<allMembers.length ; i++) {
      if(e.target.inputId.value == allMembers[i].id && e.target.inputPw.value == allMembers[i].pass){
        alert("환영합니다♥");
        localStorage.setItem("user", e.target.username.value);//userId가 키, react가 값 -> 저장할값
        navigate("/");
        window.location.reload();
        setTrigger(!trigger);
        return;
      }
    }
    alert("로그인에 실패하였습니다.");
    console.log('실행됨');
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
 

  const getMembers = async () => {
    const savedId = await getDocs(collection(firestore, "members" ));
    const members = [];
    //forEach : map이랑 기능은 똑같지만 return값이 없음
    savedId.forEach((doc) => {
      const member = doc.data();
      members.push({
        id: member.id,
        pass: member.pass
      })
    })
    setAllMebers(members);
  }

  useEffect(()=>{
    getUser();
    getMembers();
  },[trigger]);
// 로그인 화면이 뜨는 곳
// form안에 아이디와 비밀번호 입력창, 로그인버튼 그리고 링크3개가 있다.
  return (<>
    <h2>로그인</h2>
    <div className="login-container">
      <form className="login-form"
        onSubmit={(e) => saveUser(e)}>
        <input type="text" placeholder="아이디" id="inputId" name="username" className="input-field"  />
        <input type="password" placeholder="비밀번호" id="inputPw" name="password" className="input-field" />
        <button type="submit" className="login-button" onClick={getUser}>로그인</button>
        <div className="login-links">
          <a href="#">아이디 찾기</a>
          <span>|</span>
          <a href="#">비밀번호 찾기</a>
          <span>|</span>
          <a href="/joinmem" style={{}}>회원가입</a>
        </div>
      </form>
    </div>
  </>);
}
export default Log; 