import { useEffect, useState } from 'react'
import search from '../../assets/imgs/search.svg'
import defualtImg from '../../assets/imgs/defualtImg.jpg'
import Axios from 'axios'
import '../Game/css/index.css'
import './css/index.css'
import Spiner from '../Game/Spiner'
import SearchResultCard from './SearchResultCard.jsx'
import badgeConverter from '../../hooks/badgeConverter.jsx'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/Auth.jsx'
import Alert from '../../components/Alert.jsx'

const SearchEngine = () => {
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [listOfSearchResult, setListOfSearchResult] = useState([])
  const [isError, setIsError] = useState(null)
  const auth = useAuth();

  const fetchPlayerData = async () => {
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
        setListOfSearchResult(response?.data)
        setLoading(false)
      })
      .catch(async (err) => {
        if (err.response?.status === 403) {
          await auth.RefreshToken();
        }
        else if (err.response?.status === 401) {
          navigate("/signin", { replace: true })
        }
        setIsError(err?.response?.data?.message)
      })
  }

  useEffect(() => {
    let getData

    if (searchResult) {
      setLoading(true)
      getData = setTimeout(() => {
        fetchPlayerData()
      }, 500)
    }
    else {
      setListOfSearchResult([])
      setLoading(false)
    }

    return () => {
      clearTimeout(getData)
    }
  }, [searchResult])

  return (
    <div
      className={`w-full my-[200px] gap-[100px] max-sm:my-[150px] flex flex-col items-center`}
    >
      {isError && <Alert message={isError} color={"red"}/>}
      <div className="search-bar w-full max-w-[968px] h-[51px] max-sm:h-[40px] flex justify-between bg-[#d9d9d9] px-[20px] rounded-[8px] bg-opacity-20">
        <input
          onChange={(e) => {
            setSearchResult(e.target.value)
          }}
          className="text-[#eee] outline-none border-none flex-1 bg-transparent"
          placeholder="Search for friends, or users..."
          type="text"
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
          {listOfSearchResult?.length === 0 && searchResult ? (
            <div className="flex justify-center items-center text-[#fff6f9] text-[20px] max-sm:text-[16px] font-light">
              No One!
            </div>
          ) : (
            listOfSearchResult.map(
              ({ username, rank, badge, picture }, index) => (
                <SearchResultCard
                  key={index}
                  rank={rank}
                  userImage={picture ? `http://localhost:8888${picture}` : defualtImg}
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
  )
}

export default SearchEngine
