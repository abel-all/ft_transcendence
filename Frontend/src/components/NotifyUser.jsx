import useWebSocket from "react-use-websocket";
import Alert from "./Alert";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "./Auth";

const NotifyUser = () => {
	const auth = useAuth()

	const [ShowAlert, setShowAlert] = useState(true);
	const [message, setMessage] = useState('');
	const [color, setColor] = useState('');
	let lastMessage;

	const handelShowingAlert = (stats) => {
		setShowAlert(stats)

		const TimeOut = setTimeout(() => {
			setShowAlert(!stats)
			clearTimeout(TimeOut)
		}, 4000)
	}
	
	useEffect(() => {
	
		if (auth.isAuth) {
			const { lastMessage } = useWebSocket(
				'ws://localhost:8800/ws/notifications/',
				{
					onError: (error) => console.error('WebSocket error:', error),
					shouldReconnect: () => true,
					reconnectInterval: 3000,
				}
			)
			if (lastMessage) {
				handelShowingAlert(true)
				console.log('The message from webSocket ', lastMessage)
				const { type, from, status } = JSON.parse(lastMessage.data)
				
				if (type == 'friendship_request') {
					setMessage(`${from} sent you a friend request`)
					setColor('green')
				}

				if (type == 'handle_friendship_request') {
					if (status == 'rejected') {
						setMessage(`${from} has rejected your friend request`)
						setColor('#ff0000')
					} else if (status === 'accepted') {
						setMessage(`${from} has accepted your friend request`)
						setColor('green')
					}
					console.log(status)
				}
			}
		}
	}, [lastMessage])

	// useEffect(() => {}, [message, color])
	return ShowAlert && <Alert message={message} color={color} />
}

export default NotifyUser;
