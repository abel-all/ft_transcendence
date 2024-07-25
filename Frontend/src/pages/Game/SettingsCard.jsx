import backArrow from '../../assets/imgs/backArrow.svg'
import threeImg from "../../assets/imgs/three.svg"
import fiveImg from "../../assets/imgs/five.svg"
import elevenImg from "../../assets/imgs/eleven.svg"
import fifteenImg from "../../assets/imgs/fifteen.svg"
import MapImg from "../../components/MapImg"
import PaddleImg from "../../components/PaddleImg"
import { useGameSettings } from "./GameSettingsContext"
import { useEffect, useState } from "react"
import './css/index.css'


const mapData = [
    {leftSide: "#1F1F1F", rightSide: "#1F1F1F", title: "Default", value: "Default"},
    {leftSide: "#4A9E3C", rightSide: "#4A9E3C", title: "Classic Green", value: "Classic"},
    {leftSide: "#005477", rightSide: "#005477", title: "Ocean Blue", value: "Ocean"},
    {leftSide: "#676767", rightSide: "#676767", title: "Granite Grey", value: "Granite"},
]

const paddleData = [
    {paddleColor: "#92B2E4", ballColor: "#D7CACA", title: "Default", value: "Default"},
    {paddleColor: "#D7C040", ballColor: "#ECEBE8", title: "Thunderstrike Pro", value: "Thunderstrike"},
    {paddleColor: "#C1243C", ballColor: "#FBC12A", title: "SpinMaster", value: "SpinMaster"},
    {paddleColor: "#4D4D4D", ballColor: "#FCB13B", title: "Lightning Blade", value: "Lightning"},
]

const scoreData = [
    {title: "Three", image: threeImg, value: "Three"},
    {title: "Five", image: fiveImg, value: "Five"},
    {title: "Eleven", image: elevenImg, value: "Eleven"},
    {title: "Fifteen", image: fifteenImg, value: "Fifteen"},
]

const ChooseSectionHandler = (name) => {

    const gameContext = useGameSettings();

    const mapClickHandler = (e) => {
        gameContext.addsettingsData(e.currentTarget.dataset.value)
        gameContext.setHandler("map", false);
        gameContext.setHandler("paddle", true);
    }
    const paddleClickHandler = (e) => {
        gameContext.addsettingsData(e.currentTarget.dataset.value)
        gameContext.setHandler("paddle", false);
        gameContext.setHandler("score", true);
    }
    const scoreClickHandler = (e) => {
        gameContext.addsettingsData(e.currentTarget.dataset.value)
        gameContext.setHandler("score", false);
        gameContext.setHandler("last", true);
    }
    
    const lastClickHandler = () => {
        gameContext.setHandler("last", false);
        gameContext.setHandler("game", true);
        gameContext.setHandler("map", true);
        gameContext.setHandler("settings", false);
    }

    switch(name) {
        case "map":
            return (mapData.map((card, index) => (
                <div key={index} data-value={card.value} onClick={mapClickHandler} className='main-color-gradient cursor-pointer p-[5px] w-full max-w-[195px] h-[250px] overflow-hidden rounded-[5px]'>
                    <div className='font-medium text-[20px] text-[#eee]'>{card.title}</div>
                    <MapImg leftSide={card.leftSide} rightSide={card.rightSide}/>
                </div>
            )))
        case "paddleAndBall":
            return (paddleData.map((card, index) => (
                <div key={index} data-value={card.value} onClick={paddleClickHandler} className='main-color-gradient cursor-pointer p-[5px] w-full max-w-[195px] h-[250px] overflow-hidden rounded-[5px]'>
                    <div className='font-medium text-[20px] text-[#eee]'>{card.title}</div>
                    <PaddleImg paddleColor={card.paddleColor} ballColor={card.ballColor}/>
                </div>
            )))
        case "score":
            return (scoreData.map((card, index) => (
                <div key={index} data-value={card.value} onClick={scoreClickHandler} className='main-color-gradient cursor-pointer p-[5px] w-full max-w-[195px] h-[250px] overflow-hidden rounded-[5px]'>
                    <div className='font-medium text-[20px] text-[#eee]'>{card.title}</div>
                    <img className="mt-[65px] ml-[70px]" src={card.image} />
                </div>
            )))
        case "last":
            return (
                <button onClick={lastClickHandler} className='main-color-gradient p-[6px] w-full max-w-[195px] rounded-[5px] text-center text-[#1cc]'>
                    Continue To Play
                </button>
            )
    }
}

const SettingsCard = ({ name, title, description="", buttonHidden="" }) => {

    const [isLoaded, setIsLoaded] = useState(true);
    const chooseSectionData = ChooseSectionHandler(name);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(false)
        }, 300);

    }, [])

    if (isLoaded)
        return (
            <div className="w-full max-w-[1000px] flex justify-center items-center">
                <div className="spiner-settings w-[50px] h-[50px] rounded-full"></div>
            </div>
        )

    return (
            <div className="sm:border-l-[3px] sm:border-l-[#525455] w-full max-w-[1000px] flex flex-col mb-[150px] pl-[20px] gap-[100px]">
                <div className="text-container">
                    <div className="w-full text-[#eee] font-medium text-[30px] max-sm:text-[30px]">
                        {title}
                    </div>
                    <div className="w-full text-white opacity-50">
                        {description}
                    </div>
                </div>
                <div className="cards-container flex flex-wrap gap-[10px] justify-center">
                    {chooseSectionData}
                </div>
                <button className={`back-button flex gap-[5px] ${buttonHidden}`}>
                    <img src={backArrow} />
                    <div className='font-medium text-[#eee]'>Back</div>
                </button>
            </div>
    )
}

export default SettingsCard