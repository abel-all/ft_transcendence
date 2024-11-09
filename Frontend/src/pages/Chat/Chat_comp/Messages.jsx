import { useContext, useEffect, useRef, useState } from 'react'
import { sendMessageContext } from './ChatSide'
import GetChatFromDataBase from '../../../components/GetChatFromDataBase'
import StoreMessages from '../../../components/StoreMessages'
import axios from 'axios'

function Messages({ setMessages, username, className, toUser }) {
	const messageContext = useContext(sendMessageContext)
	const { messages, messagesAdded, messagesRef } = useContext(sendMessageContext);
	const [isLoading, setIsLoading] = useState(false);
	const [Oldest, setOldest] = useState([]);
	const [NewmessagesAdded, setNewmessagesAdded] = useState(messagesAdded);
	const [Scroll, setScroll] = useState(0);
	const Scrolllll = useRef(0);
	const [LoadingMessage, setLoadingMessage] = useState('');
	const [WhoAmI, setWhoAmI] = useState('');

	const index = useRef(30)

	useEffect(() => {
		if (messagesAdded.length) {
			setNewmessagesAdded(prev => {
			  return [...new Set([...prev, ...messagesAdded])];
			});
		}
		const times = setTimeout(() => {
			messageContext.goToButtom('smooth')
			clearTimeout(times)
		}, 10)
		console.log('Message got updated new Value ', messagesAdded)
	}, [messagesAdded])

	useEffect(() => {
		async function fetchUsername() {
			await axios
			.get('http://localhost:8800/api/profile/WhoAmI/')
			.then((res) => {
				setWhoAmI(res.data.username)
			})
			.catch((error) => {})
		}
		fetchUsername();

		const times = setTimeout(() => {
			messageContext.goToButtom('auto')
			clearTimeout(times)
		}, 700)
	}, [])

	useEffect(() => {
		index.current = 0
		setOldest((prv) => {
			return []
		})
		setNewmessagesAdded(prev => []);
		console.log(`Hello : ${username}`);
	}, [username])

	useEffect(() => {
		const handleScroll = async () => {
			if (
			messagesRef.current.scrollTop === 0 &&
			index.current > -1 &&
			username
			) {
			setIsLoading(true)
			setLoadingMessage('Messages are loading....')

			const oldScrollHeight = messagesRef.current.scrollHeight

			try {
				const res = await axios.post(
				`http://localhost:8800/api/chat/messages/history/`,
				{
					username: username,
					start: index.current,
				}
				)
				if (res.status == 200) {
				index.current += 30
				} else if (res.status == 204) index.current = -5
				const newMessages = Array.isArray(res.data) ? res.data : []

				setOldest((prevStat) => [...newMessages, ...prevStat])

				setTimeout(() => {
				const newScrollHeight = messagesRef.current.scrollHeight
				messagesRef.current.scrollTop = newScrollHeight - oldScrollHeight
				setIsLoading(false)
				}, 0)
			} catch (error) {
				setIsLoading(false)
			}
			}
		}
		handleScroll()
	}, [Scrolllll])

	return (
		<div
			ref={messagesRef}
			onScroll={() => {
			// setScroll(messagesRef.current.scrollTop)
			Scrolllll.current = messagesRef.current.scrollTop;
			}}
			className={'' + className ? className : ''}
		>
			<>
				{isLoading && (
					<div
						className={`Loading text-center text-white text-[20px] p-[17px] `}
						>
						{' '}
						{LoadingMessage}{' '}
					</div>
				)}
				{Array.isArray(Oldest) &&
					Oldest.map((chatMessages, index) => {
						return (
							<GetChatFromDataBase
								WhoAmI={WhoAmI}
								username={username}
								chatMessages={chatMessages}
								key={index}
							/>
						)
					})}
				{Array.isArray(messages) &&
					messages.map((chatMessages, index) => {
						return (
							<GetChatFromDataBase
								WhoAmI={WhoAmI}
								username={username}
								chatMessages={chatMessages}
								key={index}
							/>
						)
					})}
				{Array.isArray(NewmessagesAdded) &&
					NewmessagesAdded.map((chatMessages, index) => {
						return (
							<StoreMessages
								WhoAmI={WhoAmI}
								username={username}
								chatMessages={chatMessages}
								key={index}
							/>
						)
					})}
			</>
		</div>
	)
}

export default Messages
