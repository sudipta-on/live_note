import { useState, useEffect } from "react"
import { FaMoon, FaSun, FaUsers, FaCopy, FaSync, FaCheck } from "react-icons/fa"

export default function Toolbar({ room, users, syncContent }) {

  const [toast, setToast] = useState(null)
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {

    const savedTheme = localStorage.getItem("theme")

    if(savedTheme === "light"){
      document.body.classList.add("light")
      setIsLight(true)
    }

  }, [])

  const showToast = (message) => {

    setToast(message)

    setTimeout(() => {
      setToast(null)
    }, 2200)

  }


  const copyLink = () => {

    const url = window.location.origin + "/room/" + room

    navigator.clipboard.writeText(url)

    showToast("Link copied to clipboard")

  }


  const handleSync = () => {

    syncContent()

    showToast("Content synced successfully")

  }


  const toggleTheme = () => {

    const newTheme = !isLight

    setIsLight(newTheme)

    document.body.classList.toggle("light")

    localStorage.setItem("theme", newTheme ? "light" : "dark")

  }


  return (

    <>
      <div className="toolbar">

        <div className="left">

          <h2 className="logo">📝 LiveNotes</h2>

          <span className="room">
            Room: <b>{room}</b>
          </span>

        </div>

        <div className="right">

          <div className="users">
            <FaUsers /> {users}
          </div>

          <button className="sync-btn" onClick={handleSync}>
            <FaSync /> Sync
          </button>

          <button className="copy-btn" onClick={copyLink}>
            <FaCopy /> Copy Link
          </button>

          <button className="theme-btn" onClick={toggleTheme}>
            {isLight ? <FaMoon /> : <FaSun />}
          </button>

        </div>

      </div>


      {toast && (
        <div className="toast">
          <FaCheck /> {toast}
        </div>
      )}

    </>

  )

}