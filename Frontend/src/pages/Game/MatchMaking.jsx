import { useCallback, useEffect, useState } from "react"
import MatchMakingCard from "./MatchMakingCard.jsx";
import { useGameSettings } from './GameSettingsContext'
import useWebSocket from "react-use-websocket"

const MatchMaking = () => {

    const [avatar, setAvatar] = useState(true);
    const [message, setMessage] = useState("");
    const gameContext = useGameSettings();
    const { sendMessage, lastMessage, readyState } = useWebSocket("wss://fttran.tech/ws/game/");

    useEffect(() => {
        if (readyState === 1) {
            sendMessage(JSON.stringify({ action: 'join_queue' }));
            console.log("WebSocket connection is open");
        }
        else {
            console.log("WebSocket connection is not open");
            console.log(readyState);
        }
    }, [readyState, sendMessage]);

    const handleLastMessage = useCallback(() => {
        console.log(lastMessage);
        if (lastMessage) {
            const data = JSON.parse(lastMessage.data);
            console.log(lastMessage);
            if (data.status === "matched") {
                gameContext.setHandler("userData", data);
                console.log(data);
                gameContext.setHandler("matchDelay", false);
                setAvatar(false);
            } else if (data.status === "no match found") {
                setMessage("No one wants to play right now. Please try again!");
            }
        }
    }, [lastMessage, gameContext]);

    useEffect(() => {
        handleLastMessage();
    }, [handleLastMessage]);

    // useEffect(() => {
    //     // const fetchPlayerData = async () => {
    //     //     if (oneTime === false) {
    //     //         await Axios.post("https://fttran.tech/api/game/join/",
    //     //         {
    //     //             withCredentials:true,
    //     //         }).then((response) => {
    //     //             oneTime = true;
    //     //             console.log("join request hereeee!!!");
    //     //             clearInterval(fetchDataInterval);
    //     //
    //     //         }).catch(err => {
    //     //             console.log(err);
    //     //             if (err.response?.status == 408) {
    //     //                 clearInterval(fetchDataInterval);
    //     //                 setMessage("No one wants to play right now. Please try again!");
    //     //             }
    //     //         })
    //     //     }
    //     // }

    //     // const fetchDataInterval = setInterval(fetchPlayerData, 1000);

    //     // return () => {
    //     //     clearInterval(fetchDataInterval);
    //     // }

    //     console.log(lastMessage);
    //     if (lastMessage) {
    //         const data = JSON.parse(lastMessage.data);
    //         console.log(lastMessage);
    //         if (data.status === "matched") {
    //             gameContext.setHandler("userData", data);
    //             console.log(data);
    //             gameContext.setHandler("matchDelay", false);
    //             setAvatar(false);
    //         }
    //         else if (data.status === "no match found") {
    //             setMessage("No one wants to play right now. Please try again!");
    //         }
    //     }

    // }, [lastMessage, gameContext])

    return (
        <div className="h-[calc(100vh-105px)] min-h-[650px] pb-[200px] flex flex-col justify-center items-center gap-[200px] max-md:gap-[120px]">
            <div className=" flex justify-center items-center max-md:flex-col gap-[100px] max-md:gap-[30px]">
                <MatchMakingCard
                    avatar={false}
                    bgColor="bg-[#CD7F32]"
                    image="https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"
                    username="abel-all"
                    rank="233"
                />
                <div className="font-bold text-[50px] text-white">VS</div>
                <MatchMakingCard
                    avatar={avatar}
                    bgColor={`bg-[#ff0000]`}
                    image={`https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/aennaki.jpg`}
                    username={`fgfgfg`}
                    rank={`353`}
                    // bgColor={`bg-[${gameContext.userData.player2.badge}]`}
                    // image={`${gameContext.userData.player2.picture}`}
                    // username={`${gameContext.userData.player2.username}`}
                    // rank={`${gameContext.userData.player2.rank}`}
                />
            </div>
            <div className="font-light text-[18px] max-md:text-[15px] text-[#ff0000]">
                {message}
            </div>
        </div>
    )
}

export default MatchMaking
