import { useState } from "react";

export default function CapturedPage({ pages, onBack }) {
  const first = pages.find((item) => item.html) ?? pages[0];
  const [currentId, setCurrentId] = useState(first?.id);
  const current = pages.find((item) => item.id === currentId) ?? first;

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
      {current?.html ? (
        <iframe
          title={current.title || current.name}
          sandbox=""
          srcDoc={current.html}
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
