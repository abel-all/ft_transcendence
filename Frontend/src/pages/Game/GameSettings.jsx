import SettingsCard from "./SettingsCard"
import {useGameSettings} from "./GameSettingsContext"


const GameSettings = () => {

    const gameContext = useGameSettings();

    return (
        <div className='h-[calc(100vh-105px)] min-h-[900px] flex justify-center items-center'>
            {gameContext.isMapSection && <SettingsCard
                name="map"
                title="Do you want to change the map?"
                description="Choose from a variety of exciting maps to play on."
                buttonHidden="hidden"
            />}
            {gameContext.isPaddleSection && <SettingsCard
                name="paddleAndBall"
                title="Do you want to change the Paddle and Ball color?"
                description="Choose from a variety of exciting paddles and balls to play with."
            />}
            {gameContext.isScoreSection && <SettingsCard
                name="score"
                title="Do you want to change the winning score?"
                description="Choose the winning score to set the ultimate challenge for your ping pong match."
            />}
            {gameContext.isBotLevelSection && <SettingsCard
                name="botLevel"
                title="Do you want to change the bot's level?"
                description="Choose the level to set the ultimate challenge for your ping pong match."
            />}
            {gameContext.isLastStep && <SettingsCard
                name="last"
                title="Congratulations, you set up settings successfully."
                buttonHidden="hidden"
            />}
        </div>
    )
}

export default GameSettings
