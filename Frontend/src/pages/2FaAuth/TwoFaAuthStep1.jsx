import { useEffect, useState } from 'react'
import logoImg from '../../assets/imgs/logo.png'
import Axios from 'axios'
import LoaderOnTop from '../../components/LoaderOntop.jsx'
import { useTwoFaContext } from './TwoFaContext'
import { useAuth } from '../../components/Auth.jsx'
import { useNavigate } from 'react-router-dom'

const TwoFaAuthStep1 = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('')
  const [focusColor, setFocusColor] = useState('focus:border-[#FF0000]')
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')
  const [image, setImage] = useState(null)
  const TwoFaContext = useTwoFaContext()
  const auth = useAuth();

  useEffect(() => {
    setIsLoading(true)
    handleEnableButtonClick()
  }, [])

  const handleInputChange = (e) => {
    setCode(e.currentTarget.value)

    if (/^[0-9]{6,6}$/.test(e.currentTarget.value))
      setFocusColor('focus:border-[#00FF00]')
    else setFocusColor('focus:border-[#FF0000]')
  }

  const verifyOtpCode = async () => {
    setIsLoading(true)

    if (/^[0-9]{6,6}$/.test(code)) {
      await Axios.post(
        'http://localhost:8800/api/auth/2fa/verify/device/',
        {
          otp_code: code,
        },
        {
          withCredentials: true,
        }
      )
        .then(() => {
          TwoFaContext.setHandler('step1', false)
          TwoFaContext.setHandler('step2', true)
        })
        .catch(async (err) => {
          if (err.response?.status === 403) {
            await auth.RefreshToken();
          }
          else if (err.response?.status === 401) {
            navigate("/signin", { replace: true })
          }
          setMessage(err?.response?.data?.message)
          setIsLoading(false)
        })
    } else {
      setMessage('Invalid Code')
      setIsLoading(false)
    }
  }

  if (isLoading) return <LoaderOnTop />

  const handleEnableButtonClick = async () => {
    await Axios.get('http://localhost:8800/api/auth/2fa/enable/', {
      withCredentials: true,
    })
      .then((response) => {
        setImage(`data:image/png;base64,${response.data.qr_code}`)
        setIsLoading(false)
      })
      .catch(async (err) => {
        if (err.response?.status === 403) {
          await auth.RefreshToken();
        }
        else if (err.response?.status === 401) {
          navigate("/signin", { replace: true })
        }
        setIsLoading(true)
      })
  }

  const handleButtonClick = () => {
    verifyOtpCode()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    verifyOtpCode()
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
            Set up two-factor authentication
          </div>
          <div className="text-[#eee] opacity-80 text-[16px]">
            Great! Now let's get started...
          </div>
          <div className="text-[#eee] opacity-50 text-[14px]">
            Step 1: Visit the App Store to get an authenticator app like Google
            Authenticator or Authy, then follow the app's instructions to set up
            an account with them.
            <br />
            Step 2: Use your authenticator app to scan the barcode below or get
            a token to enter manually instead.
          </div>
          <img className="w-[200px]" src={image} alt="" />
          <form
            onSubmit={handleSubmit}
            className="w-full bg-[#eee] rounded-[15px] bg-opacity-20"
          >
            <input
              onChange={handleInputChange}
              name="digitcode"
              className={`rounded-[15px] bg-transparent text-[#eee] placeholder:text-[#c5c5c5b8] outline-none px-[10px] h-[50px] flex w-full ${focusColor}`}
              placeholder="6-Digit Verification Code"
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
          Confirm
        </button>
      </div>
    </div>
  )
}

export default TwoFaAuthStep1
