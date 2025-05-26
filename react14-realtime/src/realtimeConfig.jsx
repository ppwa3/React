  // 파이어베이스 서비스에 연결하기 위한 임포트
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_apikey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  databaseURL: import.meta.env.VITE_databaseURL
};


// firebase에 연결 후 앱 초기화
const app = initializeApp(firebaseConfig);
// firestore 사용을 위한 객체 생성
const realtime = getDatabase(app);
// 익스토프(내보내기)
export { realtime};