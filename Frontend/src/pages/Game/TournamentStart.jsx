import plusIcon from "../../assets/imgs/plusIcon.svg";
import SearchModal from "./SearchModal.jsx";
import TournamentMatch from "./TournamentMatch.jsx";
import { SemiFinal } from "./TournamentStages.jsx";
import { useGameSettings } from "./GameSettingsContext";
import useWebSocket from "react-use-websocket";
import { useCallback, useEffect, useState, useRef } from "react";
import Spiner from "./Spiner";
import PlayerScore from "./PlayerScore";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import GameEndScreen from "./GameEndScreen";
import "./css/index.css";
import RefreshToken from "../../hooks/RefreshToken"

const playerHeight = 15;
const playerWidth = 70;
let canvasWidth = 450;
let canvasHeight = 700;
const paddleSpeed = 13;

const paddleTwo = {
  y: 0,
  x: canvasWidth / 2 - playerWidth / 2,
  width: playerWidth,
  height: playerHeight,
  color: "#D9D9D9",
  speed: paddleSpeed,
};
const paddleOne = {
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
const ball = {
  x: canvasWidth / 2,
  y: canvasHeight / 2,
  radius: 10,
  color: "#FFFFFF",
};

// let PlayerNbr = 0
let isGameStart = false;

const TournamentStart = () => {
  const canvasRef = useRef(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [isMobileVersion, setIsMobileVersion] = useState(false);
  const [playerData, setPlayerData] = useState({});
  const [selfData, setSelfData] = useState({});
  const [keyLeftpressed, setKeyLeftpressed] = useState(false);
  const [keyRightpressed, setKeyRightpressed] = useState(false);
  const [matchId, setMatchId] = useState(-1);
  const [isGameEnd, isIsGameEnd] = useState(false);
  const [endMatchWinner, setEndMatchWinner] = useState(0);
  const [endMatchScore, setEndMatchScore] = useState("");
  const [playerNumber, setPlayerNumber] = useState(0);
  const [isWinTournament, setIsWinTournament] = useState(false);
  const [ballCor, setBallCor] = useState({
    x: canvasWidth / 2,
    y: canvasHeight / 2,
  });
  const [paddleCor, setPaddleCor] = useState(canvasWidth / 2 - playerWidth / 2);

  const [isTimeToPlay, setIsTimeToPlay] = useState(false);
  const [isGame, setIsGame] = useState(false);
  const gameContext = useGameSettings();
  const navigate = useNavigate();

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8800/ws/tournament/"
  );

  useEffect(() => {
    if (readyState === 1) {
      console.log("tournament infos : ", gameContext.tournamentInfo);
      gameContext.isCreateTour
        ? sendMessage(
            JSON.stringify({
              action: "create_tournament",
              tournament_name: gameContext.tournamentInfo.name,
              alias: gameContext.tournamentInfo.alias,
            })
          )
        : sendMessage(
            JSON.stringify({
              action: "join_tournament",
              tournament_name: gameContext.tournamentInfo.name,
              alias: gameContext.tournamentInfo.alias,
            })
          );
      console.log("WebSocket connection is open");
    } else {
      console.log("WebSocket connection is not open");
      console.log(readyState);
    }
  }, [
    readyState,
    sendMessage,
    gameContext.isCreateTour,
    gameContext.tournamentInfo,
  ]);

  const handleLastMessage = useCallback(() => {
    if (!lastMessage) return;

    const data = JSON.parse(lastMessage.data);
    switch (data?.type) {
      case "tournament_created":
        gameContext.setHandler("participants", data?.tournament?.participants);
        break;
      case "participants_update":
        console.log("parts update : ", data?.participants);
        gameContext.setHandler("participants", data?.participants);
        gameContext.setHandler("participantsData", data?.participants);
        break;
      case "match_detail":
        console.log("match details <<< : ", data);
        setPlayerNumber(data?.player_number);
        sendNotification();
        sendMessage(
          JSON.stringify({
            action: "match_received",
            match_id: data?.match?.id,
          })
        );
        // PlayerNbr = data?.player_number
        setMatchId(data?.match?.id);
        if (data?.player_number === 1) {
          setPlayerData(data?.match?.player2?.profile);
          setSelfData(data?.match?.player1?.profile);
        } else {
          setPlayerData(data?.match?.player1?.profile);
          setSelfData(data?.match?.player2?.profile);
        }
        setIsTimeToPlay(true);
        console.log("isTimeToPlay is : true");
        console.log("ready to send start Game");
        setTimeout(() => {
          if (!isGameStart) {
            sendMessage(
              JSON.stringify({
                action: "start_game",
                match_id: data?.match?.id,
              })
            );
            console.log("start game is sent");
          }
          setIsGame(true);
        }, 15000);
        break;
      case "game_update":
        // console.log("ball corr : ", data);
        setBallCor({ x: data?.ball?.x, y: data?.ball?.y });
        break;
      case "score_update":
        console.log("score update : ", data);
        handleScoreUpdate(data);
        break;
      case "paddle_update":
        handlePaddleUpdate(data);
        break;
      case "end_game":
        console.log("end game >> ", data);
        console.log("Player NUmber : ????? ", playerNumber);
        setEndMatchWinner(data?.winner);
        setEndMatchScore(data?.score);
        sendMessage(JSON.stringify({ action: "stop_game" }));
        isIsGameEnd(true);
        isGameStart = true;
        setPlayer1Score(0);
        setPlayer2Score(0);
        setPaddleCor(canvasWidth / 2 - playerWidth / 2);
        if (data?.loser === playerNumber) {
          sendMessage(JSON.stringify({ action: "disconnect" }));
          setTimeout(() => {
            // setPlayer1Score(0)
            // setPlayer2Score(0)
            setMatchId(-1);
            isIsGameEnd(false);
            // setPlayerNumber(0)
            setIsTimeToPlay(false);
            setIsGame(false);
            navigate("/game", { replace: true });
          }, 5000);
        } else {
          fetchSettings(data);
          gameContext.setHandler("endgame", data);
          setTimeout(() => {
            // setPlayer1Score(0)
            // setPlayer2Score(0)
            isIsGameEnd(false);
            isGameStart = false;
            // setPlayerNumber(0)
            setIsTimeToPlay(false);
            setIsGame(false);
          }, 5000);
        }
        // handleEndGame(data)
        break;
      case "already_connected":
        console.log("User already connected from another tab");
        break;
      case "update_winner":
        console.log("winner array : ", data);
        gameContext.setHandler("participantsData", data?.winners);
        if (data?.round === "completed") {
          sendMessage(JSON.stringify({ action: "disconnect" }));
          setIsWinTournament(true);
        }
        data?.round && !isGameStart === "final"
          ? gameContext.setHandler("winnersFinal", data?.winners)
          : gameContext.setHandler("winners", data?.winners);
        break;
    }
  }, [lastMessage]);

  useEffect(() => {
    handleLastMessage();
  }, [handleLastMessage]);

  // useEffect(() => {

  //     if (!isTimeToPlay) return;
  //     console.log("ready to send start Game");
  //     const TimeoutId = setTimeout(() => {
  //         sendMessage(JSON.stringify({ action: 'start_game', match_id: matchId }))
  //         console.log("start game is sent", );
  //         setIsGame(true);
  //     }, 5000)

  //     return () => {
  //         clearTimeout(TimeoutId);
  //     }

  // }, [isTimeToPlay]);

  useEffect(() => {
    if (!isGame) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const render = () => {
      drawRect(0, 0, canvasWidth, canvasHeight, "#1F1F1F", ctx);
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

    window.addEventListener("mousemove", handleMouseMove);
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
    isMobileVersion,
    isGame,
    keyLeftpressed,
    keyRightpressed,
    ballCor,
    playerNumber,
    paddleCor,
    matchId,
  ]);

  // const handleMatchFound = (data) => {
  //     clearTimeout(waitingTimeout);
  //     oneTime.current = true;
  //     setPlayerData(data);
  //     setMatchId(data?.match_id);
  //     setPlayerNumber(data?.player_number);
  //     sendMessage(JSON.stringify({action: 'start_game', match_id: data?.match_id}));
  //     setIsGame(true);
  //     setAvatar(false);
  // }

  const handleScoreUpdate = (data) => {
    sendMessage(
      JSON.stringify({
        action: "score_update",
        player1_score: data?.player1_score,
        player2_score: data?.player2_score,
      })
    );
    setPlayer1Score(data?.player1_score);
    setPlayer2Score(data?.player2_score);
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

  const fetchSettings = async (data) => {
    await Axios.post(
      `http://localhost:8800/api/tournament/matches/update/${data?.match_id}/`,
      {
        completed: true,
        winner: data?.winner_participant?.id,
        score_player1: data?.player1_score,
        score_player2: data?.player2_score,
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        console.log("update match api res : ", response);
        setMatchId(-1);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          RefreshToken();
          fetchSettings();
        }
        console.log(err);
        console.log("Please try again!");
      });
  };
  const sendNotification = async () => {
    let participantsNames = [];
    for (let i = 0; i < gameContext?.participantsData.length; i++) {
      participantsNames.push(
        gameContext?.participantsData[i]?.profile?.username
      );
    }

    await Axios.post(
      "http://localhost:8800/api/profile/notification/tournament-reminder/",
      {
        usernames: participantsNames,
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        console.log("data of friends is ", response?.data);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          RefreshToken();
          sendNotification();
        }
        console.log(err);
      });
  };
  // const handleEndGame = (data) => {
  // const fetchSettings = async () => {
  //   await Axios.post(
  //     `http://localhost:8800/api/tournament/matches/update/${data?.match_id}/`,
  //     {
  //       completed: true,
  //       winner: data?.winner_profile?.id,
  //       score_player1: data?.player1_score,
  //       score_player2: data?.player2_score,
  //     },
  //     {
  //       withCredentials: true,
  //     }
  //   )
  //     .then((response) => {
  //       console.log('update match api res : ', response)
  //       setMatchId(-1)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       console.log('Please try again!')
  //     })
  // }
  // isIsGameEnd(true)
  // if (data?.loser === playerNumber) {
  //   sendMessage(JSON.stringify({ action: 'disconnect' }))
  //   setTimeout(() => {
  //     setPlayer1Score(0)
  //     setPlayer2Score(0)
  //     setMatchId(-1)
  //     isIsGameEnd(false)
  //     // setPlayerNumber(0)
  //     setIsTimeToPlay(false)
  //     setIsGame(false)
  //     navigate('/game', { replace: true })
  //   }, 5000)
  // } else {
  //   fetchSettings()
  //   setEndMatchData(data)
  //   gameContext.setHandler('endgame', data)
  //   setTimeout(() => {
  //     setPlayer1Score(0)
  //     setPlayer2Score(0)
  //     isIsGameEnd(false)
  //     // setPlayerNumber(0)
  //     setIsTimeToPlay(false)
  //     setIsGame(false)
  //   }, 5000)
  // }
  // }

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
      paddleOne.color,
      ctx
    );
    drawRect(
      paddleTwo.x,
      paddleTwo.y,
      paddleTwo.width,
      paddleTwo.height,
      paddleTwo.color,
      ctx
    );
  };

  const drawBall = (ctx) => {
    drawCircle(ball.x, ball.y, ball.radius, ball.color, ctx);
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

  const clickHandler = () => {
    gameContext.handleModalClick();
  };

  return (
    <>
      {isGame ? (
        <>
          {(isGameEnd || isWinTournament) && (
            <GameEndScreen
              winner={endMatchWinner}
              score={endMatchScore}
              playerNumber={playerNumber}
              winTournament={isWinTournament}
            />
          )}
          <div className="h-[100vh] min-h-[1500px] flex flex-col justify-center items-center gap-[24px] max-sm:gap-0">
            <div className="score-players-container w-full max-w-[600px] flex justify-between max-sm:flex-col max-sm:items-center max-sm:gap-[15px] max-sm:scale-[0.8]">
              <PlayerScore
                username={selfData?.username}
                rank={selfData?.rank}
                userImage={
                  selfData?.picture ||
                  "https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg"
                }
              />
              <div className="score-container w-full flex items-center justify-center flex-1">
                <div className="player1-score-gradient flex justify-end p-[11px] pr-[20px] flex-1 score text-[#000] text-[32px] font-light">
                  {player1Score}
                </div>
                <div className="player2-score-gradient flex flex-1 p-[11px] pl-[20px] score text-[#000] text-[32px] font-light">
                  {player2Score}
                </div>
              </div>
              <PlayerScore
                flexDirection="flex-row-reverse"
                username={playerData?.username}
                rank={playerData?.rank}
                userImage={
                  playerData?.picture ||
                  "https://cdn.intra.42.fr/users/d556031145f66ede6c1a71a8ee4b730c/zbendahh.jpg"
                }
              />
            </div>
            <div className="canvas-container border border-[#eee] w-fit rounded-[15px] mb-[200px] max-sm:scale-[0.70]">
              <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className="rounded-[15px]"
              ></canvas>
            </div>
          </div>
        </>
      ) : (
        <>
          {!gameContext.modal ? (
            <>
              <div className="w-full flex max-lg:gap-[60px] max-xl:gap-[140px] gap-[240px] md:justify-center my-[200px] max-md:my-[150px] overflow-x-auto max-md:p-5">
                <div className="quarter-final">
                  <div className="font-light text-[#eee] text-[20px] mb-[30px]">
                    Quarter-final
                  </div>
                  <TournamentMatch />
                </div>
                <div className="Final">
                  <div className="font-light text-[#eee] text-[20px] mb-[30px]">
                    Final
                  </div>
                  <SemiFinal />
                </div>
              </div>
              <div className="button flex justify-center">
                <button
                  onClick={clickHandler}
                  className="bg-[#009f9f] h-[53px] w-full max-w-[140px] rounded-[15px] flex justify-center items-center gap-[10px]"
                >
                  {isTimeToPlay ? (
                    <Spiner height="h-[18px]" />
                  ) : (
                    <>
                      <div className="text-[#000] font-medium sm:text-[20px]">
                        Add one
                      </div>
                      <img className="w-[26px] h-[26px]" src={plusIcon} />
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <SearchModal />
          )}
        </>
      )}
    </>
  );
};

export default TournamentStart;
