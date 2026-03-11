import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import MDEditor from "@uiw/react-md-editor"
import Toolbar from "./Toolbar"

import * as Y from "yjs"
import { WebsocketProvider } from "y-websocket"
import { IndexeddbPersistence } from "y-indexeddb"

export default function Editor() {

  const { roomId } = useParams()

  const [value, setValue] = useState("")
  const [users, setUsers] = useState(1)

  const yTextRef = useRef(null)

  useEffect(() => {

    const ydoc = new Y.Doc()

    const provider = new WebsocketProvider(
      "wss://demos.yjs.dev",
      roomId,
      ydoc
    )

    new IndexeddbPersistence(roomId, ydoc)

    const yText = ydoc.getText("markdown")

    yTextRef.current = yText

    setValue(yText.toString())

    yText.observe(() => {
      setValue(yText.toString())
    })

    provider.awareness.on("change", () => {
      setUsers(provider.awareness.getStates().size)
    })

    return () => {
      provider.destroy()
      ydoc.destroy()
    }

  }, [roomId])


  const syncContent = () => {

    if (!yTextRef.current) return

    const yText = yTextRef.current

    yText.delete(0, yText.length)
    yText.insert(0, value || "")

  }


  const wordCount = value ? value.split(/\s+/).length : 0


  return (

    <div className="editor-container">

      <Toolbar room={roomId} users={users} syncContent={syncContent} />

      <MDEditor
        value={value}
        onChange={(val)=>setValue(val || "")}
        height={650}
      />

      <div className="statusbar">

        <span>Word Count: {wordCount}</span>

        <span>SM Creation</span>

      </div>

    </div>

  )

}