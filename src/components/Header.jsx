import { useEffect, useState } from "react";
import { MENUS } from "../data/main";
import { publicUrl } from "../publicUrl";

function MenuLabel({ label }) {
  const lines = label.split("\n");
  return lines.map((line, index) => (
    <span key={line}>
      {index > 0 && <br />}
      {line}
    </span>
  ));
}

function stay(event) {
  event.preventDefault();
}

export default function Header({ noticeOpen, onOpenNotice }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [gnbOn, setGnbOn] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState({});

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 1);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobile = (key) => {
    setMobileOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={`header-wrap${sticky ? " sticky" : ""}${gnbOn ? " on" : ""}`}>
      <div className="header">
        <h1>
          <a href="/" onClick={stay}>
            <span className="hidden">측정인</span>
          </a>
        </h1>

        <nav
          className="gnb-wrap ty02"
          onMouseEnter={() => setGnbOn(true)}
          onMouseLeave={() => setGnbOn(false)}
        >
          <ul className="gnb">
            {MENUS.map((menu) => (
              <li key={menu.label} className={gnbOn ? "on" : ""}>
                <a href={menu.href} onClick={stay}>
                  {menu.label}
                </a>
                <div className={`gnb-dep2${gnbOn ? " on" : ""}`}>
                  <ul>
                    {menu.items.map((item) => (
                      <li key={item.href + item.label}>
                        <a href={item.href} onClick={stay}>
                          <MenuLabel label={item.label} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
          <div className="gnb-bg" />
        </nav>

        <nav className="mobile-gnb-wrap">
          <button type="button" className="gnb-open" onClick={() => setMenuOpen(true)}>
            <span className="hidden">모바일 메뉴</span>
          </button>
          <div className="mobile-gnb" style={{ display: menuOpen ? "block" : "none" }}>
            <img src={publicUrl("/images/logo-w.png")} alt="측정인" className="mo-nav-logo" />
            <ul>
              <li className={mobileOpen.notice ? "on" : ""}>
                <a href="#notice" className="on" onClick={(event) => { event.preventDefault(); toggleMobile("notice"); }}>
                  공지사항
                </a>
                <div className={`gnb-dep2${mobileOpen.notice ? " on" : ""}`}>
                  <ul>
                    <li>
                      <a href="/cm/pub/notify.go" onClick={stay}>공지사항</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className={mobileOpen.system ? "on" : ""}>
                <a href="#system" className="on" onClick={(event) => { event.preventDefault(); toggleMobile("system"); }}>
                  제도 소개
                </a>
                <div className={`gnb-dep2${mobileOpen.system ? " on" : ""}`}>
                  <ul>
                    <li className={mobileOpen.contract ? "on" : ""}>
                      <a href="#contract" className="on" onClick={(event) => { event.preventDefault(); toggleMobile("contract"); }}>
                        측정대행
                      </a>
                      <div className={`gnb-dep3${mobileOpen.contract ? " on" : ""}`}>
                        <ul>
                          <li><a href="/cm/pub/aboutContract.go" onClick={stay}>계약관리제도</a></li>
                          <li><a href="/cm/pub/aboutService.go" onClick={stay}>용역이행능력평가</a></li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a href="/cm/pub/system.go" onClick={stay}>
                        환경측정분석<br />정보관리시스템
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className={mobileOpen.company ? "on" : ""}>
                <a href="#company" className="on" onClick={(event) => { event.preventDefault(); toggleMobile("company"); }}>
                  측정대행업체 조회
                </a>
                <div className={`gnb-dep2${mobileOpen.company ? " on" : ""}`}>
                  <ul>
                    <li><a href="/cmpy.go" onClick={stay}>측정대행업체 조회</a></li>
                  </ul>
                </div>
              </li>
              <li className={mobileOpen.support ? "on" : ""}>
                <a href="#support" className="on" onClick={(event) => { event.preventDefault(); toggleMobile("support"); }}>
                  고객지원
                </a>
                <div className={`gnb-dep2${mobileOpen.support ? " on" : ""}`}>
                  <ul>
                    <li><a href="/cm/pub/manual.go" onClick={stay}>시스템 매뉴얼</a></li>
                    <li><a href="/cm/pub/faqboard.go" onClick={stay}>자주하는 질문</a></li>
                    <li><a href="/cm/pub/board.go" onClick={stay}>자료실</a></li>
                  </ul>
                </div>
              </li>
            </ul>
            <button
              type="button"
              className="gnb-close"
              style={{ display: menuOpen ? "block" : "none" }}
              onClick={() => {
                setMenuOpen(false);
                setMobileOpen({});
              }}
            >
              <span className="hidden">모바일 메뉴 닫기</span>
            </button>
          </div>
        </nav>

        <button
          type="button"
          className="top-btn-open"
          style={{ display: noticeOpen ? "none" : "block" }}
          onClick={onOpenNotice}
        >
          <img src={publicUrl("/images/common/ico-plus.png")} alt="" />
        </button>
      </div>
    </div>
  );
}
