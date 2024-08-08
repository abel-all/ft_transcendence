import { useEffect, useRef, useState } from "react"
import rankIcon from "../../assets/imgs/rank.svg"
import "./css/index.css"
// import { useGameSettings } from "./GameSettingsContext";


// Game vars:
const playerHeight = 15;
const playerWidth = 70;
const canvasWidth = 400;
const canvasHeight = 500;
const botLevel = 0.6;
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

    useEffect(() => {

        const canvas = canvasRef.current;
        if (canvas) {
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

                // check collision with players :
                const collision = (p, b) => {
                    b.top = b.y - b.radius;
                    b.bottom = b.y + b.radius;
                    b.left = b.x - b.radius;
                    b.right = b.x + b.radius;

                    p.top = p.y;
                    p.bottom = p.y + p.height;
                    p.left = p.x;
                    p.right = p.x + p.width;

                    return (
                        b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom
                    )
                }

                // bot y normalization :
                const botPosNormalization = (currentPos, targetPos) => {
                    return (currentPos + ((targetPos - currentPos) * botLevel))
                }

                // paddleone movement :
                const changeDirection = (e) => {
                    const keyPressed = e.keyCode;

                    const paddle1Left = 65;
                    const paddle1Right = 68;
                    const paddle2Left = 37;
                    const paddle2Right = 39;
                    console.log(paddleSpeed);
                    switch (keyPressed) {
                        case paddle1Left:
                            if (paddleOne.x > 0)
                                paddleOne.x -= paddleSpeed;
                            break;
                        case paddle1Right:
                            if (paddleOne.x < canvasWidth - paddleOne.width)
                                paddleOne.x += paddleSpeed;
                            break;
                        case paddle2Left:
                            if (paddleTwo.x > 0)
                                paddleTwo.x -= paddleSpeed;
                            break;
                        case paddle2Right:
                            if (paddleTwo.x < canvasWidth - paddleTwo.width)
                                paddleTwo.x += paddleSpeed;
                            break;
                    }
                }

                window.addEventListener("mousemove", (e) => {
                    let rect = canvas.getBoundingClientRect();

                    const newX = e.clientX - rect.left - (paddleOne.width / 2);
                    if (newX < (canvasWidth - paddleOne.width) && newX > 0)
                        paddleOne.x = newX;
                });
                window.addEventListener("keydown", changeDirection);

                // reset ball pos :
                const resetBallPos = () => {
                    ball.x = canvasWidth / 2;
                    ball.y = canvasHeight / 2;
                    ball.speed = ballStartSpeed;
                    ball.velocityY *= -1;
                }
                //update: pos, move score:
                const update = () => {
                    // ball mov:
                    ball.x += ball.velocityX * ball.speed;
                    ball.y += ball.velocityY * ball.speed;

                    // ball collision with left && right borders:
                    if ((ball.x + ball.radius) > canvasWidth || (ball.x - ball.radius) < 0)
                        ball.velocityX *= -1;

                    // ball collision with players:
                    //wich player?
                    let selectedPlayer = ball.y < (canvasHeight / 2) ? paddleTwo : paddleOne;
                    if (collision(selectedPlayer, ball)) {
                        ball.velocityY *= -1;

                        // every time ball hists a palyer, we increase its speed:
                        ball.speed += ballDeltaSpeed;
                    }

                    // paddle two movement (simple ai):
                    let targetPos = ball.x - (paddleTwo.width / 2);
                    let currentPos = paddleTwo.x;
                    paddleTwo.x = botPosNormalization(currentPos, targetPos);

                    // update score :
                    if (ball.y + ball.radius < 0) {
                        // paddleTwo.score++;
                        // const res2 = player2Score + 1;
                        setPlayer1Score(player1Score + 1);
                        resetBallPos();
                    }
                    else if (ball.y + ball.radius > canvasHeight) {
                        // paddleOne.score++;
                        // const res1 = player1Score + 1;
                        setPlayer2Score(player2Score + 1);
                        resetBallPos();
                    }
                }

                const gameLoop = () => {
                    render();
                    update();
                };

                const intervalId = setInterval(gameLoop, 1000 / 60);

                return () => clearInterval(intervalId);
        }
    }, [player1Score, player2Score])

    return (
        <div className='sm:h-[calc(100%-105px)] flex flex-col justify-center items-center gap-[24px]'>
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
            <div className="canvas-container border border-[#eee] w-fit rounded-[15px] mb-[200px]">
                <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="rounded-[15px]"></canvas>
            </div>
        </div>
    )
}

export default GamePlay
