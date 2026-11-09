import { useEffect, useState } from "react";
import { SLIDES } from "../data/main";

function stay(event) {
  event.preventDefault();
}

export default function VisualSlide() {
  const [index, setIndex] = useState(0);
  const [wide, setWide] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const onResize = () => setWide(window.innerWidth > 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="main-visual">
      <div
        className="main-visual-slide slick-initialized slick-slider"
        style={{ height: wide ? 540 : "auto" }}
      >
        <div className="slick-list">
          <div
            className="slick-track"
            style={{
              width: `${SLIDES.length * 100}%`,
              transform: `translate3d(-${(index * 100) / SLIDES.length}%, 0, 0)`,
              transition: "transform 800ms ease",
            }}
          >
            {SLIDES.map((slide, slideIndex) => (
              <div
                className={`slide slick-slide${slideIndex === index ? " slick-current slick-active" : ""}`}
                style={{ width: `${100 / SLIDES.length}%` }}
                key={slide.title}
              >
                <div className="inner">
                  <div className="txt">
                    <dl>
                      <dt className="wow fadeInUp delay-02s animated">{slide.title}</dt>
                      <dd className="wow fadeInUp delay-04s animated">
                        {slide.lines.map((line) => (
                          <span key={line}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </dd>
                    </dl>
                    <a href={slide.href} className="btn-more wow fadeInUp delay-06s animated" onClick={stay}>
                      자세히 보기
                    </a>
                  </div>
                  <div className="img wow fadeInRight delay-06s animated">
                    <img src={slide.image} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ul className="slick-dots">
          {SLIDES.map((slide, slideIndex) => (
            <li key={slide.title} className={slideIndex === index ? "slick-active" : ""}>
              <button type="button" onClick={() => setIndex(slideIndex)}>
                {slideIndex + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
