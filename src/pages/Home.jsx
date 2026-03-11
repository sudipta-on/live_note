import { useState } from "react";
import { motion } from "framer-motion";
import { generateCode } from "../utils/generateCode";

export default function Home({ setRoom }) {

  const [input, setInput] = useState("");

  const createRoom = () => {
    const code = generateCode();
    setRoom(code);
  };

  const joinRoom = () => {
    if (input) {
      setRoom(input.toUpperCase());
    }
  };

  return (

    <div className="home">

      <motion.h1
        initial={{opacity:0,y:-40}}
        animate={{opacity:1,y:0}}
      >
        Live Markdown Notebook
      </motion.h1>

      <p>Create or join a room to collaborate live.</p>

      <div className="panel">

        <button onClick={createRoom}>
          Create Room
        </button>

        <input
          placeholder="Enter Room Code"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
        />

        <button onClick={joinRoom}>
          Join Room
        </button>

      </div>

    </div>
  );
}