import { useEffect, useRef, useState } from "react"
import rankIcon from "../../assets/imgs/rank.svg"
import "./css/index.css"
// import { useGameSettings } from "./GameSettingsContext";


// Game vars:
const playerHeight = 88;
const playerWidth = 20;
const canvasWidth = 848;
const canvasHeight = 533;
const botLevel = 0.9;
const ballStartSpeed = 0.5;
const ballDeltaSpeed = .1;
const paddleSpeed = 20;

const paddleOne = {
    x: 0,
    y: (canvasHeight / 2) - (playerHeight / 2),
    width: playerWidth,
    height: playerHeight,
    color: "#D9D9D9",
    score: 0,
    speed: paddleSpeed,
};
const paddleTwo = {
    x: canvasWidth - playerWidth,
    y: (canvasHeight / 2) - (playerHeight / 2),
    width: playerWidth,
    height: playerHeight,
    color: "#D9D9D9",
    score: 0,
    speed: paddleSpeed,
};
const net = {
    x: (canvasWidth / 2) - 1,
    y: 0,
    width: 2,
    height: 26,
    color: "#FFFFFF",
};
const ball = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: 17,
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
            
            // game loop
            // const fps = 60;
            // setInterval(Game(ctx, canvas.width, canvas.height), 1000 / fps);
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
                    for (let i = 0; i <= canvasHeight; i += (net.height * 2)) {
                        drawRect(net.x, net.y + i, net.width, net.height, net.color);
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

                    const paddle1Up = 87;
                    const paddle1Down = 83;
                    const paddle2Up = 38;
                    const paddle2Down = 40;

                    switch (keyPressed) {
                        case paddle1Up:
                            if (paddleOne.y > 0)
                                paddleOne.y -= paddleOne.speed;
                            break;
                        case paddle1Down:
                            if (paddleOne.y < canvasHeight - paddleOne.height)
                                paddleOne.y += paddleOne.speed;
                            break;
                        case paddle2Up:
                            if (paddleTwo.y > 0)
                                paddleTwo.y -= paddleTwo.speed;
                            break;
                        case paddle2Down:
                            if (paddleTwo.y < canvasHeight - paddleTwo.height)
                                paddleTwo.y += paddleTwo.speed;
                            break;
                    }
                }

                window.addEventListener("mousemove", (e) => {
                    let rect = canvas.getBoundingClientRect();

                    const newY = e.clientY - rect.top - (paddleOne.height / 2);
                    if (newY < (canvasHeight - paddleOne.height) && newY > 0)
                        paddleOne.y = newY;
                });
                window.addEventListener("keydown", changeDirection);

                // reset ball pos :
                const resetBallPos = () => {
                    ball.x = canvasWidth / 2;
                    ball.y = canvasHeight / 2;
                    ball.speed = ballStartSpeed;
                    ball.velocityX *= -1;
                }
                //update: pos, move score:
                const update = () => {
                    // ball mov:
                    ball.x += ball.velocityX * ball.speed;
                    ball.y += ball.velocityY * ball.speed;

                    // ball collision with top && bottom borders:
                    if ((ball.y + ball.radius) > canvasHeight || (ball.y - ball.radius) < 0)
                        ball.velocityY *= -1;

                    // ball collision with players:
                    //wich player?
                    let selectedPlayer = ball.x < (canvasWidth / 2) ? paddleOne : paddleTwo;
                    if (collision(selectedPlayer, ball)) {
                        ball.velocityX *= -1;

                        // every time ball hists a palyer, we increase its speed:
                        ball.speed += ballDeltaSpeed;
                    }
                    
                    // paddle two movement (simple ai):
                    let targetPos = ball.y - (paddleTwo.height / 2);
                    let currentPos = paddleTwo.y;
                    paddleTwo.y = botPosNormalization(currentPos, targetPos);

                    // update score :
                    if (ball.x + ball.radius < 0) {
                        paddleTwo.score++;
                        setPlayer2Score(paddleTwo.score);
                        resetBallPos();
                    }
                    else if (ball.x + ball.radius > canvasWidth) {
                        paddleOne.score++;
                        setPlayer1Score(paddleOne.score);
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
    }, [])

    return (
        <div className='sm:h-[calc(100%-105px)] flex flex-col justify-center items-center gap-[24px]'>
            <div className="score-players-container w-full max-w-[848px] flex justify-between max-sm:flex-col max-sm:items-center max-sm:gap-[15px] max-sm:scale-[0.]">
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
                <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="w-full max-w-[848px] rounded-[20px]"></canvas>
            </div>
        </div>
    )
}

export default GamePlay