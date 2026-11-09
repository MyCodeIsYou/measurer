import { useState } from "react";
import { NOTICES, PARTNERS, REGIONS } from "../data/main";

function stay(event) {
  event.preventDefault();
}

export default function ServiceSection() {
  const [start, setStart] = useState(0);
  const visible = Array.from({ length: 4 }, (_, offset) => PARTNERS[(start + offset) % PARTNERS.length]);

  return (
    <section className="main-service">
      <div className="inner">
        <div className="left-area">
          <div className="main-notice">
            <h2>공지사항</h2>
            <ul>
              {NOTICES.map((notice) => (
                <li key={notice.title}>
                  <a href="/cm/pub/notify.go" title="게시글 전문보기" onClick={stay}>
                    <p>{notice.title}</p>
                    <span>{notice.date}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a href="/cm/pub/notify.go" className="more-btn" onClick={stay}>더보기</a>
          </div>

          <div className="main-cs">
            <h2>고객지원</h2>
            <div className="flex">
              <dl>
                <dt>
                  한국환경공단
                  <small>
                    대기,악취<br />
                    실내공기질, 소음·진동
                  </small>
                </dt>
                <dd>1833 - 4006</dd>
              </dl>
              <dl>
                <dt>한국환경보전원<small>수질</small></dt>
                <dd>1533 - 1039</dd>
              </dl>
              <dl>
                <dt>운영시간</dt>
                <dd>평일 9:00 ~ 18:00 (토,일 공휴일 휴무)</dd>
              </dl>
            </div>
          </div>

          <div className="main-quick">
            <h2>자주찾는 서비스</h2>
            <ul>
              <li>
                <a href="/cm/pub/faqboard.go" onClick={stay}>
                  <img src="/images/main/cs-faq.png" alt="" />FAQ
                </a>
              </li>
              <li>
                <a href="/cm/pub/manual.go" onClick={stay}>
                  <img src="/images/main/cs-manual.png" alt="" />매뉴얼
                </a>
              </li>
              <li>
                <a href="/cm/pub/board.go" onClick={stay}>
                  <img src="/images/main/cs-data.png" alt="" />자료실
                </a>
              </li>
            </ul>
          </div>

          <div className="main-partner">
            <h2>관련업체 배너</h2>
            <div className="main-partner-slide slick-initialized slick-slider" style={{ height: 116 }}>
              <button type="button" className="slick-prev" onClick={() => setStart((value) => (value - 1 + PARTNERS.length) % PARTNERS.length)}>
                Previous
              </button>
              <button type="button" className="slick-next" onClick={() => setStart((value) => (value + 1) % PARTNERS.length)}>
                Next
              </button>
              <div className="slick-list">
                <div className="slick-track">
                  {visible.map(([href, src]) => (
                    <div className="slide slick-slide slick-active" key={src}>
                      <a href={href} target="_blank" rel="noreferrer">
                        <img src={src} alt="" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-area">
          <div id="maps" className="main-company">
            <h2>측정대행업체 정보조회</h2>
            <div className="map">
              <img src="/images/main/map-main.png" alt="" />
              <div className="map-list">
                {REGIONS.map((region) => (
                  <a
                    href="/cmpy.go"
                    id={region.id}
                    key={region.id}
                    className={`meas_map_detail maps_${region.code} ${region.area}`}
                    data-target-bl={region.code}
                    onClick={stay}
                  >
                    <strong>
                      {region.multiline ? (
                        <>
                          전남<br />광주통합
                        </>
                      ) : region.name}
                    </strong>
                    <span>{region.count}</span>
                  </a>
                ))}
              </div>
            </div>
            <a href="/cmpy.go" className="more-btn" onClick={stay}>더보기</a>
          </div>
          <form name="cmpyForm" id="cmpyForm" onSubmit={stay}>
            <input type="hidden" name="pageNo" id="pageNo" defaultValue="1" />
            <input type="hidden" name="sortField" id="sortField" defaultValue="MEAS_CMPY_NAME" />
            <input type="hidden" name="sortDirection" id="sortDirection" defaultValue="DESC" />
            <input type="hidden" name="search_bl_cd" id="search_bl_cd" defaultValue="" />
          </form>
          <div className="main-banner">
            <a href="https://kepaedu.or.kr/ema/main.do" target="_blank" rel="noreferrer">
              <img src="/images/main/banner.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
