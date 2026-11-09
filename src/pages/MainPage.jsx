import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginBox from "../components/LoginBox";
import PwResetModal from "../components/PwResetModal";
import ServiceSection from "../components/ServiceSection";
import TopNotice from "../components/TopNotice";
import VisualSlide from "../components/VisualSlide";

const NOTICE_KEY = "topNotice";

function noticeHiddenToday() {
  const saved = window.localStorage.getItem(NOTICE_KEY);
  if (!saved) return false;
  return saved === new Date().toDateString();
}

export default function MainPage({ onLoggedIn }) {
  const [noticeOpen, setNoticeOpen] = useState(() => !noticeHiddenToday());
  const [hideToday, setHideToday] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  const closeNotice = () => {
    if (hideToday) window.localStorage.setItem(NOTICE_KEY, new Date().toDateString());
    setNoticeOpen(false);
  };

  return (
    <div className="wrap">
      <TopNotice
        open={noticeOpen}
        hideToday={hideToday}
        onHideToday={setHideToday}
        onClose={closeNotice}
      />
      <Header noticeOpen={noticeOpen} onOpenNotice={() => setNoticeOpen(true)} />
      <div id="goContent" className="hidden">메인콘텐츠</div>
      <div className="main-content">
        <VisualSlide />
        <LoginBox onFindAccount={() => setResetOpen(true)} onLoggedIn={onLoggedIn} />
        <ServiceSection />
      </div>
      <Footer />
      <PwResetModal open={resetOpen} onClose={() => setResetOpen(false)} />
    </div>
  );
}
