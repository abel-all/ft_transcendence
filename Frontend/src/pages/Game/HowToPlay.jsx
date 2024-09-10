import { useGameSettings } from './GameSettingsContext'
import adKey from "../../assets/imgs/adKey.svg"
import rlKey from "../../assets/imgs/rlKey.svg"
import mouseIcon from "../../assets/imgs/mouseIcon.svg"
import pointingIcon from "../../assets/imgs/pointingIcon.svg"
import whiteArrow from "../../assets/imgs/whiteArrow.svg"

const HowToPlay = () => {

    const gameContext = useGameSettings();

    const handleClick = () => {
        gameContext.setHandler("game", true);
        gameContext.setHandler("map", true);
        gameContext.setHandler("settings", false);
        gameContext.setHandler("isHowToPlay", false);
    }

    return (
        <div className='text-[#fff6f9] h-full flex justify-center items-center'>
            <div className='w-full max-w-[400px] rounded-[15px] p-[20px] bg-[#273036] flex flex-col justify-center items-center gap-[20px]'>
                <div className='desktop-container w-full flex flex-col gap-[20px] justify-between items-center'>
                    <div className='text-[25px]'>
                        Desktop
                    </div>
                    <div className='flex items-center gap-[10px]'>
                        <img className="h-[58px]" src={mouseIcon}/>
                        <div className='w-[2px] h-[10px] bg-[#fff6f9]/30'></div>
                        <img className="pl-[5px] h-[50px]" src={rlKey} />
                        <div className='w-[2px] h-[10px] bg-[#fff6f9]/30'></div>
                        <img className="h-[50px]" src={adKey} />
                    </div>
                </div>
                <div className='center-line mt-[10px] h-[2px] w-full max-w-[200px] bg-[#fff6f9]/30 rounded-[15px]'></div>
                <div className='mobile-container w-full flex flex-col gap-[20px] justify-between items-center'>
                    <div className='text-[25px]'>
                        Mobile
                    </div>
                    <div className='flex items-center gap-[10px]'>
                        <img className="h-[50px]" src={pointingIcon}/>
                    </div>
                </div>
                <button onClick={handleClick} className='hover:opacity-80 duration-[300ms] self-end flex items-center gap-[10px] mt-[40px]' >
                    <div className='text-[20px] font-light'>Skip</div>
                    <img src={whiteArrow} />
                </button>
            </div>
        </div>
    )
}

export default HowToPlay
