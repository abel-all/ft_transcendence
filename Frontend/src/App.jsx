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
import Tournament from './pages/Game/Tournament.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContextProvider } from './components/Auth.jsx'
import SetupTwoFa from './pages/2FaAuth/SetupTwoFa.jsx'
import TwoFaAuthStep3 from './pages/2FaAuth/TwoFaAuthStep3.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import DontRequireAuth from './components/DontRequireAuth.jsx'
import OauthCallBack from './pages/Login/OauthCallBack.jsx'
import Search from './pages/Search/Search.jsx'
import axios from 'axios';
import { GameSettingsContextProvider } from './pages/Game/GameSettingsContext.jsx'



axios.defaults.withCredentials = true;

function App() {

  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <GameSettingsContextProvider>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/test" element={<TwoFaAuthStep3 />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/2fa/setup" element={<RequireAuth><SetupTwoFa /></RequireAuth>} />
              {/* <Route path="/2fa/setup" element={<SetupTwoFa />} /> */}
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<DontRequireAuth><SignIn /></DontRequireAuth>} />
              <Route path="/signup" element={<DontRequireAuth><SignUp /></DontRequireAuth>} />
              {/* <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} /> */}
              <Route path="/search" element={<RequireAuth><Search /></RequireAuth>} />
              <Route path="/oauth/callback" element={<OauthCallBack />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
              <Route path="/profile" element={<Profile />} />
              {/* <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} /> */}
              <Route path="/chat" element={<Chat />} />
              {/* <Route path="/chat" element={<RequireAuth><Chat /></RequireAuth>} /> */}
              <Route path="/game" element={<RequireAuth><Game /></RequireAuth>} />
              <Route path="game/play/online" element={<PlayOnline />} />
              <Route path="game/play/tournament" element={<Tournament />} />
              {/* <Route path="game/play/online" element={<RequireAuth><PlayOnline /></RequireAuth>} /> */}
              <Route path="*" element={<Page424 />} />
            </Routes>
          </GameSettingsContextProvider>
        </ContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
