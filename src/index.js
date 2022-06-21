import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // react v18에서는 dev 환경일 때만 strictmode에서 useEffect가 mount -> unmount -> mount 방식으로 mount를 두 번 진행하므로 주석처리
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
