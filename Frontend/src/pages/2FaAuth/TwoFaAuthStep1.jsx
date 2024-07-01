import { useState } from "react"
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import LoaderOnTop from '../../components/LoaderOntop.jsx'
import TwoFaCard from './TwoFaCard.jsx'
import setupImg from '../../assets/imgs/setup.svg'


const TwoFaAuthStep2 = () => {

    const [message, setMessage] = useState("");
    const [focusColor, setFocusColor] = useState("focus:border-[#FF0000]")
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
            // must send request to backend to verify if the pass entred same pass of user or not.
            await Axios.get("https://fakestoreapi.com/products/1")
            .then(async response => {
                console.log(response);
                if (response.status == 200 || response.status == 304) {
                    //must navigate to step 2 page
                    navigate("/2fa/congrats");
                }
                else {
                    setMessage("Invalid code")
                    setIsLoading(false);
                }
            })
            .catch(err => {
                setMessage("Invalid code")
                setIsLoading(false);
            })
        }
        else {
            setMessage("Invalid code")
            setIsLoading(false);
        }
    }

    if (isLoading)
        return <LoaderOnTop />

    return (
        <div className="container mx-auto border-[#213135] border-x-[3px] max-sm:border-x-0">
            <div className="h-[100vh] flex flex-col justify-between">
                <div className="max-sm:h-full flex flex-col pt-[200px] max-sm:justify-center max-sm:pt-0 mx-[30px] gap-[20px]">
                    <div className="text-[#55A8D7] w-full max-w-[400px] text-[20px] font-semibold">Set up two-factor authentication</div>
                    <div className="flex flex-col gap-[15px]">
                        <div className="text-white w-full max-w-[400px]">Great! Now let's get started...</div>
                        <div className="text-white w-full max-w-[400px] opacity-60">Step 1: Visit the App Store to get an authenticator app like Google Authenticator or Authy, then follow the app's instructions to set up an account with them.<br />Step 2: Use your authenticator app to scan the barcode below or get a token to enter manually instead.</div>
                        <img className="w-[200px]" src="https://picsum.photos/seed/picsum/200/200" alt="" />
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
    )
}

export default TwoFaAuthStep2