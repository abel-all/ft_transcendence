import { useEffect, useState } from 'react'
import search from '../../assets/imgs/search.svg'
import Axios from 'axios'
import '../Game/css/index.css'
import './css/index.css'
import Spiner from '../Game/Spiner'
import SearchResultCard from './SearchResultCard.jsx'
import badgeConverter from '../../hooks/badgeConverter.jsx'
import RefreshToken from "../../hooks/RefreshToken"

// let oneTime = false;

const SearchEngine = () => {
  // const [inSearch, setInSearch] = useState("false");
  // const [focusOnSearch, setFocusOnSearch] = useState(false);
  const [searchResult, setSearchResult] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [listOfSearchResult, setListOfSearchResult] = useState([])

  const fetchPlayerData = async () => {
    // oneTime = true;
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
        setErrorMessage(false)
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          RefreshToken();
          fetchPlayerData();
        }
        console.log(err)
        setErrorMessage(true);
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

    return () => {
      clearTimeout(getData)
    }
  }, [searchResult])

  return (
    <div
      className={`w-full my-[200px] gap-[100px] max-sm:my-[150px] flex flex-col items-center`}
    >
      <div className="search-bar w-full max-w-[968px] h-[51px] max-sm:h-[40px] flex justify-between bg-[#d9d9d9] px-[20px] rounded-[8px] bg-opacity-20">
        <input
          onChange={(e) => {
            setSearchResult(e.target.value)
          }}
          className="text-[#eee] outline-none border-none flex-1 bg-transparent"
          placeholder="Type Somethings..."
          type="text"
        />
        <img className="w-[34px] max-sm:w-[25px]" src={search} />
      </div>
      <div
        className={`search-res-container w-full max-w-[968px] flex flex-col gap-[20px]`}
      >
        {loading ? (
          <Spiner />
        ) : errorMessage ? (
          <div className="flex justify-center items-center text-[#fff6f9] text-[20px] max-sm:text-[16px] font-light">
            No Friends!
          </div>
        ) : (
          listOfSearchResult.map(
            ({ username, rank, badge, picture }, index) => (
              <SearchResultCard
                key={index}
                rank={rank}
                userImage={picture || 'https://picsum.photos/100/100'}
                userName={username}
                bgColor={badgeConverter(badge)}
              />
            )
          )
        )}
      </div>
      {/* {dataArray.map((element, index) => {

            })} */}
      {/* {inSearch ?
                (
                    <div className="w-full max-w-[1000px] flex justify-center items-center">
                        <div className="spiner-settings w-[50px] h-[50px] rounded-full"></div>
                    </div>
                ) :
                (
                    {dataArray.map()}
                )
            } */}
    </div>
  )
}

export default SearchEngine
