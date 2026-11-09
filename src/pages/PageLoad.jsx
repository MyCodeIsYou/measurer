export default function PageLoad({ error, onBack }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        padding: 24,
      }}
    >
      <div style={{ width: "min(560px, 100%)", textAlign: "center" }}>
        <p style={{ margin: 0, color: "#048e6c", fontWeight: 700 }}>로그인되었습니다.</p>
        <h1 style={{ margin: "12px 0", fontSize: 22 }}>공지 화면을 불러오지 못했습니다.</h1>
        <p style={{ margin: 0, color: "#c0392b", lineHeight: 1.5, wordBreak: "break-word" }}>{error}</p>
        <button
          type="button"
          onClick={onBack}
          style={{
            marginTop: 24,
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
      </div>
    </div>
  );
}
