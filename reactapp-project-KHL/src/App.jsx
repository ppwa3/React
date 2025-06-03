//화면 이동을 위한 훅 임포트
import { Routes, Route, Outlet } from "react-router-dom";
import InforMem from "./components/login/inforMem";
import JoinMem from "./components/login/JoinMem";
import Log from "./components/login/Log";
import DataBoard from "./components/board/databoard/DataBoard";
import Home from "./Home";
import TopNavi from "./components/TopNavi";
import Footer from "./components/Footer";
import DataBoardView from "./components/board/databoard/DataBoardView";
import FreeBoardList from "./components/board/freeboard/FreeBoardList";
import FreeBoardView from "./components/board/freeboard/FreeBoardView";
import FreeBoardWrite from "./components/board/freeboard/FreeBoardWrite";
import FreeBoardEdit from "./components/board/freeboard/FreeBoardEdit";

import QnABoardList from "./components/board/QnAboard/QnABoardList";
import QnABoardWrite from "./components/board/QnAboard/QnABoardWrite";
import QnABoardView from "./components/board/QnAboard/QnABoardView";
import QnABoardEdit from "./components/board/QnAboard/QnABoardEdit";


const Layout = ({ isLoggedIn }) => {
  return (
    <div>
      <nav><TopNavi isLoggedIn={isLoggedIn} /></nav>
      <article className="mainback">
        <Outlet />
      </article>
      <footer><Footer /></footer>
    </div>
  );
};

function App(props) {
  // 라우터를 이용해서 경로에 따라 서로 다른 컴포넌트를 렌더링 해준다.
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/informem" element={<InforMem />} />
        <Route path="/joinmem" element={<JoinMem />} />
        <Route path="/login" element={<Log />} />
        <Route path="/data" element={<DataBoard />} />
        <Route path="/view" element={<DataBoardView />} />
        {/* 자유게시판 */}
        <Route path="/freeview/:id" element={<FreeBoardView />} />
        <Route path="/freelist" element={<FreeBoardList />} />
        <Route path="/freewrite" element={<FreeBoardWrite />} />
        <Route path="/freeedit/:id" element={<FreeBoardEdit />} />
        {/* 댓글구현이 가능한 QnA게시판 */}
        <Route path="/qnawrite" element={<QnABoardWrite />} />
        <Route path="/qnalist" element={<QnABoardList />} />
        <Route path="/qnaedit/:id" element={<QnABoardEdit />} />
        <Route path="/qnaview/:id" element={<QnABoardView />} />
        {/* 댓글 관련 컴포넌트 */}
        <Route path="/comm" element={<Comment />} />
      

      </Route>
    </Routes>
  );
}

export default App;
