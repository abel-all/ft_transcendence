import { useEffect, useState } from "react"
import LoaderOntop from "../../components/LoaderOntop.jsx";
import { useGameSettings } from './GameSettingsContext'
import Axios from 'axios'
import "../2FaAuth/css/index.css"


const CreateTournamentSection = ({ title, callToAction, buttonColor }) => {

    const [focusColor, setFocusColor] = useState("focus:border focus:border-[#FF0000]");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [tour, setTour] = useState("");
    const gameContext = useGameSettings();
    const nameReGex = /^[a-zA-Z-]{2,16}$/;

    useEffect(() => {
        console.log("hello");
        setTimeout(() => {
            setIsLoading(false)
        }, 300);
    }, [])

    const checkInput = (input) => {

        if (nameReGex.test(input))
            setFocusColor("focus:border focus:border-[#00FF00]");
        else
            setFocusColor("focus:border focus:border-[#FF0000]");
    }

    const handleNameChange = (e) => {
        setName(e.currentTarget.value);
        checkInput(e.currentTarget.value);
    }
    const handleTourChange = (e) => {
        setTour(e.currentTarget.value);
        checkInput(e.currentTarget.value);
    }

    const createTournament = async () => {
        setIsLoading(true);

        gameContext.setHandler("isTournament", true);
        // if (nameReGex.test(name) && nameReGex.test(tour)) {
        //     await Axios.post("https://www.fttran.tech/api/auth/createTournament/", {
        //         display_name: name,
        //         tournament_name: tour,
        //     },
        //     {
        //         withCredentials:true,
        //     })
        //     .then(() => {
        //         console.log("create tournament");
        //         gameContext.setHandler("isTournament", true);
        //     })
        //     .catch(() => {
        //         setIsLoading(false);
        //         setMessage("Incorrect code, try again")
        //     })
        // }
        // else {
        //     setIsLoading(false);
        //     setMessage("Invalid code, try again")
        // }
    }
    const joinTournament = async () => {
        setIsLoading(true);

        gameContext.setHandler("isTournament", true);
        // if (nameReGex.test(name) && nameReGex.test(tour)) {
        //     await Axios.post("https://www.fttran.tech/api/auth/joinTournament/", {
        //         display_name: name,
        //         tournament_name: tour,
        //     },
        //     {
        //         withCredentials:true,
        //     })
        //     .then(() => {
        //         console.log("join tournament");
        //         gameContext.setHandler("isTournament", true);
        //     })
        //     .catch(() => {
        //         setIsLoading(false);
        //         setMessage("Incorrect code, try again")
        //     })
        // }
        // else {
        //     setIsLoading(false);
        //     setMessage("Invalid code, try again")
        // }
    }

    const handleButtonClick = () => {
        title === "Create new Tournament" ? createTournament() : joinTournament();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        title === "Create new Tournament" ? createTournament() : joinTournament();
    }

    if (isLoading)
        return <LoaderOntop />

    return (
            <div className="input-gradient p-[20px] pb-0 w-full max-w-[440px] h-[500px] rounded-[15px] flex flex-col justify-between">
                <div className="text-input-container flex flex-col gap-[7px]">
                    <div className="title-container text-[23px] font-medium text-[#eee]">
                        {title}
                    </div>
                    <div className="text-[#eee] opacity-50 text-[14px] pb-[40px]">
                        Please enter a display name and a tournament name.
                    </div>
                    <form onSubmit={handleSubmit} className="w-full  rounded-[15px] flex flex-col gap-[10px]">
                        <input
                            onChange={handleNameChange}
                            className={`rounded-[15px] bg-[#eee]/20 text-[#eee] placeholder:text-[#c5c5c5b8] outline-none px-[10px] h-[50px] flex w-full ${focusColor}`}
                            placeholder="Display Name"
                            type="text"
                            required
                        />
                        <input
                            onChange={handleTourChange}
                            className={`rounded-[15px] bg-[#eee]/20 text-[#eee] placeholder:text-[#c5c5c5b8] outline-none px-[10px] h-[50px] flex w-full ${focusColor}`}
                            placeholder="Tournament Name"
                            type="text"
                            required
                        />
                        <button className="hidden" type='submit'></button>
                    </form>
                    <div className="text-[#ff0000] flex justify-center mb-[20px]">{message}</div>
                </div>
                <button className={`w-full ${buttonColor} mb-[15px] rounded-[15px] py-[8px] font-medium text-[18px]`} onClick={handleButtonClick}>
                    {callToAction}
                </button>
            </div>
    )
}

export default CreateTournamentSection
