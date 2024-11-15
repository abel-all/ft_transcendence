import { createContext, useContext, useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from "react-use-websocket";
import axios from 'axios';

export const GameSettingContext = createContext(null)

export const GameSettingsContextProvider = ({ children }) => {
  const [isMapSection, setIsMapSection] = useState(true)
  const [isPaddleSection, setIsPaddleSection] = useState(false)
  const [isScoreSection, setIsScoreSection] = useState(false)
  const [isBotLevelSection, setIsBotLevelSection] = useState(false)
  const [isLastStep, setIsLastStep] = useState(false)
  const [isOnlineGame, setIsOnlineGame] = useState(false)
  const [isGame, setIsGame] = useState(false)
  const [modal, setModal] = useState(false)
  const [isSettings, setIsSettings] = useState(false)
  const [settingsData, setSettingsData] = useState([])
  const [createTour, setCreateTour] = useState(false)
  const [joinTour, setJoinTour] = useState(false)
  const [isHowToPlay, setIsHowToPlay] = useState(false)
  const [matchDelay, setMatchDelay] = useState(true)
  const [issetting, setIssetting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isCreateTour, setIsCreateTour] = useState(false)
  const [isTournament, setIsTournament] = useState(false)
  const [userData, setUserData] = useState({})
  const [selfData, setSelfData] = useState({})
  const [tournamentInfo, setTournamentInfo] = useState({})
  const [participants, setParticipants] = useState([])
  const [participantsData, setParticipantsData] = useState([])
  const [winners, setWinners] = useState([])
  const [winnersFinal, setWinnersFinal] = useState([])
  const [endGameData, setEndGameData] = useState({})
  const [gameSettings, setGameSettings] = useState({})

  const [player1Score, setPlayer1Score] = useState(0)
  const [player2Score, setPlayer2Score] = useState(0)
  const [isRandomGame, setIsRandomGame] = useState(true)

  const [Auth, setAuth] = useState(false);

  useEffect(() => {
		axios.get('http://localhost:8800/api/auth/token/')
		.then((res) => {
			if (res.status == 200) {
				setAuth(true)
			}
		})
		.catch((err) => {
			setAuth(false);
		})
	}, [])
	const [messageHistory, setMessageHistory] = useState([])
	const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8800/ws/chat/', {
		onMessage: (message) => {
			setMessageHistory((prev) => [...prev, message.data.toString()])
		},
		shouldReconnect: () => true,
		reconnectInterval: 3000,
    enabled: Auth,
	})
	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Open',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
	}[readyState]


  const resetStates = () => {
    setIsMapSection(true)
    setIsPaddleSection(false)
    setIsScoreSection(false)
    setIsBotLevelSection(false)
    setIsLastStep(false)
    setIsOnlineGame(false)
    setIsGame(false)
    setModal(false)
    setIsSettings(false)
    setSettingsData([])
    setCreateTour(false)
    setJoinTour(false)
    setIsHowToPlay(false)
    setMatchDelay(true)
    setIssetting(true)
    setLoading(false)
    setIsTournament(false)
    setIsCreateTour(false)
    setIsRandomGame(true)
    setUserData({})
    setPlayer1Score(0)
    setPlayer2Score(0)
    setEndGameData({})
    setGameSettings({})
  }

  const handleModalClick = () => {
    setModal(!modal)
  }
  const setPlayerScore = (player, score) => {
    switch (player) {
      case 1:
        setPlayer1Score(score)
        break
      case 2:
        setPlayer2Score(score)
        break
    }
  }
  const setHandler = (type, value) => {
    switch (type) {
      case 'issetting':
        setIssetting(value)
        break
      case 'map':
        setIsMapSection(value)
        break
      case 'paddle':
        setIsPaddleSection(value)
        break
      case 'score':
        setIsScoreSection(value)
        break
      case 'last':
        setIsLastStep(value)
        break
      case 'game':
        setIsGame(value)
        break
      case 'settings':
        setIsSettings(value)
        break
      case 'createtour':
        setCreateTour(value)
        break
      case 'jointour':
        setJoinTour(value)
        break
      case 'botLevel':
        setIsBotLevelSection(value)
        break
      case 'onlineGame':
        setIsOnlineGame(value)
        break
      case 'isHowToPlay':
        setIsHowToPlay(value)
        break
      case 'matchDelay':
        setMatchDelay(value)
        break
      case 'userData':
        setUserData((prev) => ({ ...prev, ...value }))
        break
      case 'selfData':
        setSelfData((prev) => ({ ...prev, ...value }))
        break
      case 'loading':
        setLoading(value)
        break
      case 'isTournament':
        setIsTournament(value)
        break
      case 'isCreateTour':
        setIsCreateTour(value)
        break
      case 'tournamentInfo':
        setTournamentInfo(value)
        break
      case 'participants':
        setParticipants(value)
        break
      case 'endgame':
        setEndGameData(value)
        break
      case 'winners':
        setWinners(value)
        break
      case 'winnersFinal':
        setWinnersFinal(value)
        break
      case 'isRandomGame':
        setIsRandomGame(value)
        break
      case 'participantsData':
        setParticipantsData(value)
        break
      case 'gameSettings':
        setGameSettings(value)
        break
    }
  }

  const addsettingsData = (data) => {
    setSettingsData((prevData) => [...prevData, data])
  }

  return (
    <GameSettingContext.Provider
      value={{
        participantsData,
        isRandomGame,
        winnersFinal,
        sendMessage,
        lastMessage,
        readyState,
        winners,
        endGameData,
        participants,
        tournamentInfo,
        isCreateTour,
        createTour,
        joinTour,
        isSettings,
        handleModalClick,
        modal,
        isMapSection,
        setHandler,
        player1Score,
        player2Score,
        setPlayerScore,
        isGame,
        isPaddleSection,
        isScoreSection,
        settingsData,
        addsettingsData,
        isLastStep,
        isBotLevelSection,
        isOnlineGame,
        isHowToPlay,
        matchDelay,
        userData,
        resetStates,
        issetting,
        selfData,
        loading,
        isTournament,
        gameSettings,
      }}
    >
      {children}
    </GameSettingContext.Provider>
  )
}

export const useGameSettings = () => {
  return useContext(GameSettingContext)
}
