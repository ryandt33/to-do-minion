import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Main from "./pages/Main";
import TodoState from "../context/todo/TodoState";
import AiState from "../context/ai/AiState";

function App() {
  const [count, setCount] = useState(0);

  return (
    <TodoState>
      <AiState>
        <Main />
      </AiState>
    </TodoState>
  );
}

export default App;
