import LogoImage from '../../assets/imgs/logo.png'
import Button from '../../components/Button.jsx'
import OAuthButton from '../../components/OAuthButton.jsx'
import { Link } from 'react-router-dom'
import FormInput from '../../components/FormInput.jsx'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import {
  signInFieldProps,
  itemData,
  oAuthItems,
  fieldReGex,
} from './variables.jsx'
import { useNavigate } from 'react-router-dom'
import LoaderOntop from '../../components/LoaderOntop.jsx'
import TwoFaAuthVerify from '../2FaAuth/TwoFaAuthVerify.jsx'
import { useAuth } from '../../components/Auth'
import { useGameSettings } from '../Game/GameSettingsContext'
import './css/index.css'

function SignIn() {
  const [formValues, setFormValues] = useState({})
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState('')
  const [isVerify, setIsVerify] = useState(false)
  const [isloaded, setIsloaded] = useState(true)
  const [email, setEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [isForgetPassword, setIsForgetPassword] = useState(false)
  const [focusColor, setFocusColor] = useState(
    'focus:border focus:border-[#FF0000]'
  )
  const navigate = useNavigate()
  const gameContext = useGameSettings()
  const auth = useAuth()

  useEffect(() => {
    setTimeout(() => {
      setIsloaded(false)
    }, 300)
  }, [])

  const checkFieldInput = async () => {
    await Axios.post(
      'https://aennaki.me/api/auth/token/',
      {
        username: formValues.Username,
        password: formValues.Password,
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        console.log('first request')
        const fetchUserData = async () => {
          await Axios.get('https://aennaki.me/api/profile/data/', {
            withCredentials: true,
          })
            .then((response) => {
              console.log('data of user : ', response.data)
              gameContext.setHandler('selfData', response.data)
            })
            .catch((err) => {
              console.log(err)
              console.log('Please try again!')
            })
        }
        console.log('hhhhhhh>>>>>')
        fetchUserData()
        setUserId(response.data.user_id)
        if (response.data.is_2fa_enabled) {
          // is 2fa enable must redirect them to 2fa page
          setIsVerify(true)
        } else {
          auth.setHandler('game', true)
          navigate('/game', { replace: true }) // is 2fa disable must redirect them to game page
        }
      })
      .catch((err) => {
        console.log(err)
        setMessage('Somethings wrong, please try again!')
      })
  }
  const handleUserClick = () => {
    checkFieldInput()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    checkFieldInput()
  }

  if (isVerify) return <TwoFaAuthVerify userId={userId} />

  const handleForgetPassword = () => {
    setIsForgetPassword(true)
  }

  const handleInputChange = (e) => {
    setEmail(e.currentTarget.value)

    if (fieldReGex.emailReGex.test(e.currentTarget.value))
      setFocusColor('focus:border focus:border-[#00FF00]')
    else setFocusColor('focus:border focus:border-[#FF0000]')
  }

  const resetPassword = async () => {
    setIsloaded(true)

    if (fieldReGex.emailReGex.test(email)) {
      await Axios.post(
        'https://aennaki.me/api/auth/passwordrecovery/',
        {
          email: email,
        },
        {
          withCredentials: true,
        }
      )
        .then(() => {
          setEmailSent(true)
          setIsloaded(false)
        })
        .catch(() => {
          setIsloaded(false)
          setMessage('Incorrect email')
        })
    } else {
      setMessage('Invalid email')
      setIsloaded(false)
    }
  }

  const handleButtonClick = () => {
    resetPassword()
  }

  const handlePassSubmit = (e) => {
    e.preventDefault()
    resetPassword()
  }

  const handleUserAgreementClick = () => {
    navigate('/useragreement')
  }

  const handlePrivacyClick = () => {
    navigate('/privacypolicy')
  }

  if (isloaded) return <LoaderOntop />

  return (
    <div className="container max-sm:scale-[0.8] flex flex-col justify-center items-center mx-auto relative">
      <div className="px-[40px] mb-[200px] w-full max-w-[460px] rounded-[15px]  mt-[120px] max-sm:px-[0px] sm:bg-gradient-to-t sm:from-[#161c20] sm:to-[#273036] max-sm:mt-[20px] max-sm:mb-[0px]">
        <img
          className="w-[97px] m-auto pb-[21px]"
          src={LogoImage}
          alt="PING! image"
        />
        {isForgetPassword ? (
          <div className="w-full h-[460px] flex flex-col justify-between">
            {emailSent ? (
              <div className="text-input-container flex flex-col gap-[7px]">
                <div className="title-container text-[23px] font-medium text-[#eee]">
                  Check your inbox
                </div>
                <div className="text-[#eee] opacity-50 text-[14px]">
                  An email containing a alink to reset your password has been
                  sent to the email address associated with your account.
                </div>
              </div>
            ) : (
              <>
                <div className="text-input-container flex flex-col gap-[7px]">
                  <div className="title-container text-[23px] font-medium text-[#eee]">
                    Reset password
                  </div>
                  <div className="text-[#eee] opacity-50 text-[14px]">
                    Enter your email address and we will send you a link to
                    reset your password.
                  </div>
                  <form
                    onSubmit={handlePassSubmit}
                    className="w-full bg-[#eee] rounded-[15px] bg-opacity-20"
                  >
                    <input
                      onChange={handleInputChange}
                      className={`rounded-[15px] bg-transparent text-[#eee] placeholder:text-[#c5c5c5b8] outline-none px-[10px] h-[50px] flex w-full ${focusColor}`}
                      placeholder="Email address"
                      type="email"
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
                  Reset password
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="text-[#fff6f9]/90 mb-[20px] text-[14px] w-full text-center font-normal">
              By continuing, you agree to our{' '}
              <span
                onClick={handleUserAgreementClick}
                className="cursor-pointer text-[#00CEFF]"
              >
                User Agreement
              </span>{' '}
              and acknowledge that you understand the{' '}
              <span
                onClick={handlePrivacyClick}
                className="cursor-pointer text-[#00CEFF]"
              >
                Privacy Policy
              </span>
              .
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex items-center flex-col gap-3 pb-[16px]"
            >
              {signInFieldProps.map((item, index) => (
                <FormInput
                  key={index}
                  placeHolder={item.placeHolder}
                  type={item.type}
                  handleChange={(type, value) => {
                    setFormValues((prevState) => {
                      return { ...prevState, ...{ [type]: value } }
                    })
                  }}
                />
              ))}
              <button className="hidden" type="submit"></button>
            </form>
            <button
              onClick={handleForgetPassword}
              className="w-full flex justify-end underline text-[#EEEEEE] font-normal text-[12px] pb-[34px]"
            >
              Forget Password?
            </button>
            <div className="text-[#ff0000] flex justify-center mb-[20px]">
              {message}
            </div>
            <div onClick={handleUserClick}>
              <Button
                type="submit"
                width="w-full"
                title="Sign In"
                formValues={formValues}
              />
            </div>
            <div className="flex justify-center items-center py-[16px]">
              {itemData.map((item, index) => (
                <div key={index} className={item.className}>
                  {item.content}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-[11px]">
              {oAuthItems.map((item, index) => (
                <OAuthButton
                  key={index}
                  image={item.image}
                  imgTilte={item.imgTilte}
                />
              ))}
            </div>
            <div className="flex justify-between text-[14px] pt-[29px] pb-[29px]">
              <div className="pl-[10px] text-[rgba(238,238,238,0.51)]">
                Don’t Have An Account?
              </div>
              <Link
                className="pr-[10px] text-[#EEEEEE] font-medium underline"
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SignIn
