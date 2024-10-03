import { useState } from 'react'
import logoImg from '../../assets/imgs/logo.png'
import LoaderOntop from '../../components/LoaderOntop.jsx'
import Axios from 'axios'
import './css/index.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/Auth.jsx'

const TwoFaAuthVerify = ({ userId }) => {
  const [focusColor, setFocusColor] = useState(
    'focus:border focus:border-[#FF0000]'
  )
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState(false)
  const navigate = useNavigate()
  const auth = useAuth()

  const handleInputChange = (e) => {
    setCode(e.currentTarget.value)

    if (/^[a-f0-9]{6,8}$/.test(e.currentTarget.value))
      setFocusColor('focus:border focus:border-[#00FF00]')
    else setFocusColor('focus:border focus:border-[#FF0000]')
  }

  const verify2FaCode = async () => {
    setIsLoading(true)

    if (/^[a-f0-9]{6,8}$/.test(code)) {
      await Axios.post(
        'https://www.fttran.tech/api/auth/2fa/verify/',
        {
          otp_code: code,
          user_id: userId,
        },
        {
          withCredentials: true,
        }
      )
        .then(() => {
          console.log('first request')
          auth.setHandler('game', true)
          navigate('/game', { replace: true })
        })
        .catch(() => {
          setIsLoading(false)
          setMessage('Incorrect code, try again')
          auth.setHandler('login', true)
          navigate('/signin', { replace: true })
        })
    } else {
      setIsLoading(false)
      setMessage('Invalid code, try again')
    }
  }

  const handleButtonClick = () => {
    verify2FaCode()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    verify2FaCode()
  }

  if (isLoading) return <LoaderOntop />

  return (
    <div className="container mx-auto p-[10px] sm:mt-[300px] max-sm:scale-[0.8] flex justify-center items-center">
      <div className="input-gradient px-[60px] w-full max-w-[500px] h-[600px] bg-[#7b9d18] rounded-[15px] flex flex-col justify-between">
        <div className="text-input-container flex flex-col gap-[7px]">
          <img
            className="w-[97px] self-center mb-[20px]"
            src={logoImg}
            alt=""
          />
          <div className="title-container text-[23px] font-medium text-[#eee]">
            Enter the 6-digit code from your authenticator app
          </div>
          <div className="text-[#eee] opacity-50 text-[14px]">
            Please <span className="text-[#0cbeff]">Use a backup code</span> if
            you lost access to your authenticator.
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full bg-[#eee] rounded-[15px] bg-opacity-20"
          >
            <input
              onChange={handleInputChange}
              name="code"
              className={`rounded-[15px] bg-transparent text-[#eee] placeholder:text-[#c5c5c5b8] outline-none px-[10px] h-[50px] flex w-full ${focusColor}`}
              placeholder="Verification code"
              type="text"
              required
            />
            <button className="hidden" type="submit"></button>
          </form>
          <div className="text-[#ff0000] flex justify-center mb-[20px]">
            {message}
          </div>
        </div>
        <button
          className="w-full bg-[#009f9f] mb-[15px] rounded-[15px] py-[8px] font-medium text-[18px]"
          onClick={handleButtonClick}
        >
          Check code
        </button>
      </div>
    </div>
  )
}

export default TwoFaAuthVerify
