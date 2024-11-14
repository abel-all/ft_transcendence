import { lazy, Suspense } from "react";
import DontRequireAuth from "./components/DontRequireAuth.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./components/Auth.jsx";
import axios from "axios";
import { GameSettingsContextProvider } from "./pages/Game/GameSettingsContext.jsx";
import NotifyUser from "./components/NotifyUser.jsx";
import LoaderOntop from "./components/LoaderOntop.jsx";

const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Contact = lazy(() => import("./pages/Contact/Contact.jsx"));
const About = lazy(() => import("./pages/About/About.jsx"));
const Page404 = lazy(() => import("./pages/Page404/Page404.jsx"));
const Profile = lazy(() => import("./pages/Profile/Profile.jsx"));
const SignIn = lazy(() => import("./pages/Login/SignIn.jsx"));
const SignUp = lazy(() => import("./pages/Login/SignUp.jsx"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Chat = lazy(() => import("./pages/Chat/Chat.jsx"));
const Game = lazy(() => import("./pages/Game/Game.jsx"));
const OnlineGameMiddleware = lazy(() =>
  import("./pages/Game/OnlineGameMiddleware.jsx")
);
const PlayOnline = lazy(() => import("./pages/Game/PlayOnline.jsx"));
const Tournament = lazy(() => import("./pages/Game/Tournament.jsx"));
const PlayWithBot = lazy(() => import("./pages/Game/PlayWithBot.jsx"));
const PlayWithFriend = lazy(() => import("./pages/Game/PlayWithFriend.jsx"));
const SetupTwoFa = lazy(() => import("./pages/2FaAuth/SetupTwoFa.jsx"));
const OauthCallBack = lazy(() => import("./pages/Login/OauthCallBack.jsx"));
const ResetPassword = lazy(() => import("./pages/Login/ResetPassword.jsx"));
const Search = lazy(() => import("./pages/Search/Search.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/Privacy/PrivacyPolicy"));
const UserAgreement = lazy(() => import("./pages/Privacy/UserAgreement"));

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <BrowserRouter>
        <GameSettingsContextProvider>
          <ContextProvider>
            <NotifyUser />
            <Suspense fallback={<LoaderOntop />}>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/termsofuse" element={<UserAgreement />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/resetpassword/*" element={<ResetPassword />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/2fa/setup"
                  element={
                    <RequireAuth>
                      <SetupTwoFa />
                    </RequireAuth>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route
                  path="/signin"
                  element={
                    <DontRequireAuth>
                      <SignIn />
                    </DontRequireAuth>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <DontRequireAuth>
                      <SignUp />
                    </DontRequireAuth>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <RequireAuth>
                      <Search />
                    </RequireAuth>
                  }
                />
                <Route path="/oauth" element={<OauthCallBack />} />
                <Route
                  path="/settings"
                  element={
                    <RequireAuth>
                      <Settings />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <Profile />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <RequireAuth>
                      <Chat />
                    </RequireAuth>
                  }
                />
                {/* <Route
                path="/game/onlineGame"
                element={<OnlineGameMiddleware />}
              />
              <Route path="/game" element={<Game />} />
              <Route path="game/online" element={<PlayOnline />} />
              <Route path="game/friend" element={<PlayWithFriend />} />
              <Route path="game/tournament" element={<Tournament />} /> */}
                {/* <Route path="game/friend" element={<PlayWithBot />} /> */}
                <Route
                  path="/game"
                  element={
                    <RequireAuth>
                      <Game />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/game/onlineGame"
                  element={
                    <RequireAuth>
                      <OnlineGameMiddleware />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/game/online"
                  element={
                    <RequireAuth>
                      <PlayOnline />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/game/bot"
                  element={
                    <RequireAuth>
                      <PlayWithBot />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/game/friend"
                  element={
                    <RequireAuth>
                      <PlayWithFriend />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/game/tournament"
                  element={
                    <RequireAuth>
                      <Tournament />
                    </RequireAuth>
                  }
                />
                {/* <Route path="game/tournament" element={<Tournament />} /> */}
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Suspense>
          </ContextProvider>
        </GameSettingsContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
