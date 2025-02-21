import { useState } from "react";
import Login from "./components/Login";
import Play from "./components/Play";

function App() {
  const [username, setUsername] = useState("");

  return username.length === 0 ? (
    <Login setUsername={setUsername} />
  ) : (
    <Play username={username} />
  );
}

export default App;
