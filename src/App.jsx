import { useState } from "react";
import CapturedPage from "./pages/CapturedPage";
import MainPage from "./pages/MainPage";

export default function App() {
  const [screen, setScreen] = useState(null);

  if (screen?.html) {
    return <CapturedPage screen={screen} onBack={() => setScreen(null)} />;
  }

  return <MainPage onLoggedIn={setScreen} />;
}
