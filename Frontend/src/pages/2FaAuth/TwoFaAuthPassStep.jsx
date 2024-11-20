import { useEffect, useState } from 'react'
import logoImg from '../../assets/imgs/logo.png'
import LoaderOntop from '../../components/LoaderOntop.jsx'
import Axios from 'axios'
import { useTwoFaContext } from './TwoFaContext'
import './css/index.css'
import usePasswordToggle from '../../hooks/usePasswordToggle.jsx'
import { useAuth } from '../../components/Auth.jsx'
import { useNavigate } from 'react-router-dom'

const TwoFaAuthPassStep = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [focusColor, setFocusColor] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [password, setPassword] = useState('')
  const TwoFaContext = useTwoFaContext()
  const passwordReGex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  const [eyeIcon, inputType] = usePasswordToggle()

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }, [])

  const handleInputChange = (e) => {
    setPassword(e.currentTarget.value)

    if (passwordReGex.test(e.currentTarget.value))
      setFocusColor('border border-[#00FF00]')
    else setFocusColor('border border-[#FF0000]')
  }

  const verifyPassword = async () => {
    setIsLoading(true)

    if (passwordReGex.test(password)) {
      await Axios.post(
        'http://localhost:8800/api/auth/passwd/verify/',
        {
          password: password,
        },
        {
          withCredentials: true,
        }
      )
        .then(() => {
          TwoFaContext.setHandler('pass', false)
          TwoFaContext.setHandler('step1', true)
        })
        .catch((err) => {
          if (err.response?.status === 403) {
            auth.RefreshToken();
            verifyPassword();
          }
          else if (err.response?.status === 401) {
            navigate("/signin", { replace: true })
          }
          setMessage(err?.response?.data?.message)
          setIsLoading(false)
        })
    } else {
      setMessage('Invalid Password')
      setIsLoading(false)
    }
  }

  const handleButtonClick = () => {
    verifyPassword()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    verifyPassword()
  }

  if (isLoading) return <LoaderOntop />

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
          <div className="text-[#eee] opacity-50 text-[14px]">
            To continue, enter your password:
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full bg-[#eee] rounded-[15px] bg-opacity-20"
          >
            <div
              className={`rounded-[15px] w-full bg-white bg-opacity-[3%] duration-70 ${focusColor} p-[15px] flex`}
            >
              <input
                onChange={handleInputChange}
                className="flex-1 m-[0px] outline-none text-[#eee] bg-transparent"
                placeholder="Password"
                type={inputType}
                onBlur={() => {
                  setFocusColor('')
                }}
                onFocus={handleInputChange}
                required
              />
              <div>{eyeIcon}</div>
            </div>
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

export default TwoFaAuthPassStep
