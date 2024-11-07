import { useCallback, useEffect, useRef, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import './css/index.css'
import MatchMakingCard from './MatchMakingCard.jsx'
import { useGameSettings } from './GameSettingsContext'
import PlayerScore from './PlayerScore'
import GameEndScreen from './GameEndScreen'
// import { useNavigate } from "react-router-dom"

// Game vars:
const playerHeight = 15
const playerWidth = 70
let canvasWidth = 450
let canvasHeight = 700
const paddleSpeed = 13

const paddleTwo = {
  y: 0,
  x: canvasWidth / 2 - playerWidth / 2,
  width: playerWidth,
  height: playerHeight,
  color: '#D9D9D9',
  speed: paddleSpeed,
}
const paddleOne = {
  y: canvasHeight - playerHeight,
  x: canvasWidth / 2 - playerWidth / 2,
  width: playerWidth,
  height: playerHeight,
  color: '#D9D9D9',
  speed: paddleSpeed,
}
const net = {
  y: canvasHeight / 2 - 1,
  x: 0,
  width: 2,
  height: 26,
  color: '#FFFFFF',
}
const ball = {
  x: canvasWidth / 2,
  y: canvasHeight / 2,
  radius: 10,
  color: '#FFFFFF',
}

let waitingTimeout

const GamePlay = () => {
  const canvasRef = useRef(null)
  const [player1Score, setPlayer1Score] = useState(0)
  const [player2Score, setPlayer2Score] = useState(0)
  // const [counter, setCounter] = useState(0);
  // const [isGameStart, setIsGameStart] = useState(false);
  // const [gameFinished, setGameFinished] = useState(false);
  const [isMobileVersion, setIsMobileVersion] = useState(false)
  const [isWaiting, setIsWaiting] = useState(true)
  const [playerData, setPlayerData] = useState({})
  const [endMatchWinner, setEndMatchWinner] = useState(0)
  const [endMatchScore, setEndMatchScore] = useState('')

  const [keyLeftpressed, setKeyLeftpressed] = useState(false)
  const [keyRightpressed, setKeyRightpressed] = useState(false)
  const [matchId, setMatchId] = useState(-1)
  const [isGame, setIsGame] = useState(false)
  const [avatar, setAvatar] = useState(true)
  const [isGameEnd, isIsGameEnd] = useState(false)
  // const [endMatchData, setEndMatchData] = useState({})
  const [playerNumber, setPlayerNumber] = useState(0)
  const [ballCor, setBallCor] = useState({
    x: canvasWidth / 2,
    y: canvasHeight / 2,
  })
  const [paddleCor, setPaddleCor] = useState(canvasWidth / 2 - playerWidth / 2)
  const [message, setMessage] = useState('')
  const gameContext = useGameSettings()
  const oneTime = useRef(false)

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    'ws://localhost:8800/ws/game/'
  )

  useEffect(() => {
    if (readyState === 1) {
      gameContext.isRandomGame === true
        ? sendMessage(JSON.stringify({ action: 'join_queue' }))
        : sendMessage(JSON.stringify({ action: 'invitation' }))
      console.log('WebSocket connection is open')
      waitingTimeout = setTimeout(() => {
        setIsWaiting(false)
      }, 200000)
    } else {
      console.log('WebSocket connection is not open')
      console.log(readyState)
    }

    return () => {
      oneTime.current = false
      clearTimeout(waitingTimeout)
    }
  }, [readyState, sendMessage])

  useEffect(() => {
    if (!isWaiting) {
      sendMessage(JSON.stringify({ action: 'disconnect' }))
      setMessage('No one wants to play right now. Please try again!')
    }
  }, [isWaiting, sendMessage])

  const handleLastMessage = useCallback(() => {
    if (!lastMessage) return

    const data = JSON.parse(lastMessage.data)
    switch (data?.type) {
      case 'match_found':
        if (!oneTime.current) handleMatchFound(data)
        break
      case 'game_update':
        setBallCor({ x: data.ball?.x, y: data.ball?.y })
        break
      case 'score_update':
        handleScoreUpdate(data)
        break
      case 'paddle_update':
        handlePaddleUpdate(data)
        break
      case 'end_game':
        console.log('end game >> ', data)
        handleEndGame(data)
        break
      case 'already_connected':
        setMessage('User already connected from another tab')
        break
    }
  }, [lastMessage])

  useEffect(() => {
    handleLastMessage()
  }, [handleLastMessage])

  useEffect(() => {
    if (!isGame) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const render = () => {
      drawRect(0, 0, canvasWidth, canvasHeight, '#1F1F1F', ctx)
      drawNet(ctx)
      drawPaddles(ctx)
      drawBall(ctx)
    }

    const gameLoop = () => {
      setIsMobileVersion(window.innerWidth <= 640)
      render()

      if (keyLeftpressed && paddleOne.x > 0) {
        paddleOne.x -= paddleSpeed
        sendMessage(
          JSON.stringify({
            action: 'move_paddle',
            y: paddleOne.x,
            match_id: matchId,
            player_number: playerNumber,
          })
        )
      } else if (
        keyRightpressed &&
        paddleOne.x < canvasWidth - paddleOne.width
      ) {
        paddleOne.x += paddleSpeed
        sendMessage(
          JSON.stringify({
            action: 'move_paddle',
            y: paddleOne.x,
            match_id: matchId,
            player_number: playerNumber,
          })
        )
      }

      ball.x = ballCor.y
      playerNumber === 2
        ? (ball.y = canvasHeight - ballCor.x)
        : (ball.y = ballCor.x)
      paddleTwo.x = paddleCor
    }

    const intervalId = setInterval(gameLoop, 1000 / 60)

    const handleKeyDown = (e) => handleKeyPress(e.keyCode, true)
    const handleKeyUp = (e) => handleKeyPress(e.keyCode, false)
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      let newX = e.clientX - rect.left - paddleOne.width / 2
      if (isMobileVersion) newX *= 1.7
      if (newX < canvasWidth - paddleOne.width && newX > 0) {
        paddleOne.x = newX
        sendMessage(
          JSON.stringify({
            action: 'move_paddle',
            y: newX,
            match_id: matchId,
            player_number: playerNumber,
          })
        )
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      clearInterval(intervalId)
    }
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
  ])

  const handleMatchFound = (data) => {
    clearTimeout(waitingTimeout)
    oneTime.current = true
    setPlayerData(data)
    setMatchId(data?.match_id)
    setPlayerNumber(data?.player_number)
    sendMessage(
      JSON.stringify({ action: 'start_game', match_id: data?.match_id })
    )
    setIsGame(true)
    setAvatar(false)
  }

  const handleScoreUpdate = (data) => {
    sendMessage(
      JSON.stringify({
        action: 'score_update',
        player1_score: data?.player1_score,
        player2_score: data?.player2_score,
      })
    )
    setPlayer1Score(data.player1_score)
    setPlayer2Score(data.player2_score)
  }

  const handlePaddleUpdate = (data) => {
    setPaddleCor(data?.y)
    sendMessage(
      JSON.stringify({
        action: 'update_paddle',
        y: data?.y,
        player_number: data?.player_number,
      })
    )
  }

  const handleEndGame = (data) => {
    // setEndMatchData(data)
    setEndMatchWinner(data?.winner)
    setEndMatchScore(data?.score)
    isIsGameEnd(true)
    sendMessage(JSON.stringify({ action: 'disconnect' }))
  }

  // draw functions
  const drawRect = (x, y, width, height, color, ctx) => {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
  }

  const drawCircle = (x, y, r, color, ctx) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2, false)
    ctx.closePath()
    ctx.fill()
  }

  const drawNet = (ctx) => {
    for (let i = 0; i <= canvasWidth; i += net.height * 2) {
      drawRect(net.x + i, net.y, net.height, net.width, net.color, ctx)
    }
  }

  const drawPaddles = (ctx) => {
    drawRect(
      paddleOne.x,
      paddleOne.y,
      paddleOne.width,
      paddleOne.height,
      paddleOne.color,
      ctx
    )
    drawRect(
      paddleTwo.x,
      paddleTwo.y,
      paddleTwo.width,
      paddleTwo.height,
      paddleTwo.color,
      ctx
    )
  }

  const drawBall = (ctx) => {
    drawCircle(ball.x, ball.y, ball.radius, ball.color, ctx)
  }

  const handleKeyPress = (keyCode, value) => {
    switch (keyCode) {
      case 37:
        setKeyLeftpressed(value)
        break
      case 39:
        setKeyRightpressed(value)
        break
    }
  }

  return (
    <>
      {!isGame ? (
        <div className="h-[calc(100vh-105px)] min-h-[1000px] pb-[200px] flex flex-col justify-center items-center gap-[200px] max-md:gap-[120px]">
          <div className=" flex justify-center items-center max-md:flex-col gap-[100px] max-md:gap-[30px]">
            <MatchMakingCard
              avatar={false}
              bgColor={
                gameContext.selfData.badge === 'BRONZE'
                  ? 'bg-[#CD7F32]'
                  : 'bg-[#fff6f9]'
              }
              image={
                gameContext.selfData?.picture ||
                'https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg'
              }
              username={gameContext.selfData?.username}
              rank={gameContext.selfData?.rank}
            />
            <div className="font-bold text-[50px] text-white">VS</div>
            <MatchMakingCard
              avatar={avatar}
              bgColor={
                playerData?.player?.badge === 'BRONZE' ? '#CD7F32' : '#fff6f9'
              }
              image={
                playerData?.player?.picture ||
                'https://cdn.intra.42.fr/users/d556031145f66ede6c1a71a8ee4b730c/zbendahh.jpg'
              }
              username={playerData?.player?.username}
              rank={playerData?.player?.rank}
            />
          </div>
          <div className="font-light text-[18px] max-md:text-[15px] text-[#ff0000]">
            {message}
          </div>
        </div>
      ) : (
        <>
          {isGameEnd && (
            <GameEndScreen
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
                userImage={
                  gameContext.selfData?.picture ||
                  'https://cdn.intra.42.fr/users/faa4187430345830e7ed57d35c0e4434/abel-all.jpg'
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
                username={playerData?.player?.username}
                rank={playerData?.player?.rank}
                userImage={
                  playerData?.player?.picture ||
                  'https://cdn.intra.42.fr/users/d556031145f66ede6c1a71a8ee4b730c/zbendahh.jpg'
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
      )}
    </>
  )
}

export default GamePlay
