import { Route, Routes } from "react-router-dom";

import Home from './components/Home';
import TopNavi from './components/TopNavi';
import Regist from "./components/members/Regist";

const Home = () => {
  return (<>
    <h2>React 애플리케이션 제작하기</h2>
  </>);
}
function App() {
  return (<>
    <TopNavi />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Regist />} />
      
    </Routes>
  </>)
}

export default App
