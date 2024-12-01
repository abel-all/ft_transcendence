import ChatNavBottom from "./Chat_comp/ChatNavBottom";
import ChatSide from "./Chat_comp/ChatSide";
import ProprtesSide from "./Chat_comp/ProprtesSide";
import Header from "../../components/Header";
import "./Chat.css";
import { useState, createContext, useEffect, useRef } from "react";
import chatUsers from "../../assets/ChatUsers.json";
import axios from "axios";
import testUser from "../../assets/imgs/defualtImg.jpg";
import BottomNaveBar from "../../components/BottomNavBar.jsx";
import { useGameSettings } from "../Game/GameSettingsContext.jsx";
import { useAuth } from "../../components/Auth.jsx";

const chatHeaderOnClick = createContext();

function Chat() {
	const [isFrom, setIsFrom] = useState(false)
	const [lastMessageUserSend, setlastMessageUserSend] = useState('')
	const [VoidedUsername, setVoidedUsername] = useState('')
	const {sendMessage, lastMessage, readyState} = useGameSettings();

	const [userFromUrl, setUserFromUrl] = useState({
		user: '',
		url: '',
		rank: '',
	})


	const [chatHeader, setChatHeader] = useState({
		name: '',
		rank: 0,
		userProfile: null,
		windowSize: '',
		clicked: false,
		ChatShown: true,
	})

	function handelSetingUser(username, userurl, userrank) {
		setUserFromUrl((prevState) => ({
			...prevState,
			user: username ? username : prevState.user,
			url: userurl ? userurl : prevState.url,
			rank: userrank ? userrank : prevState.rank,
		}))
	}

	const handelChatHeader = (names, ranks, userProfiles) => {
		setChatHeader((prevState) => ({
			...prevState,
			name: names,
			rank: ranks,
			userProfile: userProfiles,
			clicked: true,
			ChatShown: false,
			windowSize: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
		}))
	}

	const handelChatShown = (state) => {
		setChatHeader((prevState) => ({
			...prevState,
			ChatShown: state,
		}))
	}

	function SetFrom() {
		let windo = window.location.href
		if (windo.lastIndexOf('user=') != -1) {
			let FromUser = windo.substring(windo.lastIndexOf('user=') + 5)
			sendMessage(JSON.stringify({ action: 'create_room', username: FromUser }))
			axios
				.post('http://localhost:8800/api/chat/user/', {
					username: FromUser,
				})
				.then((res) => {
					if (res.status == 200) {
						setIsFrom(true)
						handelSetingUser(FromUser, res.data.picture, res.data.rank)
						handelChatShown(false)
					}
				})
				.catch((err) => {
					if (err.response?.status === 403) {const auth = useAuth(); auth.RefreshToken()}
				})
		}
	}

	useEffect(() => {
		SetFrom()
	}, [])

	const handelChatClick = (state) => {
		setChatHeader((prevState) => ({
			...prevState,
			clicked: state,
		}))
	}

	return (
		<div className="container mx-auto flex justify-center w-full h-full">
			<div className="w-full">
				<Header
					title="Chat"
					activeSection="ChatIcon"
					hide={'hidden md:flex'}
				/>
				<chatHeaderOnClick.Provider
					value={{ chatHeader, setChatHeader, handelChatHeader, handelChatShown, handelChatClick, lastMessage, userFromUrl, sendMessage, readyState, lastMessageUserSend, setlastMessageUserSend,}}>
					<div className="flex indexchatHolder md:mb-0 md:mt-[80px] flex-row">
						<ProprtesSide
							VoidedUsername={VoidedUsername}
							className={`ProprtesSide basis-full ${
								chatHeader.ChatShown == false ? ' hidden md:flex' : 'flex'
							} md:basis-4/12 flex flex-col`}
						/>
						<ChatSide
							setVoidedUsername={setVoidedUsername}
							className={`ChatSide ${
								chatHeader.ChatShown == true ? ' hidden ' : ''
							} md:flex w-full  mb-[76px] md:mb-0 md:basis-8/12`}
						/>
					</div>
				</chatHeaderOnClick.Provider>
				{/* <ChatNavBottom hide={!chatHeader.ChatShown ? 'hidden ' : ''} /> */}
				<BottomNaveBar activeSection="ChatIcon" />
			</div>
		</div>
	)
}

export { chatHeaderOnClick };
export default Chat;
