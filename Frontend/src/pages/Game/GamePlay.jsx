import { useEffect, useRef, useState } from "react"
// import { useGameSettings } from "./GameSettingsContext";


// Game vars:
const playerHeight = 88;
const playerWidth = 20;
const canvasWidth = 848;
const canvasHeight = 533;
const paddleOne = {
    x: 0,
    y: (canvasHeight / 2) - (playerHeight / 2),
    width: playerWidth,
    height: playerHeight,
    color: "#D9D9D9",
    score: 0,
};
const paddleTwo = {
    x: canvasWidth - playerWidth,
    y: (canvasHeight / 2) - (playerHeight / 2),
    width: playerWidth,
    height: playerHeight,
    color: "#D9D9D9",
    score: 0,
};
const net = {
    x: (canvasWidth / 2) - 1,
    y: 0,
    width: 2,
    height: 26,
    color: "#FFFFFF",
};

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

                // const drawCircle = (x, y, r, color) => {
                //     ctx.fillStyle = color;
                //     ctx.beginPath();
                //     ctx.arc(x, y, r, 0, Math.PI * 2, false);
                //     ctx.closePath();
                //     ctx.fill();
                // }
                
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
                
                const render = () => {
                    drawRect(0, 0, canvasWidth, canvasHeight, "#1F1F1F");
                    drawNet();
                    drawPaddles();
                };
                
                const gameLoop = () => {
                    render();
                    // update scores
                    setPlayer1Score(paddleOne.score);
                    setPlayer2Score(paddleTwo.score);
                };
                
                const intervalId = setInterval(gameLoop, 1000 / 60);
                
                return () => clearInterval(intervalId);
        }
    }, [])

    return (
        <div className='sm:h-[calc(100%-105px)] flex justify-center items-center'>
            <div className="score-players-container">

            </div>
            <div className="canvas-container border border-[#eee] w-fit m-auto rounded-[20px]">
                <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="rounded-[20px]"></canvas>
            </div>
        </div>
    )
}

export default GamePlay