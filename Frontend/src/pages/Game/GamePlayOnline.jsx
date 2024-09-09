import { useCallback, useEffect, useRef, useState } from "react"
import rankIcon from "../../assets/imgs/rank.svg"
import tryImg from "../../assets/imgs/tryImg.svg"
import useWebSocket from "react-use-websocket"
import "./css/index.css"
import MatchMakingCard from "./MatchMakingCard.jsx";
import { useGameSettings } from './GameSettingsContext'
import { useNavigate } from "react-router-dom"


// Game vars:
const playerHeight = 15;
const playerWidth = 70;
let canvasWidth = 450;
let canvasHeight = 700;
const ballStartSpeed = 0.7;
// const ballDeltaSpeed = .1;
const paddleSpeed = 13;

const paddleTwo = {
    y: 0,
    x: (canvasWidth / 2) - (playerWidth / 2),
    width: playerWidth,
    height: playerHeight,
    color: "#D9D9D9",
    speed: paddleSpeed,
};
const paddleOne = {
    y: canvasHeight - playerHeight,
    x: (canvasWidth / 2) - (playerWidth / 2),
    width: playerWidth,
    height: playerHeight,
    color: "#D9D9D9",
    speed: paddleSpeed,
};
const net = {
    y: (canvasHeight / 2) - 1,
    x: 0,
    width: 2,
    height: 26,
    color: "#FFFFFF",
};
const ball = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: ballStartSpeed,
    color: "#FFFFFF",
};


const PlayerScore = ({ rank, username, userImage, flexDirection="" }) => {

    return (
        <div className={`user-info-container flex gap-[20px] ${flexDirection}`}>
            <img className="w-full max-w-[70px] h-[70px] rounded-full" src={userImage} />
            <div className="flex flex-col justify-center items-center">
                <div className="font-normal text-[23px] text-[#f0f0f1] w-full text-center">{username}</div>
                <div className="w-full font-light opacity-80 text-[#f0f0f1] flex gap-[15px]">
                    <img src={rankIcon} alt="rank icon" />
                    <div>{rank}</div>
                </div>
            </div>
        </div>
    )
}

let oneTime = false;

const GamePlay = () => {

    const canvasRef = useRef();
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    // const [counter, setCounter] = useState(0);
    // const [isGameStart, setIsGameStart] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [isMobileVersion, setIsMobileVersion] = useState(false);
    const [playerData, setPlayerData] = useState({"player" : {"username" : "", "picture" : "", "badge": "", "rank": ""}});

    const [keyLeftpressed, setKeyLeftpressed] = useState(false);
    const [keyRightpressed, setKeyRightpressed] = useState(false);
    const [isGame, setIsGame] = useState(false);
    const [avatar, setAvatar] = useState(true);
    const [message, setMessage] = useState("");
    const gameContext = useGameSettings();

    const { sendMessage, lastMessage, readyState } = useWebSocket("wss://aennaki.me/ws/game/");

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
        if (lastMessage) {
            const data = JSON.parse(lastMessage.data);
            if (data.status === "match_found" && !oneTime) {
                oneTime = true;
                setPlayerData(data);
                sendMessage(JSON.stringify({action: 'start_game'}));
                setIsGame(true);
                setAvatar(false);
            } else if (data.status === "no match found") {
                setMessage("No one wants to play right now. Please try again!");
            }
            else if (data.status != "Waiting") {
                console.log("data" , data);
                // const data = JSON.parse(lastMessage.data);
                // // update ball and player 2 pos
                // ball.x = data.x;
                // ball.y = data.y;

                // paddleTwo.x = data.playerX;
                // // update score
                // setPlayer1Score(data.player1Score);
                // setPlayer2Score(data.player2Score);

            }
        }

        // return () => { oneTime = false }

    }, [lastMessage, sendMessage]);

    useEffect(() => {
        handleLastMessage();
    }, [handleLastMessage]);

    useEffect(() => {

        let intervalId;
        let handleMouseMove;
        let handleKeyDown;
        let handleKeyUp;

        const canvas = canvasRef.current;
        console.log("don't enter");
        const startGame = () => {
            console.log("enter");
        // const counterTimeout = setTimeout(() => {
            // }, 4000);

        // setIsGameStart(true);
        // setCounter(counter + 1);
        // const counterInterval = setInterval(() => {
        // }, 1000);


        if (canvas) {
            // clearTimeout(counterTimeout);
            // clearInterval(counterInterval);
            const ctx = canvas.getContext("2d");
              // draw functions
            const drawRect = (x, y, width, height, color) => {
                ctx.fillStyle = color;
                ctx.fillRect(x, y, width, height);
            };
            const drawCircle = (x, y, r, color) => {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.fill();
            }
            // const drawText = (x, y, text, color) => {
            //     ctx.fillStyle = color;
            //     ctx.font = "20px Outfit";
            //     ctx.fillText(text, x, y);
            // }
            const drawNet = () => {
                for (let i = 0; i <= canvasWidth; i += (net.height * 2)) {
                    drawRect(net.x + i, net.y, net.height, net.width, net.color);
                }
            };
            const drawPaddles = () => {
                drawRect(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height, paddleOne.color);
                drawRect(paddleTwo.x, paddleTwo.y, paddleTwo.width, paddleTwo.height, paddleTwo.color);
            };
            const drawBall = () => {
                drawCircle(ball.x, ball.y,ball.radius, ball.color);
            }

            const render = () => {
                drawRect(0, 0, canvasWidth, canvasHeight, "#1F1F1F");
                drawNet();
                drawPaddles();
                drawBall();
            };
            // paddleone movement :
            handleKeyDown = (e) => {
                switch (e.keyCode) {
                    case 37:
                        setKeyLeftpressed(true);
                        break;
                    case 39:
                        setKeyRightpressed(true);
                        break;
                }
            }
            handleKeyUp = (e) => {
                switch (e.keyCode) {
                    case 37:
                        setKeyLeftpressed(false);
                        break;
                    case 39:
                        setKeyRightpressed(false);
                        break;
                }
            }

            handleMouseMove = (e) => {
                let rect = canvas.getBoundingClientRect();
                let newX = e.clientX - rect.left - (paddleOne.width / 2);
                if (isMobileVersion)
                    newX = (e.clientX - rect.left - (paddleOne.width / 2)) * 1.7;
                if (newX < (canvasWidth - paddleOne.width) && newX > 0) {
                    paddleOne.x = newX;
                    // send paddle pos to server
                    sendMessage(JSON.stringify({action: 'update_game_state'}));
                    sendMessage(JSON.stringify({ playerY: newX }));
                }
            }
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("keydown", handleKeyDown);
            window.addEventListener("keyup", handleKeyUp);

            const gameLoop = () => {
                if (window.innerWidth <= 640) {
                    setIsMobileVersion(true);
                }
                else
                    setIsMobileVersion(false);
                render();
                // paddles movements :
                if (keyLeftpressed && paddleOne.x > 0) {
                    paddleOne.x -= paddleSpeed;
                    sendMessage(JSON.stringify({action: 'update_game_state'}));
                    sendMessage(JSON.stringify({ playerY: paddleOne.x }));
                }
                else if (keyRightpressed && paddleOne.x < canvasWidth - paddleOne.width) {
                    paddleOne.x += paddleSpeed;
                    sendMessage(JSON.stringify({action: 'update_game_state'}));
                    sendMessage(JSON.stringify({ playerY: paddleOne.x }));
                }
                if (player1Score === 5 || player2Score === 5)
                    return setGameFinished(true);
            };

            intervalId = setInterval(gameLoop, 1000 / 60);

        }
    }

        if (isGame) {
            console.log("gamelooooopppppp!!!@@@@@@##########");
            startGame();
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            clearInterval(intervalId);
        }

    }, [player1Score, player2Score, gameFinished, isMobileVersion, sendMessage, isGame, keyLeftpressed, keyRightpressed])

    const handleTryAgainClick = () => {
        // ball.x = canvasWidth / 2;
        // ball.y = canvasHeight / 2;
        // ball.speed = ballStartSpeed;
        // ball.velocityY *= -1;
        // setPlayer1Score(0);
        // setPlayer2Score(0);
        // setGameFinished(false);

    }

    console.log("this is isGame", isGame);

    return (
        <>
            {!isGame ?
                <div className="h-[calc(100vh-105px)] min-h-[1000px] pb-[200px] flex flex-col justify-center items-center gap-[200px] max-md:gap-[120px]">
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
                            bgColor={playerData.player.badge === "BRONZE" ? "#CD7F32" : "#fff6f9"}
                            image={playerData.player.picture === "" ? "https://cdn.intra.42.fr/users/d556031145f66ede6c1a71a8ee4b730c/zbendahh.jpg" : playerData.player.picture}
                            username={playerData.player.username}
                            rank={playerData.player.rank}
                        />
                    </div>
                    <div className="font-light text-[18px] max-md:text-[15px] text-[#ff0000]">
                        {message}
                    </div>
                </div>
            :
            <>
                {/* {!isGameStart && <div className="fixed z-[49] top-0 left-0 backdrop-blur w-full h-full flex justify-center items-center text-[#fff6f9] font-bold text-[80px] max-sm:text-[30px]">
                    {counter}
                </div>} */}
                {gameFinished && <div className="fixed z-[49] top-0 left-0 backdrop-blur w-full h-full flex justify-center items-center">
                    <div className="text-[#fff6f9] items-center flex flex-col gap-[20px]">
                        <div className="font-medium text-[50px] max-sm:text-[30px]">Game Finished</div>
                        <img onClick={handleTryAgainClick} className="cursor-pointer w-[40px] max-sm:w-[30px] hover:opacity-80" src={tryImg} />
                    </div>
                </div>}
                <div className='h-full flex flex-col justify-center items-center gap-[24px] max-sm:gap-0'>
                    <div className="score-players-container w-full max-w-[600px] flex justify-between max-sm:flex-col max-sm:items-center max-sm:gap-[15px] max-sm:scale-[0.8]">
                        <PlayerScore
                            username="abel-all"
                            rank="345"
                            userImage="https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"
                        />
                        <div className="score-container w-full flex items-center justify-center flex-1">
                            <div className="player1-score-gradient flex justify-end p-[11px] pr-[20px] flex-1 score text-[#000] text-[32px] font-light">{player1Score}</div>
                            <div className="player2-score-gradient flex flex-1 p-[11px] pl-[20px] score text-[#000] text-[32px] font-light">{player2Score}</div>
                        </div>
                        <PlayerScore
                            flexDirection="flex-row-reverse"
                            username={playerData.player.username}
                            rank={playerData.player.rank}
                            userImage={playerData.player.picture === "" ? "https://cdn.intra.42.fr/users/d556031145f66ede6c1a71a8ee4b730c/zbendahh.jpg" : playerData.player.picture}
                        />
                    </div>
                    <div className="canvas-container border border-[#eee] w-fit rounded-[15px] mb-[200px] max-sm:scale-[0.70]">
                        <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="rounded-[15px]"></canvas>
                    </div>
                </div>
            </>
            }
        </>
    )
}

export default GamePlay
