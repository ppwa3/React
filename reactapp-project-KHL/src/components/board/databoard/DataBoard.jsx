import { Link } from "react-router-dom";
// 리스트(List)
function DataBoard(props) {

  return (<>
    <div class="board-container">
      <h2 class="board-title">📁 자료 게시판</h2>
      <table class="board-table"/>
        <p class="board-subtitle">콜라겐 / 기초케어 제품 관련 자료 및 사용팁을 공유합니다.</p>
        <table class="board-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
              <th>조회</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5</td>
              <td><a href="#">콜라겐 섭취와 피부 개선 효과</a></td>
              <td>뷰티매니저</td>
              <td>2025-05-28</td>
              <td>150</td>
            </tr>
            <tr>
              <td>4</td>
              <td><a href="#">기초케어 3단계 루틴 안내</a></td>
              <td>스킨연구소</td>
              <td>2025-05-27</td>
              <td>122</td>
            </tr>
            <tr>
              <td>3</td>
              <td><a href="#">콜라겐 제품 비교표 PDF</a></td>
              <td>마케팅팀</td>
              <td>2025-05-25</td>
              <td>98</td>
            </tr>
            <tr>
              <td>2</td>
              <td><a href="#">기초케어 제품 성분 사전</a></td>
              <td>에스테틱샵</td>
              <td>2025-05-24</td>
              <td>210</td>
            </tr>
            <tr>
              <td>1</td>
              <td><a href="#">고객 사용후기 수집 가이드</a></td>
              <td>운영자</td>
              <td>2025-05-22</td>
              <td>132</td>
            </tr>
          </tbody>
        </table>
        <div class="board-footer">
          <button class="write-button">자료 등록</button>
        </div>
    </div>

  </>);
}
export default DataBoard; 