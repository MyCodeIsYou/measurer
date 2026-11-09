import { useState } from "react";
import CapturedPage from "./pages/CapturedPage";
import MainPage from "./pages/MainPage";
import PageLoad from "./pages/PageLoad";

export default function App() {
  const [result, setResult] = useState(null);

  if (result?.pages?.some((item) => item.html)) {
    return <CapturedPage pages={result.pages} onBack={() => setResult(null)} />;
  }

  if (result?.error) {
    return <PageLoad error={result.error} onBack={() => setResult(null)} />;
  }

  return <MainPage onLoggedIn={setResult} />;
}
