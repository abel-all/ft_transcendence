import { useEffect, useRef, useState } from "react"
import tryImg from "../../assets/imgs/tryImg.svg"
import gamePage from "../../assets/imgs/gamePageBlack.svg"
import avatarIcon from "../../assets/imgs/avatarImgWhite.svg"
import BotImgOne from "../../assets/imgs/botImgOne.svg"
import botLevelTwo from "../../assets/imgs/botLevelTwo.svg"
import botLevelThree from "../../assets/imgs/botLevelThree.svg"
import botImgFour from "../../assets/imgs/botImg.svg"
import PlayerScore from "./PlayerScore"
import { useGameSettings } from './GameSettingsContext'
import "./css/index.css"
import { useNavigate } from "react-router-dom"
import {toBadgeConverter} from "../../hooks/badgeConverter"
import gameRightKey from "../../assets/imgs/gameRightKey.svg"
import gameLeftKey from "../../assets/imgs/gameLeftKey.svg"
import gameRightKeyWhite from "../../assets/imgs/gameRightKeyWhite.svg"
import gameLeftKeyWhite from "../../assets/imgs/gameLeftKeyWhite.svg"


// Game vars:
const playerHeight = 15;
const playerWidth = 70;
let canvasWidth = 450;
let canvasHeight = 700;
const ballStartSpeed = 0.7;
const ballDeltaSpeed = .1;
const paddleSpeed = 13;

const createPaddle = (y) => ({
    y,
    x: (canvasWidth / 2) - (playerWidth / 2),
    width: playerWidth,
    height: playerHeight,
    color: "#D9D9D9",
    speed: paddleSpeed,
});

let paddleTwo = createPaddle(0);
let paddleOne = createPaddle(canvasHeight - playerHeight);
const net = {
    y: (canvasHeight / 2) - 1,
    x: 0,
    width: 2,
    height: 26,
    color: "#FFFFFF",
};
let ball = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: ballStartSpeed,
    color: "#FFFFFF",
};

const GamePlay = ({levelOfBot = 0, ballColor={}, mapColor, score}) => {

    const canvasRef = useRef();
    const gameContext = useGameSettings();
    const navigate = useNavigate();
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [counter, setCounter] = useState(0);
    const [isGameStart, setIsGameStart] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [isMobileVersion, setIsMobileVersion] = useState(false);

    const [keyApressed, setKeyApressed] = useState(false);
    const [keyDpressed, setKeyDpressed] = useState(false);
    const [keyLeftpressed, setKeyLeftpressed] = useState(false);
    const [keyRightpressed, setKeyRightpressed] = useState(false);
    const [botDetails, setBotDetails] = useState(() => {
        switch (levelOfBot) {
            case 0:
                return {img: avatarIcon, rank: "0", name: "Player", grColor: "to-[#ffffff]"}
            case 0.1:
                return {img: BotImgOne, rank: "50", name: "Beginner", grColor: "to-[#a8e6a3]"}
            case 0.2:
                return {img: botLevelTwo, rank: "150", name: "Intermediate", grColor: "to-[#f9d648]"}
            case 0.5:
                return {img: botLevelThree, rank: "300", name: "Advanced", grColor: "to-[#f08a24]"}
            case 0.8:
                return {img: botImgFour, rank: "750", name: "Expert", grColor: "to-[#ff4949]"}
        }
    });
    const [gradientColor, setGradientColor] = useState(toBadgeConverter(gameContext.selfData?.badge))


    useEffect(() => {
        setGradientColor(toBadgeConverter(gameContext.selfData?.badge))
    }, [gameContext.selfData])

    useEffect(() => {
        const counterTimeout = setTimeout(() => {
            setIsGameStart(true);
        }, 4000);

        const counterInterval = setInterval(() => {
            setCounter(prev => prev + 1);
        }, 1000);

        return () => {
            handleTryAgainClick();
            clearTimeout(counterTimeout);
            clearInterval(counterInterval);
        }

    }, [])

    useEffect(() => {

        if (!isGameStart || gameFinished) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        const render = () => {
            drawRect(0, 0, canvasWidth, canvasHeight, mapColor, ctx);
            drawNet(ctx);
            drawPaddles(ctx);
            drawBall(ctx);
        };

        const update = () => {
            // paddles movements :
            if (keyLeftpressed && paddleOne.x > 0)
                paddleOne.x -= paddleSpeed;
            else if (keyRightpressed && paddleOne.x < canvasWidth - paddleOne.width)
                paddleOne.x += paddleSpeed;
            if (keyApressed && paddleTwo.x > 0 && !levelOfBot)
                paddleTwo.x -= paddleSpeed;
            else if (keyDpressed && paddleTwo.x < canvasWidth - paddleTwo.width && !levelOfBot)
                paddleTwo.x += paddleSpeed;

            // ball mov:
            ball.x += ball.velocityX * ball.speed;
            ball.y += ball.velocityY * ball.speed;

            // ball collision with left && right borders:
            if ((ball.x + ball.radius) >= canvasWidth || (ball.x - ball.radius) <= 0)
                ball.velocityX *= -1;

            // ball collision with players:
            if (ball.y + ball.radius >= paddleOne.y ) {
                if (ball.x > paddleOne.x && ball.x < paddleOne.x + paddleOne.width) {
                    ball.y = paddleOne.y - ball.radius;
                    ball.velocityY *= -1;
                    ball.speed += ballDeltaSpeed;
                }
            }

            if (ball.y - ball.radius <= paddleTwo.y + paddleTwo.height) {
                if (ball.x > paddleTwo.x && ball.x < paddleTwo.x + paddleTwo.width) {
                    ball.y = paddleTwo.y + paddleTwo.height + ball.radius;
                    ball.velocityY *= -1;
                    ball.speed += ballDeltaSpeed;
                }
            }

            // paddle two movement (simple ai):
            let targetPos = ball.x - (paddleTwo.width / 2);
            let currentPos = paddleTwo.x;
            paddleTwo.x = botPosNormalization(currentPos, targetPos);

            // update score :
            if (ball.y <= 0) {
                setPlayer1Score(player1Score + 1);
                resetBallPos();
                if (player1Score === 5)
                    return;
            }
            else if (ball.y >= canvasHeight) {
                setPlayer2Score(player2Score + 1);
                resetBallPos();
                if (player2Score === 5)
                    return;
            }
        }
        // paddleone movement :
        const handleKeyDown = (e) => handleKeyPress(e.keyCode, true);

        const handleKeyUp = (e) => handleKeyPress(e.keyCode, false);

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            let newX = e.clientX - rect.left - (paddleOne.width / 2);
            if (isMobileVersion)
                newX *= 1.7;
            if (newX < (canvasWidth - paddleOne.width) && newX > 0)
                paddleOne.x = newX;
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        levelOfBot && !isMobileVersion && window.addEventListener("mousemove", handleMouseMove);

        const gameLoop = () => {

            setIsMobileVersion(window.innerWidth <= 640);
            render();
            update();
            if (player1Score === score || player2Score === score)
                setGameFinished(true);

        };

        const intervalId = setInterval(gameLoop, 1000 / 60);

        return () => {
            levelOfBot && window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            clearInterval(intervalId);
        }
    }, [player1Score, player2Score, isGameStart, gameFinished, isMobileVersion, keyApressed, keyDpressed, keyLeftpressed, keyRightpressed])

        // draw functions
    const drawRect = (x, y, width, height, color, ctx) => {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    const drawCircle = (x, y, r, color, ctx) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    }

    const drawNet = (ctx) => {
        for (let i = 0; i <= canvasWidth; i += (net.height * 2)) {
            drawRect(net.x + i, net.y, net.height, net.width, net.color, ctx);
        }
    }

    const drawPaddles = (ctx) => {
        drawRect(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height, ballColor.paddleColor, ctx);
        drawRect(paddleTwo.x, paddleTwo.y, paddleTwo.width, paddleTwo.height, ballColor.paddleColor, ctx);
    }

    const drawBall = (ctx) => {
        drawCircle(ball.x, ball.y,ball.radius, ballColor.ballColor, ctx);
    }

    const handleKeyPress = (keyCode, value) => {
        switch (keyCode) {
            case 37:
                setKeyLeftpressed(value);
                break;
            case 39:
                setKeyRightpressed(value);
                break;
            case 65:
                setKeyApressed(value);
                break;
            case 68:
                setKeyDpressed(value);
                break;
        }
    }

    // reset ball pos :
    const resetBallPos = () => {
        ball.x = canvasWidth / 2;
        ball.y = canvasHeight / 2;
        ball.speed = ballStartSpeed;
        ball.velocityY *= -1;
    }

    // bot y normalization :
    const botPosNormalization = (currentPos, targetPos) => (currentPos + ((targetPos - currentPos) * levelOfBot))

    //update: pos, move score:

    const handleTryAgainClick = () => {
        paddleTwo = createPaddle(0);
        paddleOne = createPaddle(canvasHeight - playerHeight);
        ball = {
            x: canvasWidth / 2,
            y: canvasHeight / 2,
            radius: 10,
            velocityX: 5,
            velocityY: 5,
            speed: ballStartSpeed,
            color: "#FFFFFF",
        };
        setPlayer1Score(0);
        setPlayer2Score(0);
        setGameFinished(false);
    }
    const handleBackToGamePage = () => {
        navigate("/game")
    }

    return (
        <>
            {!isGameStart && <div className="fixed z-[49] top-0 left-0 backdrop-blur w-full h-full flex justify-center items-center text-[#fff6f9] font-bold text-[80px] max-sm:text-[30px]">
                {4 - counter}
            </div>}
            {gameFinished && <div className="fixed z-[49] top-0 left-0 backdrop-blur w-full h-full flex justify-center items-center">
                <div className="text-[#fff6f9] items-center flex flex-col gap-[80px]">
                    <div className="font-light text-[50px] max-sm:text-[30px]">Game Finished</div>
                    <div className="flex gap-3 items-center max-md:flex-col">
                        <button onClick={handleTryAgainClick} className="w-60 py-1 px-3 rounded-md text-[#000000] bg-[#fff] flex justify-between items-center">
                            <div>Try again</div>
                            <img className="w-6 h-6" src={tryImg} alt="try again icon" />
                        </button>
                        <div>Or</div>
                        <button onClick={handleBackToGamePage} className="w-60 py-1 px-3 rounded-md text-[#000000] bg-[#fff] flex justify-between items-center">
                            <div>Back to game page</div>
                            <img className="w-6 h-6" src={gamePage} alt="game page icon" />
                        </button>
                    </div>
                </div>
            </div>}
            <div className='h-[100vh] min-h-[1500px] flex flex-col justify-center items-center gap-[24px] max-sm:gap-0'>
                <div className="score-players-container w-full max-w-[600px] flex justify-between max-sm:flex-col max-sm:items-center max-sm:gap-[15px] max-sm:scale-[0.8]">
                    <PlayerScore
                        username={gameContext.selfData?.username}
                        rank={gameContext.selfData?.rank}
                        userImage={gameContext.selfData?.picture || "https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"}
                    />
                    <div className="score-container w-full flex items-center justify-center flex-1">
                        <div className={`bg-gradient-to-r from-[#161c20] via-[#161c20] ${gradientColor} flex justify-end p-[11px] pr-[20px] flex-1 score text-[#000] text-[32px] font-light`}>{player1Score}</div>
                        <div className={`bg-gradient-to-l from-[#161c20] via-[#161c20] ${botDetails?.grColor} flex flex-1 p-[11px] pl-[20px] score text-[#000] text-[32px] font-light`}>{player2Score}</div>
                    </div>
                    <PlayerScore
                        flexDirection="flex-row-reverse"
                        username={botDetails?.name}
                        rank={botDetails?.rank}
                        userImage={botDetails?.img}
                    />
                </div>
                <div className="flex flex-col">
                    {isMobileVersion && !levelOfBot && 
                        <div className="relative">
                            <div className="w-full flex justify-around mb-[200px] absolute max-sm:top-[35px]">
                                <button onMouseDown={() => setKeyApressed(true)} onMouseUp={() => setKeyApressed(false)}>
                                    <img className="w-16 h-w-16" src={gameLeftKeyWhite} alt="ping pong game" />
                                </button>
                                <button onMouseDown={() => setKeyDpressed(true)} onMouseUp={() => setKeyDpressed(false)}>
                                    <img className="w-16 h-w-16" src={gameRightKeyWhite} alt="ping pong game" />
                                </button>
                            </div>
                        </div>
                    }
                    <div className="canvas-container border border-[#eee] w-fit rounded-[15px] max-sm:scale-[0.70]">
                        <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="rounded-[15px]"></canvas>
                    </div>
                    {isMobileVersion && 
                        <div className="relative">
                            <div className="w-full flex justify-around mb-[200px] absolute max-sm:top-[-100px]">
                                <button onMouseDown={() => setKeyLeftpressed(true)} onMouseUp={() => setKeyLeftpressed(false)}>
                                    <img className="w-16 h-w-16" src={gameLeftKey} alt="ping pong game" />
                                </button>
                                <button onMouseDown={() => setKeyRightpressed(true)} onMouseUp={() => setKeyRightpressed(false)}>
                                    <img className="w-16 h-w-16" src={gameRightKey} alt="ping pong game" />
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default GamePlay
