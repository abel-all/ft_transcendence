import backArrow from '../../assets/imgs/backArrow.svg'
import threeImg from '../../assets/imgs/three.svg'
import fiveImg from '../../assets/imgs/five.svg'
import elevenImg from '../../assets/imgs/eleven.svg'
import fifteenImg from '../../assets/imgs/fifteen.svg'
import MapImg from '../../components/MapImg'
import PaddleImg from '../../components/PaddleImg'
import BotImg from '../../assets/imgs/botImg.svg'
import BotImgOne from '../../assets/imgs/botImgOne.svg'
import BotImgTwo from '../../assets/imgs/botLevelTwo.svg'
import BotImgThree from '../../assets/imgs/botLevelThree.svg'
import { useGameSettings } from './GameSettingsContext'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import Spiner from './Spiner'
import './css/index.css'

const mapData = [
  {
    leftSide: '#1F1F1F',
    rightSide: '#1F1F1F',
    title: 'Default',
    value: 'Default',
  },
  {
    leftSide: '#4A9E3C',
    rightSide: '#4A9E3C',
    title: 'Classic Green',
    value: 'Classic',
  },
  {
    leftSide: '#005477',
    rightSide: '#005477',
    title: 'Ocean Blue',
    value: 'Ocean',
  },
  {
    leftSide: '#676767',
    rightSide: '#676767',
    title: 'Granite Grey',
    value: 'Granite',
  },
]

const paddleData = [
  {
    paddleColor: '#92B2E4',
    ballColor: '#D7CACA',
    title: 'Default',
    value: 'Default',
  },
  {
    paddleColor: '#D7C040',
    ballColor: '#ECEBE8',
    title: 'Thunderstrike Pro',
    value: 'Thunderstrike',
  },
  {
    paddleColor: '#C1243C',
    ballColor: '#FBC12A',
    title: 'SpinMaster',
    value: 'SpinMaster',
  },
  {
    paddleColor: '#4D4D4D',
    ballColor: '#FCB13B',
    title: 'Lightning Blade',
    value: 'Lightning',
  },
]

const scoreData = [
  { title: 'Three', image: threeImg, value: 'Three' },
  { title: 'Five', image: fiveImg, value: 'Five' },
  { title: 'Eleven', image: elevenImg, value: 'Eleven' },
  { title: 'Fifteen', image: fifteenImg, value: 'Fifteen' },
]

const botLevelData = [
  { title: 'Beginner', image: BotImgOne, value: 0.1 },
  { title: 'Intermediate', image: BotImgTwo, value: 0.2 },
  { title: 'Advanced', image: BotImgThree, value: 0.5 },
  { title: 'Expert', image: BotImg, value: 0.8 },
]

const ChooseSectionHandler = (name) => {
  const gameContext = useGameSettings()
  const [message, setMessage] = useState('')

  const mapClickHandler = (e) => {
    gameContext.addsettingsData(e.currentTarget.dataset.value)
    gameContext.setHandler('map', false)
    gameContext.setHandler('paddle', true)
  }
  const paddleClickHandler = (e) => {
    gameContext.addsettingsData(e.currentTarget.dataset.value)
    gameContext.setHandler('paddle', false)
    if (gameContext.isOnlineGame) gameContext.setHandler('last', true)
    else gameContext.setHandler('score', true)
  }
  const scoreClickHandler = (e) => {
    gameContext.addsettingsData(e.currentTarget.dataset.value)
    gameContext.setHandler('score', false)
    gameContext.setHandler('botLevel', true)
  }
  const botLevelClickHandler = (e) => {
    gameContext.addsettingsData(e.currentTarget.dataset.value)
    gameContext.setHandler('last', true)
    gameContext.setHandler('botLevel', false)
  }

  const lastClickHandler = () => {
    const postSettingsData = async () => {
      const mapName = gameContext.settingsData[0]
      const ballColor = gameContext.settingsData[1]
      let winningScore = 'Five'
      let botLevel = 0.1
      if (gameContext.settingsData.length > 2) {
        winningScore = gameContext.settingsData[2]
        botLevel = gameContext.settingsData[3]
      }

      console.log(gameContext.selfData)

      await Axios.post(
        'https://fttran.tech/api/game/setting/',
        {
          mapname: mapName,
          ballcolor: ballColor,
          score: winningScore,
          botlevel: botLevel,
          profile: gameContext.selfData.id,
        },
        {
          withCredentials: true,
        }
      )
        .then((response) => {
          console.log('setting is updated seccesfully')
          console.log('settings is : ', response.data)
          gameContext.setHandler('last', false)
          if (gameContext.issetting) {
            gameContext.setHandler('game', true)
            gameContext.setHandler('map', true)
            gameContext.setHandler('settings', false)
          } else gameContext.setHandler('isHowToPlay', true)
        })
        .catch((err) => {
          console.log(err)
          setMessage('Please try again!')
        })
    }
    postSettingsData()
  }

  switch (name) {
    case 'map':
      return mapData.map((card, index) => (
        <div
          key={index}
          data-value={card.value}
          onClick={mapClickHandler}
          className="main-color-gradient cursor-pointer p-[5px] w-full max-w-[195px] h-[250px] overflow-hidden rounded-[5px]"
        >
          <div className="font-medium text-[20px] text-[#eee]">
            {card.title}
          </div>
          <MapImg leftSide={card.leftSide} rightSide={card.rightSide} />
        </div>
      ))
    case 'paddleAndBall':
      return paddleData.map((card, index) => (
        <div
          key={index}
          data-value={card.value}
          onClick={paddleClickHandler}
          className="main-color-gradient cursor-pointer p-[5px] w-full max-w-[195px] h-[250px] overflow-hidden rounded-[5px]"
        >
          <div className="font-medium text-[20px] text-[#eee]">
            {card.title}
          </div>
          <PaddleImg
            paddleColor={card.paddleColor}
            ballColor={card.ballColor}
          />
        </div>
      ))
    case 'score':
      return scoreData.map((card, index) => (
        <div
          key={index}
          data-value={card.value}
          onClick={scoreClickHandler}
          className="main-color-gradient cursor-pointer p-[5px] w-full max-w-[195px] h-[250px] overflow-hidden rounded-[5px]"
        >
          <div className="font-medium text-[20px] text-[#eee]">
            {card.title}
          </div>
          <img className="mt-[65px] ml-[70px]" src={card.image} />
        </div>
      ))
    case 'botLevel':
      return botLevelData.map((card, index) => (
        <div
          key={index}
          data-value={card.value}
          onClick={botLevelClickHandler}
          className="main-color-gradient cursor-pointer p-[5px] w-full max-w-[195px] h-[250px] overflow-hidden rounded-[5px]"
        >
          <div className="font-medium text-[20px] text-[#eee]">
            {card.title}
          </div>
          <img className="mt-[65px] ml-[70px]" src={card.image} />
        </div>
      ))
    case 'last':
      return (
        <div className="flex flex-col items-center w-full gap-[30px]">
          <div
            onClick={lastClickHandler}
            className="main-color-gradient cursor-pointer p-[6px] w-full max-w-[195px] rounded-[5px] text-center text-[#1cc]"
          >
            Continue To Play
          </div>
          <div className="font-light text-[18px] max-md:text-[18px] text-[#ff0000]">
            {message}
          </div>
        </div>
      )
  }
}

const SettingsCard = ({ name, title, description = '', buttonHidden = '' }) => {
  const [isLoaded, setIsLoaded] = useState(true)
  const chooseSectionData = ChooseSectionHandler(name)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(false)
    }, 300)
  }, [])

  if (isLoaded) return <Spiner />

  return (
    <div className="sm:border-l-[3px] sm:border-l-[#525455] w-full max-w-[1000px] flex flex-col mb-[150px] pl-[20px] gap-[100px]">
      <div className="text-container">
        <div className="w-full text-[#eee] font-medium text-[30px] max-sm:text-[30px]">
          {title}
        </div>
        <div className="w-full text-white opacity-50">{description}</div>
      </div>
      <div className="cards-container flex flex-wrap gap-[10px] justify-center">
        {chooseSectionData}
      </div>
      <button className={`back-button flex gap-[5px] ${buttonHidden}`}>
        <img src={backArrow} />
        <div className="font-medium text-[#eee]">Back</div>
      </button>
    </div>
  )
}

export default SettingsCard
