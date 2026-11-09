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

function MenuBranch({ items, depth }) {
  return (
    <div className={`gnb-dep${depth} on`}>
      <ul>
        {items.map((item) => (
          <li key={item.href + item.label} className={item.items ? "on" : ""}>
            <a href={item.href} onClick={stay}>
              <MenuLabel label={item.label} />
            </a>
            {item.items ? <MenuBranch items={item.items} depth={depth + 1} /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Header({ noticeOpen, onOpenNotice }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [gnbOn, setGnbOn] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 1);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
                        {item.items ? (
                          <div className="gnb-dep3">
                            <ul>
                              {item.items.map((child) => (
                                <li key={child.href + child.label}>
                                  <a href={child.href} onClick={stay}>
                                    {child.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
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
              {MENUS.map((menu) => (
                <li key={menu.label} className="on">
                  <a href={menu.href} className="on" onClick={stay}>
                    {menu.label}
                  </a>
                  <MenuBranch items={menu.items} depth={2} />
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="gnb-close"
              style={{ display: menuOpen ? "block" : "none" }}
              onClick={() => setMenuOpen(false)}
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
