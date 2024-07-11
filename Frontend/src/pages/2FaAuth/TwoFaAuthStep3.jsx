import TwoFaCard from './TwoFaCard.jsx'
import backupImg from '../../assets/imgs/backup.svg'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import LoaderOnTop from '../../components/LoaderOntop.jsx'

const TwoFaAuthStep3 = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [backupCodes, setBackupCodes] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const fetchBackUpCodes = async () => {
            setIsLoading(true);
            await Axios.get("https://www.fttran.tech/api/2fa/backup-codes/",
            {
                withCredentials:true,
            })
            .then(response => {
                if (isMounted) {
                    setBackupCodes(response.data.backup_codes);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setIsLoading(false);
                    console.log("Invalid request, please try again");
                }
            })
        }
        fetchBackUpCodes();

        return () => {
            isMounted = false;
        }
    }, []);

    if (isLoading)
        return <LoaderOnTop />

    return (
        <div className="container mx-auto border-[#213135] border-x-[3px] max-sm:border-x-0">
            <div className="h-[100vh] flex flex-col justify-between">
                <div className="max-sm:h-full flex flex-col pt-[200px] max-sm:justify-center max-sm:pt-0 mx-[30px] gap-[20px]">
                    <div className="text-[#858AD4] w-full max-w-[400px] text-[20px] font-semibold">Backup codes</div>
                    <div className="text-[#eee] w-full max-w-[400px] opacity-70">Write down these codes and keep them in a safe place.</div>
                    <div className="ml-[40px] w-full max-w-[250px] flex flex-wrap gap-y-5 gap-x-12">
                        {backupCodes.map((item, index) => (
                            <div key={index} className="text-[#eee]">
                                {item}
                            </div>
                        ))}
                    </div>
                    <div className="text-[#eee] w-full max-w-[400px] opacity-70">If you lose your backup codes, you can visit your settings to generate new ones.</div>
                </div>
                <TwoFaCard bgColor="backup-bg-gradient" image={backupImg} title="BackUp Codes"/>
                </div>
        </div>
    )
}

export default TwoFaAuthStep3