import { useEffect, useState } from "react"
import search from "../../assets/imgs/search.svg"
import Axios from "axios"
import '../Game/css/index.css'
import './css/index.css'
import Spiner from "../Game/Spiner"
import SearchResultCard from "./SearchResultCard.jsx"

// let oneTime = false;

const SearchEngine = () => {

    // const [inSearch, setInSearch] = useState("false");
    const [errorMessage, setErrorMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const fetchPlayerData = async () => {
    //         oneTime = true;
    //         await Axios.post("https://www.fttran.tech/api/game/join/",
    //         {
    //             withCredentials:true,
    //         }).then((response) => {
    //             console.log("join request hereeee!!!");
    //             setLoading(false);
    //         }).catch(err => {
    //             console.log(err);
    //             // setErrorMessage(true);
    //         })
    //     }

    //     if (!oneTime)
    //         fetchPlayerData();

    //     return () => {
    //         oneTime = false;
    //     }

    // }, [])

    return (
        <div className={`w-full my-[200px] gap-[100px] max-sm:my-[150px] flex flex-col items-center`}>
            <div className="search-bar w-full max-w-[968px] h-[51px] max-sm:h-[40px] flex justify-between bg-[#d9d9d9] px-[20px] rounded-[8px] bg-opacity-20">
                <input className="text-[#eee] outline-none border-none flex-1 bg-transparent" placeholder="Type Somethings..." type="text" />
                <img className="w-[34px] max-sm:w-[25px]" src={search} />
            </div>
            <div className={`search-res-container w-full max-w-[968px] flex flex-col gap-[20px]`}>
                {loading ? <Spiner/> :
                    <>
                        {errorMessage ?
                            <div className="flex justify-center items-center text-[#fff6f9] text-[20px] max-sm:text-[16px]  font-light">No Friends!</div>
                        :
                            <SearchResultCard
                                rank="5343"
                                userImage="https://picsum.photos/100/100"
                                username="abel-all"
                                bgColor="bg-[#CB3401]"
                            />
                        }
                    </>
                }
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
