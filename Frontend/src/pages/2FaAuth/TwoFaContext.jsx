import { createContext, useContext, useState } from "react";

export const TwoFaContext = createContext(null);

export const TwoFaContextProvider = ({ children }) => {

    const [isPass, setIsPass] = useState(true);
    const [isStep1, setIsStep1] = useState(false);
    const [isStep2, setIsStep2] = useState(false);
    const [isStep3, setIsStep3] = useState(false);

    const setHandler = (type, value) => {
        switch(type) {
            case "pass":
                setIsPass(value);
                break;
            case "step1":
                setIsStep1(value);
                break;
            case "step2":
                setIsStep2(value);
                break;
            case "step3":
                setIsStep3(value);
                break;
        }
    }

    return (
        <TwoFaContext.Provider 
            value={ { isStep1, isStep2, isStep3, isPass, setHandler } }>
                {children}
        </TwoFaContext.Provider>
    )
};

export const useTwoFaContext = () => {
    return useContext(TwoFaContext);
};