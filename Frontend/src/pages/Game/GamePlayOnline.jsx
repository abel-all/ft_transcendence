import { useEffect, useRef, useState } from "react"
import rankIcon from "../../assets/imgs/rank.svg"
import tryImg from "../../assets/imgs/tryImg.svg"
import useWebSocket from "react-use-websocket"
import "./css/index.css"
// import { useGameSettings } from "./GameSettingsContext";


// Game vars:
const playerHeight = 15;
const playerWidth = 70;
let canvasWidth = 450;
let canvasHeight = 700;
const ballStartSpeed = 0.7;
const ballDeltaSpeed = .1;
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

const GamePlay = () => {

    const canvasRef = useRef();
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [counter, setCounter] = useState(0);
    const [isGameStart, setIsGameStart] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [isMobileVersion, setIsMobileVersion] = useState(false);

    // setup websocket
    const { sendMessage, lastMessage, readyState} = useWebSocket("ws://aennaki.me");

    useEffect(() => {
        if (lastMessage) {
            const data = JSON.parse(lastMessage.data);
            // update ball and player 2 pos
            ball.x = data.x;
            ball.y = data.y;

            paddleTwo.x = data.playerX;
            // update score
            setPlayer1Score(data.player1Score);
            setPlayer2Score(data.player2Score);
        }
    }, [lastMessage])

    useEffect(() => {

        const counterTimeout = setTimeout(() => {
            setIsGameStart(true);
        }, 4000);

        const counterInterval = setInterval(() => {
            setCounter(counter + 1);
        }, 1000);

        const canvas = canvasRef.current;
        if (canvas && isGameStart && !gameFinished) {
            clearTimeout(counterTimeout);
            clearInterval(counterInterval);
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
                const changeDirection = (e) => {
                    const keyPressed = e.keyCode;

                    const paddle2Left = 37;
                    const paddle2Right = 39;
                    switch (keyPressed) {
                        case paddle2Left:
                            if (paddleOne.x > 0)
                                paddleOne.x -= paddleSpeed;
                            break;
                        case paddle2Right:
                            if (paddleOne.x < canvasWidth - paddleOne.width)
                                paddleOne.x += paddleSpeed;
                            break;
                    }
                }

                const handleMouseMove = (e) => {
                    let rect = canvas.getBoundingClientRect();

                    let newX = e.clientX - rect.left - (paddleOne.width / 2);
                    if (isMobileVersion)
                        newX = (e.clientX - rect.left - (paddleOne.width / 2)) * 1.7;

                    if (newX < (canvasWidth - paddleOne.width) && newX > 0) {
                        paddleOne.x = newX;
                        // send paddle pos to server
                        sendMessage(JSON.stringify({ playerX: newX }));
                    }
                }

                window.addEventListener("mousemove", handleMouseMove);
                window.addEventListener("keydown", changeDirection);

                // reset ball pos :
                // const resetBallPos = () => {
                //     ball.x = canvasWidth / 2;
                //     ball.y = canvasHeight / 2;
                //     ball.speed = ballStartSpeed;
                //     ball.velocityY *= -1;
                // }
                //update: pos, move score:
                // const update = () => {
                //     // ball mov:
                //     ball.x += ball.velocityX * ball.speed;
                //     ball.y += ball.velocityY * ball.speed;

                //     // ball collision with left && right borders:
                //     if ((ball.x + ball.radius) >= canvasWidth || (ball.x - ball.radius) <= 0)
                //         ball.velocityX *= -1;

                //     // ball collision with players:
                //     if (ball.y + ball.radius >= paddleOne.y) {
                //         if (ball.x > paddleOne.x && ball.x < paddleOne.x + paddleOne.width) {
                //             ball.y = paddleOne.y - ball.radius;
                //             ball.velocityY *= -1;
                //             ball.speed += ballDeltaSpeed;
                //         }
                //     }

                //     if (ball.y - ball.radius <= paddleTwo.y + paddleTwo.height) {
                //         if (ball.x > paddleTwo.x && ball.x < paddleTwo.x + paddleTwo.width) {
                //             ball.y = paddleTwo.y + paddleTwo.height + ball.radius;
                //             ball.velocityY *= -1;
                //             ball.speed += ballDeltaSpeed;
                //         }
                //     }

                //     // update score :
                //     if (ball.y <= 0) {
                //         setPlayer1Score(player1Score + 1);
                //         resetBallPos();
                //         if (player1Score === 5)
                //             return;
                //     }
                //     else if (ball.y >= canvasHeight) {
                //         setPlayer2Score(player2Score + 1);
                //         resetBallPos();
                //         if (player2Score === 5)
                //             return;
                //     }
                // }

                const gameLoop = () => {

                    if (window.innerWidth <= 640) {
                        setIsMobileVersion(true);
                    }
                    else
                        setIsMobileVersion(false);

                    render();
                    // update();
                    if (player1Score === 5 || player2Score === 5)
                        return setGameFinished(true);
                };

                const intervalId = setInterval(gameLoop, 1000 / 60);

                return () => {
                    window.removeEventListener("mousemove", handleMouseMove);
                    window.removeEventListener("keydown", changeDirection);
                    clearInterval(intervalId);
                }
            }
    }, [player1Score, player2Score, isGameStart, counter, gameFinished, isMobileVersion, sendMessage])

    const handleTryAgainClick = () => {
        ball.x = canvasWidth / 2;
        ball.y = canvasHeight / 2;
        ball.speed = ballStartSpeed;
        ball.velocityY *= -1;
        setPlayer1Score(0);
        setPlayer2Score(0);
        setGameFinished(false);
    }

    return (
        <>
            {!isGameStart && <div className="fixed z-[49] top-0 left-0 backdrop-blur w-full h-full flex justify-center items-center text-[#fff6f9] font-bold text-[80px] max-sm:text-[30px]">
                {counter}
            </div>}
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
                        username="ychahbi"
                        rank="3435"
                        userImage="https://cdn.intra.42.fr/users/d95f55ada2e553d72f377af58e282003/ychahbi.jpg"
                    />
                </div>
                <div className="canvas-container border border-[#eee] w-fit rounded-[15px] mb-[200px] max-sm:scale-[0.70]">
                    <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="rounded-[15px]"></canvas>
                </div>
            </div>
        </>
    )
}

export default GamePlay
