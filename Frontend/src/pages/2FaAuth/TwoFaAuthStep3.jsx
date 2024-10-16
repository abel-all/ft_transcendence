import { useEffect, useState } from 'react'
import Axios from 'axios'
import LoaderOnTop from '../../components/LoaderOntop.jsx'
import logoImg from '../../assets/imgs/logo.png'
import { useNavigate } from 'react-router-dom'

const TwoFaAuthStep3 = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [oneTime, setOneTime] = useState(false)
  const [message, setMessage] = useState('')
  const [backupCodes, setBackupCodes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    const fetchBackUpCodes = async () => {
      await Axios.get('https://aennaki.me/api/auth/2fa/backup-codes/', {
        withCredentials: true,
      })
        .then((response) => {
          setBackupCodes(response.data.backup_codes)
          setIsLoading(false)
          setOneTime(true)
        })
        .catch(() => {
          setIsLoading(false)
          setMessage('Invalid request, please try again')
        })
    }
    if (!oneTime) fetchBackUpCodes()
  }, [oneTime])

  if (isLoading) return <LoaderOnTop />

  const handleButtonClick = () => {
    navigate('/profile', { replace: true })
  }

  return (
    <div className="container mx-auto p-[10px] sm:my-[300px] max-sm:scale-[0.8] flex justify-center items-center">
      <div className="input-gradient px-[60px] w-full max-w-[500px] h-[600px] bg-[#7b9d18] rounded-[15px] flex flex-col justify-between">
        <div className="text-input-container flex flex-col gap-[7px]">
          <img
            className="w-[97px] self-center mb-[20px]"
            src={logoImg}
            alt=""
          />
          <div className="title-container text-[23px] font-medium text-[#eee]">
            Backup codes
          </div>
          <div className="text-[#eee] opacity-50 text-[16px]">
            Write down these codes and keep them in a safe place.
          </div>
          <div className="text-[#2987af] mt-[40px] opacity-90 w-full max-w-[250px] flex flex-wrap gap-y-5 gap-x-12">
            {backupCodes.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
        <div className="text-[#ff0000] flex justify-center mb-[20px]">
          {message}
        </div>
        <button
          className="w-full bg-[#009f9f] mb-[15px] rounded-[15px] py-[8px] font-medium text-[18px]"
          onClick={handleButtonClick}
        >
          Back To Home
        </button>
      </div>
    </div>
  )
}

export default TwoFaAuthStep3
