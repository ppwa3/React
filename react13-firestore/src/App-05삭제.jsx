 // 파이어스토어 객체 임포트
import { useEffect, useState } from 'react';
import {firestore} from './firestoreConfig';
// 새로운 도큐먼트(문서)를 입력하거나 읽을때 사용하는 함수 임포트
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

function App() {
  const [showData, setShowData] = useState([]);

  //기존의 도큐먼트를 불러와서 select태그에 설정
  useEffect(()=>{
    const getCollection = async () => {
      let trArray = [];
      const querySnapshot = await getDocs(collection(firestore, "members"));
      querySnapshot.forEach((doc) => {
        let memberInfo = doc.data();
        trArray.push (
          <option key={doc.id} value={doc.id}>{memberInfo.name}</option>
        );
      });
      return trArray;
    }
    getCollection().then((result)=>{
      console.log('result', result);
      setShowData(result);
    });
  }, []);

  //input 태그의 설정된 값을 수정하기 위한 스테이트
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  return (<div>
    <div className='App'></div>
    <h2>Firebase - Firestore 연동 App</h2>
    <h3>개별 조회 및 삭제하기</h3>
    <form onSubmit={async (event) => {
      event.preventDefault();
      let id = event.target.id.value;
      console.log("삭제", id);
      if(id===''){alert('사용자를 먼저 선택해주세요'); return;}

      /** 선택한 아이디로 도큐먼트의 참조를 얻은 후에 deleteDoc 함수를
      실행해서 삭제한다.
       */
      await deleteDoc(doc(firestore, "members", event.target.id.value));

        setId('');
        setPass('');
        setName('');
      }}>
        <div className="input-group" id="myForm">
          <select className="form-control" onChange={async (e)=>{
            //select에서 사용한 항목의 데이터를 불러와서 input에 설정
            let user_id = e.target.value;
            //console.log("선택", user_id);
            const docRef = doc(firestore, "members", user_id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              //console.log("Document data:", docSnap.data());
              let callData = docSnap.data();
              setId(user_id);
              setPass(callData.pass);
              setName(callData.name);
            }
            else {
              console.log("No such document!");
            }
          }}>
            <option value="">선택하세요</option>
            {showData}
          </select>
          <button type='submit' className="btn btn-danger">삭제</button>
        </div>
        <table className='table table-bordered'>
        <tbody>
          <tr>
            <th>컬렉션(테이블)</th>
            <td><input type="text" name="collection" value="members"
                  className="form-control"/></td>
          </tr>
          <tr>
            <th>아이디(변경불가)</th>
            <td><input type="text" name="id" value={id} className="form-control"/></td>
          </tr>
          <tr>
            <th>비밀번호</th>
            <td><input type="text" name="pass" value={pass} className="form-control"/></td>
          </tr>
          <tr>
            <th>이름</th>
            <td><input type="text" name="name" value={name} className="form-control"/></td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
  ); 
}
export default App;