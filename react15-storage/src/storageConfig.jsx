  // 파이어베이스 서비스에 연결하기 위한 임포트
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_apikey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};


// firebase에 연결 후 앱 초기화
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://myreactapp-9f1f9.firebasestorage.app");
// 익스토프(내보내기)
export { storage };