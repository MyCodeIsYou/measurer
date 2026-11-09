export default function CapturedPage({ screen, onBack }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#fff" }}>
      <button
        type="button"
        onClick={onBack}
        style={{
          position: "fixed",
          zIndex: 20,
          top: 12,
          right: 12,
          border: 0,
          borderRadius: 4,
          background: "#048e6c",
          color: "#fff",
          padding: "8px 14px",
          cursor: "pointer",
        }}
      >
        메인으로
      </button>
      <iframe
        title={screen.title || "공지사항"}
        sandbox=""
        srcDoc={screen.html}
        style={{ width: "100%", height: "100%", border: 0, background: "#fff" }}
      />
    </div>
  );
}
