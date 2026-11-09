import { useEffect, useState } from "react";

const SAVED_ID = "userInputId";
const RUN_URL = import.meta.env.DEV
  ? "/api/automation/run"
  : "https://analytics-gamma-wheat.vercel.app/api/automation/run";

export default function LoginBox({ onFindAccount, onLoggedIn }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(SAVED_ID);
    if (saved) setUserId(saved);
  }, []);

  const onRemember = (checked) => {
    setRemember(checked);
    if (!checked) window.localStorage.removeItem(SAVED_ID);
    else if (userId) window.localStorage.setItem(SAVED_ID, userId);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (pending) return;
    if (!userId.trim()) {
      setOk(false);
      setError("아이디를 입력해 주세요");
      return;
    }
    if (!password) {
      setOk(false);
      setError("비밀번호를 입력해 주세요");
      return;
    }
    if (remember) window.localStorage.setItem(SAVED_ID, userId.trim());
    setOk(false);
    setError("측정인 사이트에서 로그인을 확인하는 중입니다.");
    setPending(true);
    try {
      const response = await fetch(RUN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(70000),
        body: JSON.stringify({
          site: "chookjeongin",
          action: "login",
          username: userId.trim(),
          password,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.ok && data.loggedIn) {
        onLoggedIn?.({
          screen: data.screen?.html ? data.screen : null,
          error: data.screen?.html ? "" : data.screenError || "공지 화면을 받지 못했습니다.",
        });
        return;
      }
      setOk(false);
      setError(data.message || `로그인에 실패했습니다. (${response.status})`);
    } catch (error) {
      setOk(false);
      const timedOut = error instanceof DOMException && error.name === "TimeoutError";
      setError(timedOut ? "로그인 확인 요청이 시간 안에 끝나지 않았습니다." : "로그인 서버에 연결하지 못했습니다.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="smart-form" id="login-form" onSubmit={onSubmit}>
      <input type="hidden" name="actionID" value="LOGIN_OK" />
      <input type="hidden" name="time_zone" id="time_zone" defaultValue="Asia/Seoul" />
      <input type="hidden" name="temp_pwd" id="temp_pwd" defaultValue="" />
      <section className="main-login">
        <div className="inner">
          <h2>측정인 로그인</h2>
          <div className="login-form">
            <input
              type="text"
              name="user_email"
              id="user_email"
              placeholder="아이디"
              value={userId}
              onChange={(event) => {
                const next = event.target.value;
                setUserId(next);
                if (remember) window.localStorage.setItem(SAVED_ID, next);
              }}
            />
            <input type="hidden" name="login_pwd" id="login_pwd" value="" readOnly />
            <div className="password-container">
              <input
                type={visible ? "text" : "password"}
                name="login_pwd_confirm"
                id="login_pwd_confirm"
                placeholder="비밀번호"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                className="btn-pwd-view"
                id="btn-pwd-toggle"
                tabIndex={-1}
                onClick={() => setVisible((value) => !value)}
                aria-label={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {visible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
            <a
              href="#login"
              className="btn-submit"
              id="login"
              onClick={(event) => {
                event.preventDefault();
                event.currentTarget.closest("form")?.requestSubmit();
              }}
            >
              {pending ? "확인 중" : "로그인"}
            </a>
          </div>
          {error && (
            <em className={`invalid login-error${ok ? " is-ok" : ""}${pending ? " is-wait" : ""}`}>{error}</em>
          )}
          <div className="login-nav">
            <a href="#find-id" id="findId" onClick={(event) => { event.preventDefault(); onFindAccount(); }}>
              아이디찾기
            </a>
            <a href="#find-pw" id="findPw" onClick={(event) => { event.preventDefault(); onFindAccount(); }}>
              비밀번호찾기
            </a>
            <a href="/out/applyAccount.go" onClick={(event) => event.preventDefault()}>
              회원가입
            </a>
            <div className="save-id check-set">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(event) => onRemember(event.target.checked)}
              />
              <label htmlFor="remember">아이디 저장</label>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
