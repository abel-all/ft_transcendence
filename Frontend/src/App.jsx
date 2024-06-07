import './App.css'
import Login from './pages/Login/Login.jsx'
import Home from './pages/Home/Home.jsx'
import Contact from './pages/Contact/Contact.jsx'
import About from './pages/About/About.jsx'
import Page424 from './pages/Page424/Page424.jsx'
import Profile from './pages/Profile/Profile.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="*" element={<Page424/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
