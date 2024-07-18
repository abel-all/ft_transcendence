import { useState } from "react"
import Axios from 'axios'
import LoaderOnTop from '../../components/LoaderOntop.jsx'
import TwoFaCard from './TwoFaCard.jsx'
import setupImg from '../../assets/imgs/setup.svg'
import { useTwoFaContext } from "./TwoFaContext"

const TwoFaAuthStep1 = () => {

    const [message, setMessage] = useState("");
    const [focusColor, setFocusColor] = useState("focus:border-[#FF0000]")
    const [isLoading, setIsLoading] = useState(false);
    const [isEnable, setIsEnable] = useState(true);
    const [image, setImage] = useState(null);
    const TwoFaContext = useTwoFaContext();

    const handleInputChange = (e) => {

        if (/^[0-9]{6,6}$/.test(e.currentTarget.value))
            setFocusColor("focus:border-[#00FF00]");
        else
            setFocusColor("focus:border-[#FF0000]");
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (/^[0-9]{6,6}$/.test(e.target.digitcode.value)) {
            await Axios.post("https://www.fttran.tech/api/2fa/verify/", {
                otp_code: e.target.digitcode.value,
            },
            {
                withCredentials:true,
            })
            .then(() => {
                TwoFaContext.setHandler("step1", false);
                TwoFaContext.setHandler("step2", true);
            })
            .catch(() => {
                setIsLoading(false);
                setMessage("Incorrect code")
            })
        }
        else {
            setMessage("Invalid code")
            setIsLoading(false);
        }
    }

    if (isLoading)
        return <LoaderOnTop />

    
    // const handleButtonClick = async () => {
    //     await Axios.get("https://www.fttran.tech/api/2fa/enable/",
    //     {
    //         withCredentials:true,
    //     })
    //     .then(response => {
    //         setImage(`data:image/png;base64,${response.data.qr_code}`);
    //         setIsEnable(false)
    //     })
    //     .catch(() => {
    //         setIsEnable(true);
    //         console.log("Invalid request, try again")
    //     })
    // }

    // if (isEnable)
    //     return (
    //         <div className="w-full h-[100vh] flex justify-center items-center">
    //             <button className="main-color-gradient p-[6px] w-full max-w-[195px] rounded-[5px] text-center text-[#1cc]" onClick={handleButtonClick}>
    //                 Enable 2FA
    //             </button>
    //         </div>
    //     )

    return (
        <>
        <div className="container mx-auto border-[#213135] border-x-[3px] max-sm:border-x-0">
            <div className="h-[100vh] flex flex-col justify-between">
                <div className="max-sm:h-full flex flex-col pt-[200px] max-sm:justify-center max-sm:pt-0 mx-[30px] gap-[20px]">
                    <div className="text-[#55A8D7] w-full max-w-[400px] text-[20px] font-semibold">Set up two-factor authentication</div>
                    <div className="flex flex-col gap-[15px]">
                        <div className="text-white w-full max-w-[400px]">Great! Now let's get started...</div>
                        <div className="text-white w-full max-w-[400px] opacity-60">Step 1: Visit the App Store to get an authenticator app like Google Authenticator or Authy, then follow the app's instructions to set up an account with them.<br />Step 2: Use your authenticator app to scan the barcode below or get a token to enter manually instead.</div>
                        <img className="w-[200px]" src={image} alt="" />
                        <form onSubmit={handleSubmit}>
                            <input
                                onChange={handleInputChange}
                                type="text"
                                name="digitcode"
                                placeholder="6-DIGIT VERIFICATION CODE" 
                                className={"m-[0px] rounded-[3px] outline-[0px] w-full max-w-[400px] bg-white bg-opacity-[10%] text-[#EEEEEE] text-[16px] p-[15px] duration-70 focus:border " + focusColor}
                            /><br/>
                            <div className="text-[#FF0000] pt-[10px]">{message}</div>
                            <button type="submit" className="text-black font-semibold bg-[#BFDFF0] px-[40px] py-[5px] rounded-[3px] mt-[20px]">COMPLETE SETUP</button>
                        </form>
                    </div>
                </div>
                <TwoFaCard bgColor="setup-bg-gradient" image={setupImg} title="2FA Set Up"/>
            </div>
        </div>

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
        </>
    )
}

export default TwoFaAuthStep1