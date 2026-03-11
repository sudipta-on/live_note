import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Editor from "./components/Editor"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Home />} />

<Route path="/room/:roomId" element={<Editor />} />

</Routes>

</BrowserRouter>

)

}

export default App