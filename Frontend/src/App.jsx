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
import PlayOnline from './pages/Game/PlayOnline.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContextProvider } from './components/Auth.jsx'
import TwoFaAuthStep1 from './pages/2FaAuth/TwoFaAuthStep1.jsx'
import TwoFaAuthStep2 from './pages/2FaAuth/TwoFaAuthStep2.jsx'
import TwoFaAuthStep3 from './pages/2FaAuth/TwoFaAuthStep3.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import DontRequireAuth from './components/DontRequireAuth.jsx'
import OauthCallBack from './pages/Login/OauthCallBack.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/2fa/setup" element={<TwoFaAuthStep1 />} />
            <Route path="/2fa/congrats" element={<TwoFaAuthStep2 />} />
            <Route path="/2fa/backupcodes" element={<TwoFaAuthStep3 />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<DontRequireAuth><SignIn /></DontRequireAuth>} />
            <Route path="/signup" element={<DontRequireAuth><SignUp /></DontRequireAuth>} />
            {/* <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} /> */}
            <Route path="/oauthcallback" element={<OauthCallBack />} />
            <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/chat" element={<RequireAuth><Chat /></RequireAuth>} />
            {/* <Route path="/chat" element={<Chat />} /> */}
            <Route path="/game" element={<RequireAuth><Game /></RequireAuth>} />
            {/* <Route path="game" element={<Game />} /> */}
            <Route path="game/play/online" element={<PlayOnline />} />
            <Route path="*" element={<Page424 />} />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
