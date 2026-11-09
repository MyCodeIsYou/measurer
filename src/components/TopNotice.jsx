import { TOP_NOTICE } from "../data/main";

export default function TopNotice({ open, hideToday, onHideToday, onClose }) {
  return (
    <div id="alertArea" className={`header-guide${open ? " is-open" : ""}`}>
      <div className="inner disp-flex-wrap" id="secNotiocAlert">
        <p>{TOP_NOTICE}</p>
        <div className="check-set">
          <span>
            <input
              type="checkbox"
              id="top-notice"
              checked={hideToday}
              onChange={(event) => onHideToday(event.target.checked)}
            />
            <label htmlFor="top-notice" style={{ color: "#fff" }}>
              하루동안 열지 않기
            </label>
          </span>
        </div>
        <button type="button" className="top-btn-close" onClick={onClose} />
      </div>
    </div>
  );
}
