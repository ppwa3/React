import { Routes, Route } from "react-router-dom";
import InforMem from "./login/informem";
import JoinMem from "./login/joinmem";
import Log from "./login/log";
import DataBoard from "./board/databoard";
import FreeBoard from "./board/freeboard";
import QABoard from "./board/QAboard";
import Home from "./Home";

function App() {
   return (<>
      
      <Routes>
         <Route path="/" element={<Home/>}></Route>
         <Route path="/informem" element={<InforMem/>}></Route>
         <Route path="/joinmem" element={<JoinMem/>}></Route>
         <Route path="/login" element={<Log/>}></Route>
         <Route path="/data" element={<DataBoard/>}></Route>
         <Route path="/free" element={<FreeBoard/>}></Route>
         <Route path="/qa" element={<QABoard/>}></Route>
      </Routes>

   </>);
}

export default App
