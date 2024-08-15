import imageone from '../../assets/imgs/gameimg1.svg'
import imagetwo from '../../assets/imgs/gameimg2.svg'
import imagethree from '../../assets/imgs/gameimg3.svg'
import imagefour from '../../assets/imgs/gameimg4.svg'
import Card from './Card.jsx'
import gameSettings from "../../assets/imgs/gameSettings.svg"
import GameSettings from "./GameSettings.jsx";
import { useEffect, useState } from 'react'
import { useGameSettings } from './GameSettingsContext'

const cardsData = [
    {
        route: "/game/online",
        bgColor: "bg-[#FFCD3E]/90",
        title: "Play Online",
        description: "Play vs a person of similar skill",
        image: imageone,
    },
    {
        route: "/game/bot",
        bgColor: "bg-[#6E9AC9]/90",
        title: "Computer",
        description: "Challenge a bot from Easy to Master",
        image: imagetwo,
    },
    {
        route: "/game/friend",
        bgColor: "bg-[#92C2C8]/90",
        title: "Play a Friend",
        description: "Invite a friend to a game of ping pong",
        image: imagethree,
    },
    {
        route: "/game/tournament",
        bgColor: "bg-[#DC5E61]/90",
        title: "Tournaments",
        description: "Join an Arena where anyone can win",
        image: imagefour,
    },
];

function CardContainer({ showSettings }) {

    const gameContext = useGameSettings();

    const settingsClickHandler = () => {
        gameContext.setHandler("settings", true);
    }

    return (
        <>
            {gameContext.isSettings ? (
                <GameSettings />
            ) : (
                <div className={`mx-[50px] ${showSettings ? "my-[300px]": "my-[590px]"} max-md:mx-[0px] max-md:mt-[200px] flex flex-col gap-[250px]`}>
                    {showSettings && <div className="w-full flex justify-end sm:pr-[50px]">
                        <button onClick={settingsClickHandler} className='flex gap-[5px] items-center'>
                            <img className="w-[40px] h-[40px]" src={gameSettings} />
                            <div className='text-[20px] text-[#eee] font-light'>Settings</div>
                        </button>
                    </div>}
                    <div className="flex gap-x-[15px] gap-y-[162px] flex-wrap justify-center">
                        {cardsData.map((card, index) => (
                            <Card
                                key={index}
                                route={card.route}
                                bgColor={card.bgColor}
                                title={card.title}
                                description={card.description}
                                image={card.image}
                            />
                        ))}
                    </div>
                </div>
                )}
        </>
    )
}

export default CardContainer;
