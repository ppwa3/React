import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firestore } from "../../config/firestoreConfig";
import { collection, getDocs } from "firebase/firestore";

function Log(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [allMembers, setAllMebers] = useState([]);

  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();

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
          <a href="/joinmem">회원가입</a>
        </div>
      </form>
    </div>
  </>);
}
export default Log; 