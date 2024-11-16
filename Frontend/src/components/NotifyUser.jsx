import useWebSocket from "react-use-websocket";
import Alert from "./Alert";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const NotifyUser = () => {
	const [isAuth, setIsAuth] = useState(false);

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
		axios.get('http://localhost:8800/api/auth/token/')
		.then((res) => {
			if (res.status == 200) {
				setIsAuth(true)
			}
		})
		.catch((err) => {
			setIsAuth(false);
		})
	}, [])


	useEffect(() => {
	  if (isAuth) {
		setSocketUrl('ws://localhost:8800/ws/notifications/');
	  } else {
		setSocketUrl(null);
	  }
	}, [isAuth]);

	const { lastMessage } = useWebSocket(socketUrl,
		{
			filter: () => Auth,
			enabled: isAuth,
			onError: (error) => console.error('WebSocket error:', error),
			shouldReconnect: () => true,
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
