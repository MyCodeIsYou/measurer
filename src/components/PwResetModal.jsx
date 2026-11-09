import { useState } from "react";

export default function PwResetModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (!open) return null;

  const requestReset = () => {
    if (!email.trim()) {
      setMessage("ID(이메일)을 입력해주세요.");
      return;
    }
    setMessage("");
  };

  return (
    <>
      <div className="modal-backdrop fade in" onClick={onClose} />
      <div
        className="modal fade in"
        id="pwresetModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="pwResetTitle"
        style={{ display: "block" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" aria-label="닫기" onClick={onClose}>
                ×
              </button>
              <h4 className="modal-title" id="pwResetTitle">비밀번호 재설정</h4>
            </div>
            <div className="modal-body">
              <section>
                <label><strong>ID로 사용하는 이메일을 넣어주세요.</strong></label>
              </section>
              <section>
                <label className="tit" htmlFor="reset_pwd_id">ID (이메일)</label>
                <input
                  type="text"
                  name="reset_pwd_id"
                  id="reset_pwd_id"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </section>
              <section>
                <label>아이디를 모르시는 경우, eco-measure@keco.or.kr 또는 1833-4006 -&gt; 3으로 문의바랍니다.</label>
              </section>
              {message && <p style={{ clear: "both", paddingTop: 12, color: "#c0392b" }}>{message}</p>}
            </div>
            <div className="modal-footer" style={{ textAlign: "center" }}>
              <button id="pwresetBtn" type="button" className="nbtn-search big blue" onClick={requestReset}>
                요청
              </button>
              <button type="button" className="nbtn-search big grey" onClick={onClose}>
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
