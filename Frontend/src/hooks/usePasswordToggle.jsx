import eyeOpen from "../assets/imgs/eyeOpen.svg"
import eyeClosed from "../assets/imgs/eyeClosed.svg"
import { useState } from "react"



const usePasswordToggle = () => {

    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        setIsVisible(!isVisible);
    }

    const icon = <img src={isVisible ? eyeClosed : eyeOpen} onClick={handleClick} />;

    const inputType = isVisible ? "text" : "password";

    return [icon, inputType]
}

export default usePasswordToggle