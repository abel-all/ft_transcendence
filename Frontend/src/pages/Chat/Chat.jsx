import ChatNavBottom from './Chat_comp/ChatNavBottom'
import ChatSide from './Chat_comp/ChatSide'
import ProprtesSide from './Chat_comp/ProprtesSide'
import Header from '../../components/Header'
import './Chat.css'
import { useState, createContext, useEffect, useRef } from 'react'
import chatUsers from '../../assets/ChatUsers.json'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import axios from 'axios'
import testUser from '../../assets/users/user (9).png'
import BottomNaveBar from '../../components/BottomNavBar.jsx'

const chatHeaderOnClick = createContext()

function Chat() {
	const [isFrom, setIsFrom] = useState(false)
	const [lastMessageUserSend, setlastMessageUserSend] = useState('')
	const [socketURL, setSocketURL] = useState('ws://localhost:8800/ws/chat/')
	const [messageHistory, setMessageHistory] = useState([])
	const [VoidedUsername, setVoidedUsername] = useState('')
	const { sendMessage, lastMessage, readyState } = useWebSocket(socketURL, {
		onOpen: () => console.log('WebSocket connection opened.'),
		onClose: () => console.log('WebSocket connection closed.'),
		onError: (error) => console.error('WebSocket error:', error),
		onMessage: (message) => {
			setMessageHistory((prev) => [...prev, message.data.toString()])
		},
		shouldReconnect: () => true,
		reconnectInterval: 3000,
	})

	const [userFromUrl, setUserFromUrl] = useState({
		user: '',
		url: '',
		rank: '',
	})

	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Open',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
	}[readyState]

	const [chatHeader, setChatHeader] = useState({
		name: '',
		rank: 0,
		userProfile: null,
		windowSize: '',
		clicked: false,
		ChatShown: true,
	})

	// useEffect(() => {}, [VoidedUsername])

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
					console.log(err)
				})
		}
	}

	useEffect(() => {
		// handelSetingUser("","","");
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
					hide={!chatHeader.ChatShown ? 'hidden md:flex' : ''}
				/>
				<chatHeaderOnClick.Provider
					value={{ chatHeader, setChatHeader, handelChatHeader, handelChatShown, handelChatClick, lastMessage, userFromUrl, sendMessage, readyState, lastMessageUserSend, setlastMessageUserSend,}}>
					<div className="flex indexchatHolder mt-[101px] flex-row">
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
							} md:flex md:basis-8/12`}
						/>
					</div>
				</chatHeaderOnClick.Provider>
				{/* <ChatNavBottom hide={!chatHeader.ChatShown ? 'hidden ' : ''} /> */}
				<BottomNaveBar activeSection="ChatIcon" />
			</div>
		</div>
	)
}

export { chatHeaderOnClick }
export default Chat
