import { useEffect, useState } from 'react'
import LoaderOntop from '../../components/LoaderOntop.jsx'
import { useGameSettings } from './GameSettingsContext'
import Axios from 'axios'
import '../2FaAuth/css/index.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/Auth.jsx'

const CreateTournamentSection = ({ title, callToAction, buttonColor, params }) => {
  const navigate = useNavigate();
  const [focusColor, setFocusColor] = useState(
    'focus:border focus:border-[#FF0000]'
  )
  const [message, setMessage] = useState('')
  const [activeTournament, setActiveTournament] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState('')
  const [tour, setTour] = useState('')
  const gameContext = useGameSettings()
  const auth = useAuth();
  const usernameReGex =  /^[a-zA-Z0-9_]{3,9}$/

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => {
      gameContext.setHandler("createtour", false);
      gameContext.setHandler("jointour", false);
      gameContext.setHandler("loading", false);
    }
  }, [])

  useEffect(() => {
    const fetchActiveTournament = async () => {
      await Axios.get('http://localhost:8800/api/tournament/names/', {
        withCredentials: true,
      })
        .then((response) => {
          setActiveTournament(response?.data)
        })
        .catch(async (err) => {
          if (err.response?.status === 403) {
            await auth.RefreshToken();
          }
          else if (err.response?.status === 401) {
            navigate("/signin", { replace: true })
          }
          setMessage(err?.response?.data.message)
          setIsLoading(false)
        })
    }
    if (title === 'Join a Tournament' && !params) {
      fetchActiveTournament()
    }
    else if (params) setTour(params)
  }, [])

  const checkInput = (input) => {
    if (usernameReGex.test(input))
      setFocusColor('focus:border focus:border-[#00FF00]')
    else setFocusColor('focus:border focus:border-[#FF0000]')
  }

  const handleNameChange = (e) => {
    setName(e.currentTarget.value)
    checkInput(e.currentTarget.value)
  }
  const handleTourChange = (e) => {
    setTour(e.currentTarget.value)
    checkInput(e.currentTarget.value)
  }

  const createTournament = async () => {
    setIsLoading(true)

    if (usernameReGex.test(name) && usernameReGex.test(tour)) {
      await Axios.post(
        'http://localhost:8800/api/tournament/check-name/',
        {
          tournament_name: tour,
        },
        {
          withCredentials: true,
        }
      )
        .then(() => {
          gameContext.setHandler('isCreateTour', true)
          gameContext.setHandler('tournamentInfo', { name: tour, alias: name })
          navigate("/game/tournament/start", { replace: true })
        })
        .catch(async (err) => {
          if (err.response?.status === 403) {
            await auth.RefreshToken();
          }
          else if (err.response?.status === 401) {
            navigate("/signin", { replace: true })
          }
          setIsLoading(false)
          setMessage(err?.response?.data?.message)
        })
    } else {
      if (!usernameReGex.test(name))
        setMessage('Invalid Alias Name')
      else setMessage('Invalid Tournamnet Name')
      setIsLoading(false)
    }
  }
  const joinTournament = async () => {
    setIsLoading(true)

    if (usernameReGex.test(name) && usernameReGex.test(tour)) {
      await Axios.post(
        'http://localhost:8800/api/tournament/check-alias/',
        {
          alias: name,
          tournament_name: tour,
          username: gameContext.selfData?.username,
        },
        {
          withCredentials: true,
        }
      )
        .then(() => {
          gameContext.setHandler('tournamentInfo', { name: tour, alias: name })
          navigate("/game/tournament/start", { replace: true })
        })
        .catch(async (err) => {
          if (err.response?.status === 403) {
            await auth.RefreshToken();
          }
          else if (err.response?.status === 401) {
            navigate("/signin", { replace: true })
          }
          setIsLoading(false)
          setMessage(err?.response?.data.message)
        })
    } else {
      if (!usernameReGex.test(name))
        setMessage('Invalid Alias Name')
      else setMessage('Invalid Tournamnet Name')
      setIsLoading(false)
    }
  }

  const handleButtonClick = () => {
    title === 'Create new Tournament' ? createTournament() : joinTournament()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    title === 'Create new Tournament' ? createTournament() : joinTournament()
  }

  return (
    <>
      {isLoading ? (
        <LoaderOntop />
      ) : (
        <div className="w-full flex flex-wrap gap-[20px] justify-center">
          <div className="input-gradient p-[20px] pb-0 w-full max-w-[400px] h-[500px] rounded-[15px] flex flex-col justify-between">
            <div className="text-input-container flex flex-col gap-[7px]">
              <div className="title-container text-[23px] font-medium text-[#eee]">
                {title}
              </div>
              <div className="text-[#eee] opacity-50 text-[14px] pb-[40px]">
                Please enter a display name and a tournament name.
              </div>
              <form
                onSubmit={handleSubmit}
                className="w-full  rounded-[15px] flex flex-col gap-[10px]"
              >
                <input
                  onChange={handleNameChange}
                  className={`rounded-[15px] bg-[#eee]/20 text-[#eee] placeholder:text-[#c5c5c5b8] outline-none px-[10px] h-[50px] flex w-full ${focusColor}`}
                  placeholder="Display Name"
                  type="text"
                  required
                />
                {params ?
                  <input
                    value={params}
                    onChange={handleTourChange}
                    className={`rounded-[15px] bg-[#eee]/20 text-[#eee] placeholder:text-[#c5c5c5b8] outline-none px-[10px] h-[50px] flex w-full ${focusColor}`}
                    placeholder="Tournament Name"
                    type="text"
                    disabled
                    required
                  /> :
                  <input
                    onChange={handleTourChange}
                    className={`rounded-[15px] bg-[#eee]/20 text-[#eee] placeholder:text-[#c5c5c5b8] outline-none px-[10px] h-[50px] flex w-full ${focusColor}`}
                    placeholder="Tournament Name"
                    type="text"
                    required
                  />
                }
                <button className="hidden" type="submit"></button>
              </form>
              <div className="text-[#ff0000] flex justify-center mb-[20px]">
                {message}
              </div>
            </div>
            <button
              className={`w-full ${buttonColor} mb-[15px] rounded-[15px] py-[8px] font-medium text-[18px]`}
              onClick={handleButtonClick}
            >
              {callToAction}
            </button>
          </div>
          {title !== 'Join a Tournament' ? (
            <></>
          ) : (!params &&
            <div className="input-gradient p-[20px] pb-0 w-full max-w-[400px] h-[500px] rounded-[15px] flex flex-col items-center gap-[10px]">
              <div className="font-light text-[#fff6f9] text-[20px] pb-[10px]">
                Active Tournament
              </div>
              <div className="overflow-y-scroll scrollbar-w flex flex-col gap-[10px] w-full">
                {activeTournament.map(({ name }, index) => (
                  <div
                    key={index}
                    className="shrink-0 h-[60px] bg-[#919191] w-full flex justify-center items-center rounded-[10px] text-lg"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default CreateTournamentSection
