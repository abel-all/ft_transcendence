import Home from './pages/Home/Home.jsx'
import Contact from './pages/Contact/Contact.jsx'
import About from './pages/About/About.jsx'
import Page424 from './pages/Page424/Page424.jsx'
import Profile from './pages/Profile/Profile.jsx'
import SignIn from './pages/Login/SignIn.jsx'
import SignUp from './pages/Login/SignUp.jsx'
import Settings from "./pages/Settings/Settings"
import Chat from './pages/Chat/Chat.jsx'
import Game from './pages/Game/Game.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContextProvider } from './components/Auth.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import DontRequireAuth from './components/DontRequireAuth.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<DontRequireAuth><SignIn /></DontRequireAuth>} />
            <Route path="/signup" element={<DontRequireAuth><SignUp /></DontRequireAuth>} />
            <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/chat" element={<RequireAuth><Chat /></RequireAuth>} />
            <Route path="/game" element={<RequireAuth><Game /></RequireAuth>} />
            <Route path="*" element={<Page424 />} />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
