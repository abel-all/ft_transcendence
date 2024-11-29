import { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import "./css/index.css";
import MatchMakingCard from "./MatchMakingCard.jsx";
import { useGameSettings } from "./GameSettingsContext";
import PlayerScore from "./PlayerScore";
import GameEndScreen from "./GameEndScreen";
import badgeConverter, {toBadgeConverter}  from "../../hooks/badgeConverter"
import gameRightKey from "../../assets/imgs/gameRightKey.svg"
import gameLeftKey from "../../assets/imgs/gameLeftKey.svg"
import "./css/index.css"
import { useNavigate } from "react-router-dom";
import tryImg from "../../assets/imgs/tryImg.svg";
import gamePage from "../../assets/imgs/gamePageBlack.svg";
import defualtImg from "../../assets/imgs/defualtImg.jpg";

// Game vars:
const playerHeight = 15;
const playerWidth = 70;
let canvasWidth = 450;
let canvasHeight = 700;
const paddleSpeed = 13;

let paddleTwo = {
  y: 0,
  x: canvasWidth / 2 - playerWidth / 2,
  width: playerWidth,
  height: playerHeight,
  color: "#D9D9D9",
  speed: paddleSpeed,
};
let paddleOne = {
  y: canvasHeight - playerHeight,
  x: canvasWidth / 2 - playerWidth / 2,
  width: playerWidth,
  height: playerHeight,
  color: "#D9D9D9",
  speed: paddleSpeed,
};
const net = {
  y: canvasHeight / 2 - 1,
  x: 0,
  width: 2,
  height: 26,
  color: "#FFFFFF",
};
let ball = {
  x: canvasWidth / 2,
  y: canvasHeight / 2,
  radius: 10,
  color: "#FFFFFF",
};

let waitingTimeout;

const GamePlayOnline = ({ mapColor, ballColor={} }) => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const gameContext = useGameSettings();
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [isMobileVersion, setIsMobileVersion] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const [playerData, setPlayerData] = useState({});
  const [endMatchWinner, setEndMatchWinner] = useState(0);
  const [endMatchScore, setEndMatchScore] = useState("");

  const [keyLeftpressed, setKeyLeftpressed] = useState(false);
  const [keyRightpressed, setKeyRightpressed] = useState(false);
  const [matchId, setMatchId] = useState(-1);
  const [isGame, setIsGame] = useState(false);
  const [avatar, setAvatar] = useState(true);
  const [isGameEnd, setIsIsGameEnd] = useState(false);
  const [isGameCanceled, setIsGameCanceled] = useState(false);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [ballCor, setBallCor] = useState({
    x: canvasWidth / 2,
    y: canvasHeight / 2,
  });
  const oneTime = useRef(false);
  const [paddleCor, setPaddleCor] = useState(canvasWidth / 2 - playerWidth / 2);
  const [message, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [player1GradientColor, setPlayer1GradientColor] = useState(toBadgeConverter(gameContext.selfData?.badge))
  const [player2GradientColor, setPlayer2GradientColor] = useState(toBadgeConverter(playerData?.player?.badge))
  const urlSearchString = location.search
  const params = new URLSearchParams(urlSearchString)
  const paramValue = params.get('param')

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8800/ws/game/"
  );

  useEffect(() => {
    setPlayer1GradientColor(toBadgeConverter(gameContext.selfData?.badge))
    setPlayer2GradientColor(toBadgeConverter(playerData?.player?.badge))
  }, [playerData, gameContext.selfData])

  useEffect(() => {
    if (avatar) return
    const counterTimeout = setTimeout(() => {
      if (!isGameCanceled) {
        sendMessage(
          JSON.stringify({ action: "start_game", match_id: matchId })
        );
        setIsGame(true);
      }
      clearInterval(counterInterval);
    }, 5000)

    const counterInterval = setInterval(() => {
        setCounter(prev => prev + 1);
    }, 1000);

  return () => {
      clearTimeout(counterTimeout);
      clearInterval(counterInterval);
  }
  }, [avatar, isGameCanceled])

  useEffect(() => {
    if (readyState === 1) {
      if (gameContext.isRandomGame === true && !paramValue) {
        sendMessage(JSON.stringify({ action: "join_queue" }))
        waitingTimeout = setTimeout(() => {
          if (!paramValue)
            setIsWaiting(false);
        }, 200000);
      }
      else
        sendMessage(JSON.stringify({ action: "invitation", username: paramValue }));
    }

    return () => {
      paddleTwo = {
        y: 0,
        x: canvasWidth / 2 - playerWidth / 2,
        width: playerWidth,
        height: playerHeight,
        color: "#D9D9D9",
        speed: paddleSpeed,
      };
      paddleOne = {
        y: canvasHeight - playerHeight,
        x: canvasWidth / 2 - playerWidth / 2,
        width: playerWidth,
        height: playerHeight,
        color: "#D9D9D9",
        speed: paddleSpeed,
      };
      ball = {
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        radius: 10,
        color: "#FFFFFF",
      };
      oneTime.current = false;
      clearTimeout(waitingTimeout);
    };
  }, [readyState, sendMessage]);

  useEffect(() => {
    if (!isWaiting) {
      sendMessage(JSON.stringify({ action: "disconnect", status: "" }));
      setMessage("No one wants to play right now!");
    }
  }, [isWaiting]);

  const handleLastMessage = useCallback(() => {
    if (!lastMessage) return;

    const data = JSON.parse(lastMessage.data);
    switch (data?.type) {
      case "match_found":
        if (!oneTime.current) {
          sendMessage(
            JSON.stringify({ action: "match_id", match_id: data?.match_id })
          );
          handleMatchFound(data);
        }
        break;
      case "game_update":
        setBallCor({ x: data.ball?.x, y: data.ball?.y });
        break;
      case "score_update":
        handleScoreUpdate(data);
        break;
      case "paddle_update":
        handlePaddleUpdate(data);
        break;
      case "end_game":
        handleEndGame(data);
        break;
      case "already_connected":
        setMessage("User already connected from another tab");
        setIsGameCanceled(true)
        break;
      case "match_canceled":
        setMessage("The game has been canceled")
        setIsGameCanceled(true)
        sendMessage(JSON.stringify({ action: "disconnect", status: ""}));
        break;
    }
  }, [lastMessage]);

  useEffect(() => {
    handleLastMessage();
  }, [handleLastMessage]);

  useEffect(() => {
    if (!isGame) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const render = () => {
      drawRect(0, 0, canvasWidth, canvasHeight, mapColor , ctx);
      drawNet(ctx);
      drawPaddles(ctx);
      drawBall(ctx);
    };

    const gameLoop = () => {
      setIsMobileVersion(window.innerWidth <= 640);
      render();

      if (keyLeftpressed && paddleOne.x > 0) {
        paddleOne.x -= paddleSpeed;
        sendMessage(
          JSON.stringify({
            action: "move_paddle",
            y: paddleOne.x,
            match_id: matchId,
            player_number: playerNumber,
          })
        );
      } else if (
        keyRightpressed &&
        paddleOne.x < canvasWidth - paddleOne.width
      ) {
        paddleOne.x += paddleSpeed;
        sendMessage(
          JSON.stringify({
            action: "move_paddle",
            y: paddleOne.x,
            match_id: matchId,
            player_number: playerNumber,
          })
        );
      }

      ball.x = ballCor.y;
      playerNumber === 2
        ? (ball.y = canvasHeight - ballCor.x)
        : (ball.y = ballCor.x);
      paddleTwo.x = paddleCor;
    };

    const intervalId = setInterval(gameLoop, 1000 / 60);

    const handleKeyDown = (e) => handleKeyPress(e.keyCode, true);
    const handleKeyUp = (e) => handleKeyPress(e.keyCode, false);
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      let newX = e.clientX - rect.left - paddleOne.width / 2;
      if (isMobileVersion) newX *= 1.7;
      if (newX < canvasWidth - paddleOne.width && newX > 0) {
        paddleOne.x = newX;
        sendMessage(
          JSON.stringify({
            action: "move_paddle",
            y: newX,
            match_id: matchId,
            player_number: playerNumber,
          })
        );
      }
    };

    !isMobileVersion && window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(intervalId);
    };
  }, [
    sendMessage,
    isGame,
    keyLeftpressed,
    keyRightpressed,
    ballCor,
    playerNumber,
    paddleCor,
    matchId,
    isMobileVersion,
  ]);

  const handleTryAgainClick = () => {
    navigate("/game/onlineGame", { replace: true })
  };
  const handleBackToGamePage = () => {
    navigate("/game", { replace: true });
  };

  const handleMatchFound = (data) => {
    clearTimeout(waitingTimeout);
    setMatchId(data?.match_id);
    oneTime.current = true;
    setPlayerData(data);
    setPlayerNumber(data?.player_number);
    setAvatar(false);
  };

  const handleScoreUpdate = (data) => {
    sendMessage(
      JSON.stringify({
        action: "score_update",
        player1_score: data?.player1_score,
        player2_score: data?.player2_score,
      })
    );
    if (playerNumber === 1) {
      setPlayer1Score(data.player1_score);
      setPlayer2Score(data.player2_score);
    }
    else {
      setPlayer1Score(data.player2_score);
      setPlayer2Score(data.player1_score);
    }
  };

  const handlePaddleUpdate = (data) => {
    setPaddleCor(data?.y);
    sendMessage(
      JSON.stringify({
        action: "update_paddle",
        y: data?.y,
        player_number: data?.player_number,
      })
    );
  };

  const handleEndGame = (data) => {
    setEndMatchWinner(data?.winner);
    setEndMatchScore(data?.score);
    setIsIsGameEnd(true);
    sendMessage(JSON.stringify({ action: "disconnect", status: "" }));
  };

  // draw functions
  const drawRect = (x, y, width, height, color, ctx) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  const drawCircle = (x, y, r, color, ctx) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  };

  const drawNet = (ctx) => {
    for (let i = 0; i <= canvasWidth; i += net.height * 2) {
      drawRect(net.x + i, net.y, net.height, net.width, net.color, ctx);
    }
  };

  const drawPaddles = (ctx) => {
    drawRect(
      paddleOne.x,
      paddleOne.y,
      paddleOne.width,
      paddleOne.height,
      ballColor.paddleColor,
      ctx
    );
    drawRect(
      paddleTwo.x,
      paddleTwo.y,
      paddleTwo.width,
      paddleTwo.height,
      ballColor.paddleColor,
      ctx
    );
  };

  const drawBall = (ctx) => {
    drawCircle(ball.x, ball.y, ball.radius, ballColor.ballColor, ctx);
  };

  const handleKeyPress = (keyCode, value) => {
    switch (keyCode) {
      case 37:
        setKeyLeftpressed(value);
        break;
      case 39:
        setKeyRightpressed(value);
        break;
    }
  };

  return (
    <>
      {!isGame ? (
        <div className="pb-[200px] mt-[140px] flex flex-col justify-center items-center gap-[200px] max-md:gap-[120px]">
          <div className=" flex justify-center items-center max-md:flex-col gap-[100px] max-md:gap-[30px]">
            <MatchMakingCard
              avatar={false}
              bgColor={badgeConverter(gameContext.selfData.badge)}
              image={gameContext.selfData?.picture ? `http://localhost:8888${gameContext.selfData?.picture}` : defualtImg}
              username={gameContext.selfData?.username}
              rank={gameContext.selfData?.rank}
            />
            <div className="font-bold text-[50px] text-white">VS</div>
            <MatchMakingCard
              avatar={avatar}
              bgColor={badgeConverter(playerData?.player?.badge)}
              image={playerData?.player?.picture ? `http://localhost:8888${playerData?.player?.picture}` : defualtImg}
              username={playerData?.player?.username}
              rank={playerData?.player?.rank}
            />
          </div>
          {!avatar && !isGameCanceled &&
            <div className="font-medium text-[24px] max-md:text-[16px] text-[#f1f1f1] animated-bg">
              The game will start in {5 - counter} seconds ...
            </div>
          }
          {(!isWaiting || isGameCanceled) && <div className="flex flex-col gap-8 items-center">
            <div className="font-light text-[25px] max-md:text-[18px] text-[#ff0000]">
              {message}
            </div>
            <div className="flex gap-3 items-center max-md:flex-col">
              <button
                onClick={handleTryAgainClick}
                className="w-60 py-1 px-3 rounded-md text-[#000000] bg-[#fff] flex justify-between items-center"
              >
                <div>Try again</div>
                <img className="w-6 h-6" src={tryImg} alt="try again icon" />
              </button>
              <div className="text-[#fff]">Or</div>
              <button
                onClick={handleBackToGamePage}
                className="w-60 py-1 px-3 rounded-md text-[#000000] bg-[#fff] flex justify-between items-center"
              >
                <div>Back to game page</div>
                <img className="w-6 h-6" src={gamePage} alt="game page icon" />
              </button>
          </div>
          </div>}
        </div>
      ) : (
        <>
          {isGameEnd && (
            <GameEndScreen
              isOnlineGame={true}
              winner={endMatchWinner}
              score={endMatchScore}
              playerNumber={playerNumber}
            />
          )}
          <div className="h-[100vh] min-h-[1500px] flex flex-col justify-center items-center gap-[24px] max-sm:gap-0">
            <div className="score-players-container w-full max-w-[600px] flex justify-between max-sm:flex-col max-sm:items-center max-sm:gap-[15px] max-sm:scale-[0.8]">
              <PlayerScore
                username={gameContext.selfData?.username}
                rank={gameContext.selfData?.rank}
                userImage={gameContext.selfData?.picture ? `http://localhost:8888${gameContext.selfData?.picture}` : defualtImg}
              />
              <div className="score-container w-full flex items-center justify-center flex-1">
                <div className={`bg-gradient-to-r from-[#161c20] via-[#161c20] ${player1GradientColor} flex justify-end p-[11px] pr-[20px] flex-1 score text-[#000] text-[32px] font-light`}>
                  {player1Score}
                </div>
                <div className={`bg-gradient-to-l from-[#161c20] via-[#161c20] ${player2GradientColor} flex flex-1 p-[11px] pl-[20px] score text-[#000] text-[32px] font-light`}>
                  {player2Score}
                </div>
              </div>
              <PlayerScore
                flexDirection="flex-row-reverse"
                username={playerData?.player?.username}
                rank={playerData?.player?.rank}
                userImage={playerData?.player?.picture ? `http://localhost:8888${playerData?.player?.picture}` : defualtImg}
              />
            </div>
            <div className="flex flex-col">
              <div className="canvas-container border border-[#eee] w-fit rounded-[15px] max-sm:scale-[0.70]">
                <canvas
                  ref={canvasRef}
                  width={canvasWidth}
                  height={canvasHeight}
                  className="rounded-[15px]"
                ></canvas>
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
      )}
    </>
  );
};

export default GamePlayOnline;
