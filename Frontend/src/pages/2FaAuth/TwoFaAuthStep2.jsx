import { useTwoFaContext } from "./TwoFaContext"
import logoImg from "../../assets/imgs/logo.png"

const TwoFaAuthStep2 = () => {
    
    const TwoFaContext = useTwoFaContext();
    
    const handleButtonClick = () => {
        TwoFaContext.setHandler("step2", false);
        TwoFaContext.setHandler("step3", true);
    }
    return (

        <div className="container mx-auto p-[10px] sm:my-[300px] max-sm:scale-[0.8] flex justify-center items-center">
            <div className="input-gradient px-[60px] w-full max-w-[500px] h-[600px] bg-[#7b9d18] rounded-[15px] flex flex-col justify-between">
                <div className="text-input-container flex flex-col gap-[7px]">
                    <img className="w-[97px] self-center mb-[20px]" src={logoImg} alt="" />
                    <div className="title-container text-[23px] font-medium text-[#eee]">
                        You're two-factor authenticated!
                    </div>
                    <div className="text-[#eee] opacity-50 text-[14px]">
                        Next time you log in, you'll need to use your password and authentication code.
                    </div>
                </div>
                <div>
                    <div className="text-[#eee] opacity-80 text-[16px] mb-[15px]">
                        In case you lose your authentication code, we also provide you with :
                    </div>
                    <button className="w-full bg-[#009f9f] mb-[15px] rounded-[15px] py-[8px] font-medium text-[18px]" onClick={handleButtonClick}>
                        Backup Codes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TwoFaAuthStep2