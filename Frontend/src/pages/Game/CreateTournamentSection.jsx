import { useEffect, useState } from "react"
import LoaderOntop from "../../components/LoaderOntop.jsx";
import { useGameSettings } from './GameSettingsContext'
import Axios from 'axios'
import "../2FaAuth/css/index.css"


const CreateTournamentSection = ({ title, callToAction, buttonColor }) => {

    const [focusColor, setFocusColor] = useState("");
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
        console.log(name);
    }
    const handleTourChange = (e) => {
        setTour(e.currentTarget.value);
        checkInput(e.currentTarget.value);
        console.log(tour);
    }

    const verify2FaCode = async () => {
        setIsLoading(true);

        if (nameReGex.test(name) && nameReGex.test(tour)) {
            await Axios.post("https://fttran.tech/api/auth/2fa/verify/", {
                display_name: name,
                tournament_name: tour,
            },
            {
                withCredentials:true,
            })
            .then(() => {
                console.log("first request");
            })
            .catch(() => {
                setIsLoading(false);
                setMessage("Incorrect code, try again")
            })
        }
        else {
            setIsLoading(false);
            setMessage("Invalid code, try again")
        }
    }

    const handleButtonClick = () => {
        verify2FaCode();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        verify2FaCode();
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
