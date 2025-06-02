//화면 이동을 위한 훅 임포트
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
import FreeBoardList from "./components/board/freeboard/FreeBoardList";
import FreeBoardView from "./components/board/freeboard/FreeBoardView";
import FreeBoardWrite from "./components/board/freeboard/FreeBoardWrite";
import FreeBoardEdit from "./components/board/freeboard/FreeBoardEdit";

const Layout = ({ isLoggedIn }) => {
  return (
    <div>
      <nav><TopNavi isLoggedIn={isLoggedIn} /></nav>
      <article>
        <Outlet />
      </article>
      <footer><Footer /></footer>
    </div>
  );
};

function App(props) {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="informem" element={<InforMem />} />
        <Route path="joinmem" element={<JoinMem />} />
        <Route path="login" element={<Log />} />
        <Route path="data" element={<DataBoard />} />
        <Route path="view" element={<DataBoardView />} />
        <Route path="/freeview/:id" element={<FreeBoardView />} />
        <Route path="freelist" element={<FreeBoardList />} />
        <Route path="freewrite" element={<FreeBoardWrite />} />
        <Route path="freeedit/:id" element={<FreeBoardEdit />} />
        <Route path="qa" element={<QABoard />} />
      </Route>
    </Routes>
  );
}

export default App;
