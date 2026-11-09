import { publicUrl } from "../publicUrl";

export default function Footer() {
  const openPrivacy = (event) => {
    event.preventDefault();
    window.open(
      "https://www.keco.or.kr/web/lay1/S1T6C1348/contents.do",
      "",
      "width=790,height=700,scrollbars=yes",
    );
  };

  return (
    <footer className="footer-wrap">
      <div className="footer-info">
        <div className="footer-inner">
          <div className="footer-logo">
            <img src={publicUrl("/images/logo-w.png")} alt="측정인" />
          </div>
          <div className="footer-txt">
            <span>환경측정분석 정보관리시스템 : eco-measure@keco.or.kr</span>
            <span>한국환경공단 : 1833-4006</span>
            <span>한국환경보전원 : 1533-1039</span>
            <ul className="footer-nav">
              <li>
                <a href="https://www.keco.or.kr/web/lay1/S1T6C1348/contents.do" onClick={openPrivacy}>
                  개인정보 처리방침
                </a>
              </li>
            </ul>
            <cite>COPYRIGHT©2024 K-eco.ALL RIGHT RESERVED.</cite>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn-gotop"
        title="상단으로 이동"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </footer>
  );
}
