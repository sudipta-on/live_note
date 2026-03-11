import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { generateCode } from "../utils/generateCode"

export default function Home() {

  const [input, setInput] = useState("")
  const [toast, setToast] = useState(null)

  const navigate = useNavigate()

  const showToast = (msg) => {

    setToast(msg)

    setTimeout(()=>{
      setToast(null)
    },2000)

  }

  const createRoom = () => {

    const code = generateCode()

    navigate(`/room/${code}`)

  }

  const joinRoom = () => {

    if(!input.trim()){
      showToast("Please enter a room code")
      return
    }

    navigate(`/room/${input.toUpperCase()}`)

  }

  const handleEnter = (e) => {

    if(e.key === "Enter"){
      joinRoom()
    }

  }

  return (

    <>
      <div className="home">

        <motion.h1
          initial={{opacity:0,y:-40}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.5}}
        >
          📝 LiveNotes
        </motion.h1>

        <motion.p
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:0.2}}
        >
          Create or join a room to collaborate on markdown notes in real-time.
        </motion.p>

        <motion.div
          className="panel"
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          transition={{delay:0.4}}
        >

          <button
            className="create-btn"
            onClick={createRoom}
          >
            Create Room
          </button>

          <input
            placeholder="Enter Room Code"
            value={input}
            onChange={(e)=>setInput(e.target.value.toUpperCase())}
            onKeyDown={handleEnter}
          />

          <button
            className="join-btn"
            onClick={joinRoom}
          >
            Join Room
          </button>

        </motion.div>

      </div>

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}
    </>

  )

}