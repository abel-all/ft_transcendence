import { createContext, useContext, useState, useEffect } from "react";

export const GameSettingContext = createContext(null);

export const GameSettingsContextProvider = ({ children }) => {

    const [isMapSection, setIsMapSection] = useState(true);
    const [isPaddleSection, setIsPaddleSection] = useState(false);
    const [isScoreSection, setIsScoreSection] = useState(false);
    const [isLastStep, setIsLastStep] = useState(false);
    const [settingsData, setSettingsData] = useState([]);

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
        }
    }

    const addsettingsData = (data) => {
        setSettingsData((prevData) => [
            ...prevData,
            data,
        ]);
    }

    useEffect(() => {
        console.log(settingsData);
    }, [settingsData]);

    return (
        <GameSettingContext.Provider 
            value={ { isMapSection, setHandler, isPaddleSection, isScoreSection, settingsData,  addsettingsData, isLastStep} }>
                {children}
        </GameSettingContext.Provider>
    )
};

export const useGameSettings = () => {
    return useContext(GameSettingContext);
};