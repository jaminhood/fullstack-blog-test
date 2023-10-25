import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreatePost from "./pages/create"
import AppProvider from "./context/AppProvider"
import Home from "./pages/home"

function App() {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/post/:id" element={<CreatePost />} />
            <Route path="/posts/all" element={<Home />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </>
  )
}

export default App
