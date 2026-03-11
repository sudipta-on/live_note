import { useEffect, useState, useRef } from "react"
import MDEditor from "@uiw/react-md-editor"
import Toolbar from "./Toolbar"

import * as Y from "yjs"
import { WebsocketProvider } from "y-websocket"
import { IndexeddbPersistence } from "y-indexeddb"

export default function Editor({ room }) {

  const [value, setValue] = useState("")
  const [users, setUsers] = useState(1)

  const yTextRef = useRef(null)

  useEffect(() => {

    const ydoc = new Y.Doc()

    const provider = new WebsocketProvider(
      "wss://demos.yjs.dev",
      room,
      ydoc
    )

    new IndexeddbPersistence(room, ydoc)

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

  }, [room])

  const updateText = (val) => {

    if (!yTextRef.current) return

    const yText = yTextRef.current

    yText.delete(0, yText.length)
    yText.insert(0, val || "")

  }

  const wordCount = value ? value.split(/\s+/).length : 0

  return (

    <div className="editor-container">

      <Toolbar room={room} users={users} />

      <MDEditor
        value={value}
        onChange={updateText}
        height={650}
      />

      <div className="statusbar">

        <span>Word Count: {wordCount}</span>

        <span>Autosave Enabled</span>

      </div>

    </div>

  )

}