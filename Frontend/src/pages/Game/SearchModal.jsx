import { useEffect, useRef, useState } from "react";
import xIcon from "../../assets/imgs/xIcon.svg"
import search from "../../assets/imgs/search.svg"
import { useGameSettings } from './GameSettingsContext'
import SearchResultCard from "../Search/SearchResultCard"
import Spiner from "./Spiner"
import Axios from "axios"

const SearchModal = () => {

    const gameContext = useGameSettings();
    const [focusOnFrnds, setFocusOnFrnds] = useState(true);
    const [focusOnSrch, setFocusOnSrch] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState("");

    const [isBottomCounter, setIsBottomCounter] = useState(1);
    const [notiData, setNotiData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const targetRef = useRef(null);

    const fetchUsersData = async () => {
        await Axios.post("https://fttran.tech/api/profile/search/",{
            limit: 20,
            prefix: searchResult
        },
        {
            withCredentials:true,
        }).then(() => {
            setLoading(false);
            setErrorMessage(false);
        }).catch(err => {
            console.log(err);
            setErrorMessage(true);
        })
    }
    const fetchFriendsData = async () => {
        await Axios.post("https://fttran.tech/api/profile/search/",{
            limit: 20,
            prefix: searchResult
        },
        {
            withCredentials:true,
        }).then(() => {
            setLoading(false);
            setErrorMessage(false);
        }).catch(err => {
            console.log(err);
            setErrorMessage(true);
        })
    }


    const modalClickHandler1 = () => {
        // if (!focusOnFrnds) {
        //     setLoading(true);
        //     fetchFriendsData();
        //     setFocusOnFrnds(true);
        //     setFocusOnSrch(false);
        // }
    }
    const modalClickHandler2 = () => {
        // if (!focusOnSrch) {
        //     setLoading(true);
        //     fetchUsersData();
        //     setFocusOnFrnds(false);
        //     setFocusOnSrch(true);
        // }
    }

    const handleXClick = () => {
        gameContext.handleModalClick();
    }

    useEffect(() => {
        // const fetchUserData = async () => {
            // onetime = true;

            // await Axios.post("https://fttran.tech/api/notifications/", {
            //     offset: 10
            // }, {
            //     withCredentials:true,
            // }).then((response) => {
            //     setNotiData(response.data.message)
            // }).catch(err => {
            //         console.log(err);
            //         console.log("Please try again!")
            // })
        // }
        console.log("isBottomCounter");
        const getData = setTimeout(() => {
            setNotiData(prev => [...prev, isBottomCounter, isBottomCounter, isBottomCounter, isBottomCounter, isBottomCounter, isBottomCounter, isBottomCounter, isBottomCounter, isBottomCounter, isBottomCounter]);
            setIsLoaded(false);
            // setIsLoading(false);
        }, 2000);
        // if (!onetime)
        // fetchUserData();

        return () => {
            clearTimeout(getData);
        }
    } ,[isBottomCounter])

    useEffect(() => {
        // const getData = setTimeout(() => {
        //     if (focusOnFrnds)
        //         fetchFriendsData();
        //     else
        //         fetchUsersData();
        // }, 2000);

        // return () => {clearTimeout(getData)}

    }, [searchResult])


    useEffect(() => {
        const currentRef = targetRef.current;
        let isFetching = false;
        let setCounter;
        const handleScroll = () => {

            if (currentRef && !isFetching) {
                const { scrollTop, scrollHeight, clientHeight } = currentRef;
                if (scrollTop + clientHeight >= scrollHeight) {
                    setIsLoaded(true);
                    isFetching = true;
                    // setIsBottomCounter(prev => prev + 1);
                    setCounter = setTimeout(() => {
                        setIsBottomCounter((prev) => prev + 1);
                        isFetching = false;
                    }, 2000);

                }
            }

        }

        if (currentRef)
            currentRef.addEventListener("scroll", handleScroll);

        return () => {
            if (currentRef) {
                clearTimeout(setCounter);
                currentRef.removeEventListener("scroll", handleScroll);
            }
        }
    }, [])

    return (
        <div className="modal-container w-full flex justify-center mt-[200px]">
            {/* <div className=""> */}
            {/* </div> */}
            <div  className="modal-container p-[20px] rounded-[15px] w-full h-full max-w-[600px] bg-gradient-to-t from-[#161c20] to-[#43515b] relative">
                <div onClick={handleXClick} className="cursor-pointer w-[40px] h-[40px] rounded-full bg-[#fff6f9] flex justify-center items-center absolute right-[-15px] top-[-15px]">
                    <img className="w-[30px] h-[30px]" src={xIcon} />
                </div>
                <div className="header w-full flex justify-evenly">
                    <button onClick={modalClickHandler1} className={`h-[40px] w-[100px] rounded-[15px] duration-[300ms] font-light ${focusOnFrnds ? "bg-[#009f9f]" : "border border-[#000]"}`}>Friends</button>
                    <button onClick={modalClickHandler2} className={`h-[40px] w-[100px] rounded-[15px] duration-[300ms] font-light ${focusOnSrch ? "bg-[#009f9f]" : "border border-[#000]"}`}>Search</button>
                </div>
                <div className={`w-full mt-[60px] gap-[60px] max-sm:my-[150px] flex flex-col items-center`}>
                    <div className="search-bar w-full max-w-[968px] h-[51px] max-sm:h-[40px] flex justify-between bg-[#d9d9d9] px-[20px] rounded-[8px] bg-opacity-20">
                        <input
                            className="text-[#eee] outline-none border-none flex-1 bg-transparent"
                            placeholder="Type Somethings..."
                            type="text"
                            onChange={(e) => {setSearchResult(e.target.value)}}
                        />
                        <img className="w-[34px] max-sm:w-[25px]" src={search} />
                    </div>
                    <div className={`search-res-container w-full max-w-[968px] flex flex-col gap-[20px]`}>
                        {loading ? <Spiner/> :
                            <>
                                {errorMessage ?
                                    <div className="flex justify-center items-center text-[#fff6f9] text-[20px] max-sm:text-[16px]  font-light">No One!</div>
                                :
                                <div ref={targetRef} className="flex flex-col gap-[20px] h-[800px] overflow-y-scroll scrollbar-w" >
                                    {notiData.map((notification, index) => (
                                        <div key={index} className="flex-shrink-0 flex w-full h-[80px] bg-[#DA5644] rounded-[10px]">
                                            {notification}
                                        </div>
                                    ))}
                                    {isLoaded && <Spiner/>}
                                    {/* <SearchResultCard
                                        rank="5343"
                                        userImage="https://picsum.photos/100/100"
                                        username="abel-all"
                                        bgColor="bg-[#CB3401]"
                                    />
                                    <SearchResultCard
                                        rank="5343"
                                        userImage="https://picsum.photos/100/100"
                                        username="abel-all"
                                        bgColor="bg-[#CB3401]"
                                    /> */}
                                </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchModal
