import { useState } from "react";
import Home from "./pages/Home";
import Editor from "./components/Editor";

function App() {

  const [room, setRoom] = useState(null);
  const toggleTheme = () => {

  document.body.classList.toggle("light")

}
  if (!room) {
    return <Home setRoom={setRoom} />;
  }

  return <Editor room={room} />;
}

export default App;