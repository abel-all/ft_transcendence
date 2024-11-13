import { useEffect, useState } from 'react'
import xIcon from '../../assets/imgs/xIcon.svg'
import search from '../../assets/imgs/search.svg'
import { useGameSettings } from './GameSettingsContext'
import SearchResultCardTour from '../Search/SearchResultCardTour'
import Spiner from './Spiner'
import Axios from 'axios'
import badgeConverter from '../../hooks/badgeConverter'
import RefreshToken from "../../hooks/RefreshToken"
import { useNavigate } from 'react-router-dom'

const SearchModal = () => {
  const navigate = useNavigate();
  const [focusOnFrnds, setFocusOnFrnds] = useState(true)
  const [focusOnSrch, setFocusOnSrch] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchResult, setSearchResult] = useState('')

  // const [isBottomCounter, setIsBottomCounter] = useState(1);
  const [listOfSearchResult, setListOfSearchResult] = useState([])
  // const [isLoaded, setIsLoaded] = useState(false);
  const gameContext = useGameSettings()

  const fetchUsersData = async () => {
    await Axios.post(
      'http://localhost:8800/api/profile/search/',
      {
        prefix: searchResult,
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        setLoading(false)
        setListOfSearchResult(response?.data)
        setErrorMessage(false)
      })
      .catch((err) => {
        if (err.response?.status === 403) {
          RefreshToken();
          fetchUsersData();
        }
        else if (err.response?.status === 401) {
          navigate("/signin", { replace: true })
        }
        console.log(err)
        setErrorMessage(true)
      })
  }

  const fetchFriendsData = async () => {
    await Axios.post(
      'http://localhost:8800/api/profile/search/friends/',
      {
        prefix: searchResult,
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        setLoading(false)
        setListOfSearchResult(response?.data)
        setErrorMessage(false)
      })
      .catch((err) => {
        if (err.response?.status === 403) {
          RefreshToken();
          fetchFriendsData();
        }
        else if (err.response?.status === 401) {
          navigate("/signin", { replace: true })
        }
        console.log(err)
        setErrorMessage(true)
      })
  }

  const modalClickHandler1 = () => {
    if (!focusOnFrnds) {
      setLoading(true)
      setFocusOnFrnds(true)
      setFocusOnSrch(false)
    }
  }
  const modalClickHandler2 = () => {
    if (!focusOnSrch) {
      setLoading(true)
      setFocusOnFrnds(false)
      setFocusOnSrch(true)
    }
  }

  const handleXClick = () => {
    gameContext.handleModalClick()
  }

  useEffect(() => {
    let getData

    if (searchResult) {
      getData = setTimeout(() => {
        if (focusOnFrnds) fetchFriendsData()
        else fetchUsersData()
      }, 500)
    }

    return () => {
      clearTimeout(getData)
    }
  }, [searchResult, focusOnFrnds])


  return (
    <div className="modal-container w-full flex justify-center mt-[200px]">
      <div className="modal-container p-[20px] rounded-[15px] w-full h-full max-w-[600px] bg-gradient-to-t from-[#161c20] to-[#43515b] relative">
        <div
          onClick={handleXClick}
          className="cursor-pointer w-[40px] h-[40px] rounded-full bg-[#fff6f9] flex justify-center items-center absolute right-[-15px] top-[-15px]"
        >
          <img className="w-[30px] h-[30px]" src={xIcon} />
        </div>
        <div className="header w-full flex justify-evenly">
          <button
            onClick={modalClickHandler1}
            className={`h-[40px] w-[100px] rounded-[15px] duration-[300ms] font-light ${
              focusOnFrnds ? 'bg-[#009f9f]' : 'border border-[#000]'
            }`}
          >
            Friends
          </button>
          <button
            onClick={modalClickHandler2}
            className={`h-[40px] w-[100px] rounded-[15px] duration-[300ms] font-light ${
              focusOnSrch ? 'bg-[#009f9f]' : 'border border-[#000]'
            }`}
          >
            Search
          </button>
        </div>
        <div
          className={`w-full mt-[60px] gap-[60px] max-sm:my-[150px] flex flex-col items-center`}
        >
          <div className="search-bar w-full max-w-[968px] h-[51px] max-sm:h-[40px] flex justify-between bg-[#d9d9d9] px-[20px] rounded-[8px] bg-opacity-20">
            <input
              className="text-[#eee] outline-none border-none flex-1 bg-transparent"
              placeholder="Type Somethings..."
              type="text"
              onChange={(e) => {
                setSearchResult(e.target.value)
              }}
            />
            <img className="w-[34px] max-sm:w-[25px]" src={search} />
          </div>
          <div
            className={`search-res-container w-full max-w-[968px] flex flex-col gap-[20px]`}
          >
            {loading ? (
              <Spiner />
            ) : (
              <>
                {errorMessage ? (
                  <div className="flex justify-center items-center text-[#fff6f9] text-[20px] max-sm:text-[16px]  font-light">
                    No One!
                  </div>
                ) : (
                    listOfSearchResult.map(
                      ({ username, rank, badge, picture }, index) => (
                          <SearchResultCardTour
                            key={index}
                            rank={rank}
                            userImage={picture || 'https://picsum.photos/100/100'}
                            userName={username}
                            bgColor={badgeConverter(badge)}
                          />
                      )
                    )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchModal
