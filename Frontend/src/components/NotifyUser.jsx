import useWebSocket from "react-use-websocket";
import Alert from "./Alert";
import { useEffect , useState} from "react";

const NotifyUser = () => {
    const [ShowAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    
    useEffect(() => {

    }, [message, color]);

    const handelShowingAlert = (stats) => {
        setShowAlert(stats);

        const TimeOut = setTimeout(() => {
            setShowAlert(!stats);
            clearTimeout(TimeOut);
        }, 4000);
    }

    const {lastMessage } = useWebSocket('wss://fttran.tech/ws/friendship-request/', {
        onError: (error) => console.error('WebSocket error:', error),
        shouldReconnect: () => true,
        reconnectInterval: 3000
      });

    useEffect(() => {
        if (lastMessage) {
            handelShowingAlert(true);
            console.log("The message from webSocket ", lastMessage);
            const { type, from, status } = JSON.parse(lastMessage.data);

            if (type == "friendship_request") {
                setMessage(`${from} sent you a friend request`);
                setColor("green");
            }
            
            if (type == "handle_friendship_request") {
                if (status == "rejected") {
                    setMessage(`${from} has rejected your friend request`);
                    setColor("#ff0000");
                }
                else if (status === "accepted") {
                    setMessage(`${from} has accepted your friend request`);
                    setColor("green");
                }
                console.log(status);
            }
        }
      }, [lastMessage]);

    return (
        ShowAlert && <Alert message={message} color={color}/>
    )
}

export default NotifyUser;