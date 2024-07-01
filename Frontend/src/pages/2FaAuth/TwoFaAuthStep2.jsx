import { Link } from 'react-router-dom';
import TwoFaCard from './TwoFaCard.jsx'
import congratsImg from '../../assets/imgs/congrats.svg'


const TwoFaAuthStep3 = () => {

    return (
        <div className="container mx-auto border-[#213135] border-x-[3px] max-sm:border-x-0">
            <div className="h-[100vh] flex flex-col justify-between">
                <div className="max-sm:h-full flex flex-col pt-[200px] max-sm:justify-center max-sm:pt-0 mx-[30px] gap-[20px]">
                    <div className="text-[#FCC447] w-full max-w-[400px] text-[20px] font-semibold">You're two-factor authenticated!</div>
                    <div className="text-white w-full max-w-[400px]">Next time you log in, you'll need to use your password and authentication code.</div>
                    <div className="text-white w-full max-w-[400px]">In case you lose your authentication code, we also provide you with 
                        <Link className="text-[#21c4ff]" to="/2fa/backupcodes" > backup codes</Link>.</div>
                </div>
                <TwoFaCard bgColor="congrats-bg-gradient" image={congratsImg} title="Congrats"/>
            </div>
        </div>
    )
}

export default TwoFaAuthStep3