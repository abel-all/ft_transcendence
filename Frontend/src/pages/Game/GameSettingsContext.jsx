import { createContext, useContext, useState, useEffect } from "react";

export const GameSettingContext = createContext(null);

export const GameSettingsContextProvider = ({ children }) => {

    const [isMapSection, setIsMapSection] = useState(true);
    const [isPaddleSection, setIsPaddleSection] = useState(false);
    const [isScoreSection, setIsScoreSection] = useState(false);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isGame, setIsGame] = useState(false);
    const [settingsData, setSettingsData] = useState([]);

    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);

    const setPlayerScore = (player, score) => {
        switch (player) {
            case 1 :
                setPlayer1Score(score);
                break;
            case 2 :
                setPlayer2Score(score);
                break;
        }
    }
    const setHandler = (type, value) => {
        switch(type) {
            case "map":
                setIsMapSection(value);
                break;
            case "paddle":
                setIsPaddleSection(value);
                break;
            case "score":
                setIsScoreSection(value);
                break;
            case "last":
                setIsLastStep(value);
                break;
            case "game":
                setIsGame(value);
                break;
        }
    }

    const addsettingsData = (data) => {
        setSettingsData((prevData) => [
            ...prevData,
            data,
        ]);
    }

    return (
        <GameSettingContext.Provider 
            value={ { isMapSection, setHandler, player1Score, player2Score, setPlayerScore, isGame, isPaddleSection, isScoreSection, settingsData,  addsettingsData, isLastStep} }>
                {children}
        </GameSettingContext.Provider>
    )
};

export const useGameSettings = () => {
    return useContext(GameSettingContext);
};