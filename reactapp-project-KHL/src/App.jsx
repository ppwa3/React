//컴포넌트 경로가 바뀌면 바뀐걸로 쓰기
import { Routes, Route } from "react-router-dom";
import InforMem from './components/login/informem';
import JoinMem from "./components/login/JoinMem";
import Log from "./components/login/Log";
import DataBoard from "./components/board/databoard";
import FreeBoard from "./components/board/freeboard";
import QABoard from "./components/board/QAboard";
import Home from "./Home";

function App() {
   return (<>
      <div className="form-group">
         <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/informem" element={<InforMem/>}></Route>
            <Route path="/joinmem" element={<JoinMem/>}></Route>
            <Route path="/login" element={<Log/>}></Route>
            <Route path="/data" element={<DataBoard/>}></Route>
            <Route path="/free" element={<FreeBoard/>}></Route>
            <Route path="/qa" element={<QABoard/>}></Route>
            {/* <Route path="/signform" element={<SignupForm/>}></Route> */}
         </Routes>
      </div>

   </>);
}

export default App
