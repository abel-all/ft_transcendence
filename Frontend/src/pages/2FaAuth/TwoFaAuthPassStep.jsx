import { useEffect, useState } from "react"
import logoImg from "../../assets/imgs/logo.png"
import LoaderOntop from "../../components/LoaderOntop.jsx";
import Axios from 'axios'
import { useTwoFaContext } from "./TwoFaContext"
import "./css/index.css"


const TwoFaAuthPassStep = () => {
    
    const [focusColor, setFocusColor] = useState("focus:border focus:border-[#FF0000]");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [password, setPassword] = useState("");
    const TwoFaContext = useTwoFaContext();
    const passwordReGex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 300);
    }, [])

    const handleInputChange = (e) => {
        setPassword(e.currentTarget.value);

        if (passwordReGex.test(e.currentTarget.value))
            setFocusColor("focus:border focus:border-[#00FF00]");
        else
            setFocusColor("focus:border focus:border-[#FF0000]");
    }

    const verifyPassword = async () => {
        setIsLoading(true);

        if (passwordReGex.test(password)) {
            await Axios.post("https://www.fttran.tech/api/2fa/password/", {
                password: password,
            },
            {
                withCredentials:true,
            })
            .then(() => {
                TwoFaContext.setHandler("pass", false);
                TwoFaContext.setHandler("step1", true);
            })
            .catch(() => {
                setIsLoading(false);
                setMessage("Incorrect password, try again")
            })
        }
        else {
            setIsLoading(false);
            setMessage("Invalid password, try again")
        }
    }

    const handleButtonClick = () => {
        verifyPassword();
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        verifyPassword();
    }

    if (isLoading)
        return <LoaderOntop />

    return (
        <div className="container mx-auto p-[10px] sm:mt-[300px] max-sm:scale-[0.8] flex justify-center items-center">
            <div className="input-gradient px-[60px] w-full max-w-[500px] h-[600px] bg-[#7b9d18] rounded-[15px] flex flex-col justify-between">
                <div className="text-input-container flex flex-col gap-[7px]">
                    <img className="w-[97px] self-center mb-[20px]" src={logoImg} alt="" />
                    <div className="title-container text-[23px] font-medium text-[#eee]">
                        Set up two-factor authentication
                    </div>
                    <div className="text-[#eee] opacity-50 text-[14px]">
                        To continue, enter your password:
                    </div>
                    <form onSubmit={handleSubmit} className="w-full bg-[#eee] rounded-[15px] bg-opacity-20">
                        <input onChange={handleInputChange} name="code" className={`rounded-[15px] bg-transparent text-[#eee] placeholder:text-[#c5c5c5b8] outline-none px-[10px] h-[50px] flex w-full ${focusColor}`} placeholder="Password" type="text" required/>
                    </form>
                    <div className="text-[#ff0000] flex justify-center mb-[20px]">{message}</div>
                </div>
                <button className="w-full bg-[#009f9f] mb-[15px] rounded-[15px] py-[8px] font-medium text-[18px]" onClick={handleButtonClick}>
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default TwoFaAuthPassStep