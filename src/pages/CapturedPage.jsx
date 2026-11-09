import { useRef, useState } from "react";
import { collectDrivingFields, findDrivingSearch, prepareDrivingFields } from "../drivingForm";
import { RUN_URL } from "../runUrl";

export default function CapturedPage({ pages, username, password, onBack, onPage }) {
  const first = pages.find((item) => item.html) ?? pages[0];
  const [currentId, setCurrentId] = useState(first?.id);
  const [status, setStatus] = useState("");
  const [failed, setFailed] = useState(false);
  const [searching, setSearching] = useState(false);
  const busy = useRef(false);
  const current = pages.find((item) => item.id === currentId) ?? first;

  const onFrame = (event) => {
    if (current?.id !== "driving") return;
    const doc = event.currentTarget.contentDocument;
    if (!doc) return;
    prepareDrivingFields(doc);
    const button = findDrivingSearch(doc);
    if (!button || button.dataset.drivingSearch) return;
    button.dataset.drivingSearch = "1";
    button.addEventListener(
      "click",
      (click) => {
        click.preventDefault();
        click.stopPropagation();
        if (busy.current) return;
        const fields = collectDrivingFields(doc);
        busy.current = true;
        setSearching(true);
        setFailed(false);
        setStatus("차량운행일지를 조회하는 중입니다.");
        fetch(RUN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(70000),
          body: JSON.stringify({
            site: "chookjeongin",
            action: "query",
            operation: "driving",
            username,
            password,
            input: { fields },
          }),
        })
          .then(async (response) => {
            const data = await response.json().catch(() => ({}));
            if (!response.ok || !data.ok || !data.data?.html) {
              setFailed(true);
              setStatus(data.message || "조회에 실패했습니다.");
              return;
            }
            setFailed(false);
            setStatus(data.data.notice || "");
            onPage?.(data.data);
          })
          .catch((error) => {
            const timedOut = error instanceof DOMException && error.name === "TimeoutError";
            setFailed(true);
            setStatus(timedOut ? "조회 요청이 시간 안에 끝나지 않았습니다." : "조회 서버에 연결하지 못했습니다.");
          })
          .finally(() => {
            busy.current = false;
            setSearching(false);
          });
      },
      true,
    );
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#fff" }}>
      <div
        style={{
          position: "fixed",
          zIndex: 20,
          top: 12,
          right: 12,
          display: "flex",
          gap: 8,
        }}
      >
        {pages.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCurrentId(item.id)}
            style={{
              border: 0,
              borderRadius: 4,
              background: item.id === current?.id ? "#048e6c" : "#d9efe8",
              color: item.id === current?.id ? "#fff" : "#048e6c",
              padding: "8px 14px",
              cursor: "pointer",
            }}
          >
            {item.name}
          </button>
        ))}
        <button
          type="button"
          onClick={onBack}
          style={{
            border: 0,
            borderRadius: 4,
            background: "#555",
            color: "#fff",
            padding: "8px 14px",
            cursor: "pointer",
          }}
        >
          메인으로
        </button>
      </div>
      {status && (
        <div
          style={{
            position: "fixed",
            zIndex: 20,
            top: 12,
            left: 12,
            maxWidth: "46vw",
            borderRadius: 4,
            background: failed ? "#c0392b" : "#048e6c",
            color: "#fff",
            padding: "8px 14px",
            lineHeight: 1.4,
          }}
        >
          {status}
        </div>
      )}
      {current?.html ? (
        <iframe
          title={current.title || current.name}
          sandbox="allow-same-origin"
          srcDoc={current.html}
          onLoad={onFrame}
          style={{ width: "100%", height: "100%", border: 0, background: "#fff" }}
        />
      ) : (
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <p style={{ margin: 0, color: "#c0392b", lineHeight: 1.5, wordBreak: "break-word" }}>
            {current?.error || "화면을 받지 못했습니다."}
          </p>
        </div>
      )}
    </div>
  );
}
