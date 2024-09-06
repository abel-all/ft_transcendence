import { useState } from "react"
import logoImg from "../../assets/imgs/logo.png"
import Axios from 'axios'
import LoaderOnTop from '../../components/LoaderOntop.jsx'
import {fieldReGex} from './variables.jsx'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/Auth.jsx';


const ResetPassword = () => {

    const [message, setMessage] = useState("");
    const [focusColor1, setFocusColor1] = useState("focus:border focus:border-[#FF0000]")
    const [focusColor2, setFocusColor2] = useState("focus:border focus:border-[#FF0000]")
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const navigate = useNavigate();
    const auth = useAuth();

    const urlSearchString = location.search;
    const params = new URLSearchParams(urlSearchString);
    const tokenValue = params.get("token");

    const handleInputChange1 = (e) => {
        setPassword(e.currentTarget.value);

        if (fieldReGex.passwordReGex.test(e.currentTarget.value))
            setFocusColor1("focus:border focus:border-[#00FF00]");
        else
            setFocusColor1("focus:border focus:border-[#FF0000]");
    }
    const handleInputChange2 = (e) => {
        setPasswordConfirm(e.currentTarget.value);

        if (fieldReGex.passwordReGex.test(e.currentTarget.value))
            setFocusColor2("focus:border focus:border-[#00FF00]");
        else
            setFocusColor2("focus:border focus:border-[#FF0000]");
    }

    const verifyPassword = async () => {
        setIsLoading(true);
        const paswdendpoint = "https://fttran.tech/api/auth/passwordreset/" + tokenValue + "/";

        if (fieldReGex.passwordReGex.test(password) && fieldReGex.passwordReGex.test(passwordConfirm) && password == passwordConfirm) {
            await Axios.post(paswdendpoint, {
                password1: password,
                password2: password,
            },
            {
                withCredentials:true,
            })
            .then(() => {
                auth.setHandler("login", true);
                navigate("/signin", { replace: true });
            })
            .catch(() => {
                setMessage("Incorrect password")
                setIsLoading(false);
            })
        }
        else {
            setMessage("Invalid password")
            setIsLoading(false);
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
        return <LoaderOnTop />

    return (
        <div className="container mx-auto p-[10px] sm:my-[300px] max-sm:scale-[0.8] flex justify-center items-center">
            <div className="input-gradient px-[60px] w-full max-w-[500px] h-[600px] bg-[#7b9d18] rounded-[15px] flex flex-col justify-between">
                <div className="text-input-container flex flex-col gap-[7px]">
                    <img className="w-[97px] self-center mb-[20px]" src={logoImg} alt="" />
                    <div className="title-container text-[23px] font-medium text-[#eee]">
                        Reset password
                    </div>
                    <form onSubmit={handleSubmit} className="w-full bg-[#eee] rounded-[15px] bg-opacity-20">
                        <input onChange={handleInputChange1} className={`rounded-[15px] bg-transparent text-[#eee] placeholder:text-[#c5c5c5b8] outline-none px-[10px] h-[50px] flex w-full ${focusColor1}`} placeholder="New Password" type="password" required/>
                        <button className="hidden" type='submit'></button>
                    </form>
                    <form onSubmit={handleSubmit} className="w-full bg-[#eee] rounded-[15px] bg-opacity-20">
                        <input onChange={handleInputChange2} className={`rounded-[15px] bg-transparent text-[#eee] placeholder:text-[#c5c5c5b8] outline-none px-[10px] h-[50px] flex w-full ${focusColor2}`} placeholder="Confirm the new password" type="password" required/>
                        <button className="hidden" type='submit'></button>
                    </form>
                    <div className="text-[#ff0000] flex justify-center mb-[20px]">{message}</div>
                </div>
                <button className="w-full bg-[#009f9f] mb-[15px] rounded-[15px] py-[8px] font-medium text-[18px]" onClick={handleButtonClick}>
                    Continue
                </button>
            </div>
        </div>
    )
}

export default ResetPassword
