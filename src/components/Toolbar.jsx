import { useState, useEffect } from "react"
import { FaMoon, FaSun, FaUsers, FaCopy } from "react-icons/fa"

export default function Toolbar({ room, users }) {

  const [isLight, setIsLight] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {

    const savedTheme = localStorage.getItem("theme")

    if(savedTheme === "light"){
      document.body.classList.add("light")
      setIsLight(true)
    }

  }, [])

  const copyLink = () => {

    const url = window.location.origin + "/room/" + room

    navigator.clipboard.writeText(url)

    setShowToast(true)

    setTimeout(() => {
      setShowToast(false)
    }, 2500)

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
            <FaUsers />
            <span>{users}</span>
          </div>

          <button className="copy-btn" onClick={copyLink}>
            <FaCopy /> Copy Link
          </button>

          <button className="theme-btn" onClick={toggleTheme}>
            {isLight ? <FaMoon /> : <FaSun />}
          </button>

        </div>

      </div>

      {showToast && (
        <div className="toast">
          Link copied to clipboard
        </div>
      )}

    </>

  )

}