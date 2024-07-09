import TwoFaCard from './TwoFaCard.jsx'
import backupImg from '../../assets/imgs/backup.svg'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import LoaderOnTop from '../../components/LoaderOntop.jsx'

const TwoFaAuthStep4 = () => {

    const numbersArr = [
        {"number1": 527532, "number2": 985935},
        {"number1": 239509, "number2": 201609},
        {"number1": 162131, "number2": 816116},
        {"number1": 480778, "number2": 139294},
        {"number1": 440325, "number2": 209171},
        {"number1": 749486, "number2": 713701}
    ]
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchBackUpCodes = async () => {
            await Axios.get("https://www.fttran.tech/api/2fa/backup-codes/",
            {
                withCredentials:true,
            })
            .then(response => {
                setIsLoading(false);
                console.log(response);
            })
            .catch(() => {
                setIsLoading(false);
                console.log("Invalid request, please try again");
            })
        }
        fetchBackUpCodes();
    }, []);

    if (isLoading)
        return <LoaderOnTop />

    return (
        <div className="container mx-auto border-[#213135] border-x-[3px] max-sm:border-x-0">
            <div className="h-[100vh] flex flex-col justify-between">
                <div className="max-sm:h-full flex flex-col pt-[200px] max-sm:justify-center max-sm:pt-0 mx-[30px] gap-[20px]">
                    <div className="text-[#858AD4] w-full max-w-[400px] text-[20px] font-semibold">Backup codes</div>
                    <div className="text-white w-full max-w-[400px] opacity-70">Write down these codes and keep them in a safe place.</div>
                    <div className="ml-[40px] w-full max-w-[250px]">
                        {numbersArr.map((item, index) => (
                            <div key={index} className="flex justify-between text-white">
                                <div>{item.number1}</div>
                                <div>{item.number2}</div>
                            </div>
                        ))}
                    </div>
                    <div className="text-white w-full max-w-[400px] opacity-70">If you lose your backup codes, you can visit your settings to generate new ones.</div>
                </div>
                <TwoFaCard bgColor="backup-bg-gradient" image={backupImg} title="BackUp Codes"/>
                </div>
        </div>
    )
}

export default TwoFaAuthStep4