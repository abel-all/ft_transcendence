import { useEffect, useState } from 'react'
import LoaderOntop from '../../components/LoaderOntop.jsx'
import { useGameSettings } from './GameSettingsContext'
import Axios from 'axios'
import '../2FaAuth/css/index.css'
import RefreshToken from "../../hooks/RefreshToken"

const CreateTournamentSection = ({ title, callToAction, buttonColor }) => {
  const [focusColor, setFocusColor] = useState(
    'focus:border focus:border-[#FF0000]'
  )
  const [message, setMessage] = useState('')
  const [activeTournament, setActiveTournament] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState('')
  const [tour, setTour] = useState('')
  const gameContext = useGameSettings()
  const nameReGex = /^[a-zA-Z-]{2,16}$/

  useEffect(() => {
    console.log('hello')
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }, [])

  useEffect(() => {
    const fetchActiveTournament = async () => {
      await Axios.get('http://localhost:8800/api/tournament/names/', {
        withCredentials: true,
      })
        .then((response) => {
          console.log('get active tournament seccess', response?.data)
          setActiveTournament(response?.data)
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            RefreshToken();
            fetchActiveTournament();
          }
          setIsLoading(false)
          setMessage(err?.response?.data.message)
        })
    }
    if (title === 'Join a Tournament') fetchActiveTournament()
  }, [])

  const checkInput = (input) => {
    if (nameReGex.test(input))
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

    if (nameReGex.test(name) && nameReGex.test(tour)) {
      await Axios.post(
        'http://localhost:8800/api/tournament/check-name/',
        {
          tournament_name: tour,
        },
        {
          withCredentials: true,
        }
      )
        .then((response) => {
          console.log('create tournament success : ', response?.data)
          gameContext.setHandler('isTournament', true)
          gameContext.setHandler('isCreateTour', true)
          gameContext.setHandler('tournamentInfo', { name: tour, alias: name })
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            RefreshToken();
            createTournament();
          }
          setIsLoading(false)
          setMessage(err?.response?.data?.message)
        })
    } else {
      setIsLoading(false)
      setMessage('Invalid name, please try again')
    }
  }
  const joinTournament = async () => {
    setIsLoading(true)

    if (nameReGex.test(name) && nameReGex.test(tour)) {
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
        .then((response) => {
          console.log('join tournament success : ', response?.data)
          gameContext.setHandler('isTournament', true)
          gameContext.setHandler('tournamentInfo', { name: tour, alias: name })
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            RefreshToken();
            joinTournament();
          }
          setIsLoading(false)
          setMessage(err?.response?.data.message)
        })
    } else {
      setIsLoading(false)
      setMessage('Invalid name, please try again')
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
                <input
                  onChange={handleTourChange}
                  className={`rounded-[15px] bg-[#eee]/20 text-[#eee] placeholder:text-[#c5c5c5b8] outline-none px-[10px] h-[50px] flex w-full ${focusColor}`}
                  placeholder="Tournament Name"
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
              className={`w-full ${buttonColor} mb-[15px] rounded-[15px] py-[8px] font-medium text-[18px]`}
              onClick={handleButtonClick}
            >
              {callToAction}
            </button>
          </div>
          {title !== 'Join a Tournament' ? (
            <></>
          ) : (
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
