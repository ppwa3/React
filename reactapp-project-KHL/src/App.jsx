// App.js
import { Routes, Route, Outlet } from "react-router-dom";
import InforMem from "./components/login/inforMem";
import JoinMem from "./components/login/JoinMem";
import Log from "./components/login/Log";
import DataBoard from "./components/board/databoard/DataBoard";
import QABoard from "./components/board/QAboard";
import Home from "./Home";
import TopNavi from "./components/TopNavi";
import Footer from "./components/Footer";
import DataBoardView from "./components/board/databoard/DataBoardView";
import FreeBoard from "./components/board/freeboard/FreeBoard";

const Layout = ({ isLoggedIn }) => {
  return (
    <div>
      <header><TopNavi isLoggedIn={isLoggedIn} /></header>
      <article>
        <Outlet />
      </article>
      <footer><Footer /></footer>
    </div>
  );
};

function App() {

  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="informem" element={<InforMem />} />
        <Route path="joinmem" element={<JoinMem />} />
        <Route path="login" element={<Log />} />
        <Route path="data" element={<DataBoard />} />
        <Route path="view" element={<DataBoardView />} />
        <Route path="free" element={<FreeBoard />} />
        <Route path="qa" element={<QABoard />} />
        
      </Route>
    </Routes>
  );
}

export default App;
