import useWebSocket from "react-use-websocket";
import Alert from "./Alert";
import { useEffect, useState } from "react";
import { useGameSettings } from '../pages/Game/GameSettingsContext'

const NotifyUser = () => {
	const gameContext = useGameSettings()

	const [ShowAlert, setShowAlert] = useState(true);
	const [message, setMessage] = useState('');
	const [color, setColor] = useState('');
	const [socketUrl, setSocketUrl] = useState(null);

	const handelShowingAlert = (stats) => {
		setShowAlert(stats)

		const TimeOut = setTimeout(() => {
			setShowAlert(!stats)
			clearTimeout(TimeOut)
		}, 4000)
	}


	useEffect(() => {
		if (gameContext.Auth) {
			setSocketUrl('ws://localhost:8800/ws/notifications/');
		} else {
			// const socket = getWebSocket();
			// if (socket) {
			//   socket.close();
			//   console.log('notifications WebSocket connection manually closed.');
			// }
			setSocketUrl(null);
		}
	}, [gameContext.Auth]);

	const { lastMessage, getWebSocket } = useWebSocket(socketUrl,
		{
			onOpen: ()=> console.log('WebSocket notifications'),
			onClose: ()=> console.log('WebSocket notifications Closed!'),
			shouldReconnect: () => true,
			onError: (error) => console.error('WebSocket error:', error),
			reconnectInterval: 3000,
		}
	)
	
	useEffect(() => {
		if (lastMessage && lastMessage != null) {
			handelShowingAlert(true)
			console.log('The message from webSocket ', lastMessage)
			const { type, from, status } = JSON.parse(lastMessage.data)
			
			if (type == 'friendship_request') {
				setMessage(`${from} sent you a friend request`)
				setColor('green')
			}
						
			if (type == 'tournament_reminder_notification') {
				setMessage(`The tournament will start in 5 seconds.`)
				setColor('green')
			}
						
			if (type == 'send_playwithme_request') {
				setMessage(`${from} has sent you a game request`)
				setColor('green')
			}
						
			if (type == 'join_tournament_notification') {
				setMessage(`${from} sent you a tournament join request`)
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
	}, [lastMessage])
	return ShowAlert && <Alert message={message} color={color} />
}

export default NotifyUser;
