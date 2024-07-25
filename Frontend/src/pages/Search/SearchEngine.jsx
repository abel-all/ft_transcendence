import { useState } from "react"
import search from "../../assets/imgs/search.svg"
import rankImg from "../../assets/imgs/rank.svg"
import addUserImg from "../../assets/imgs/AddUser.svg"
import chatImg from "../../assets/imgs/chat_friend.svg"
import playImg from "../../assets/imgs/paly_friend.svg"
import '../Game/css/index.css'
import './css/index.css'

function getRandomUsername() {
    const usernames = ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10",
                        "user11", "user12", "user13", "user14", "user15", "user16", "user17", "user18", "user19", "user20"];
    return usernames[Math.floor(Math.random() * usernames.length)];
}

function getRandomNumber() {
    return Math.floor(Math.random() * 3001);
}

const dataArray = Array.from({ length: 20 }, () => ({
    image: "https://picsum.photos/100/100",
    username: getRandomUsername(),
    randomNumber: getRandomNumber()
}));

// console.log(dataArray);


const SearchResultCard = ({rank, userImage, username, bgColor}) => {

    return (
        <div className="bg-[#6e6e6e] rounded-lg bg-opacity-30 w-full flex sm:justify-between max-sm:flex-col max-sm:gap-[10px] px-[10px] py-[4px]">
            <div className="image-userinfo-container flex gap-[20px] max-sm:flex-col max-sm:items-center">
                <img className="w-[80px] rounded-md " src={userImage}/>
                <div className="flex flex-col gap-[6px] sm:justify-center">
                    <div className="username text-[#eee] text-[20px]">{username}</div>
                    <div className="rank-container flex gap-[10px] opacity-50">
                        <img src={rankImg} />
                        <div className="user-rank text-[#eee]">{rank}</div>
                    </div>
                </div>
            </div>
            <div className="link-badge-container flex flex-col max-sm:items-center sm:justify-center sm:items-end gap-[10px]">
                <div className={`badge w-[20px] h-[20px] rounded-full ${bgColor}`}></div>
                <div className="icons-link flex gap-[20px]">
                    <img src={addUserImg} alt="" />
                    <img src={chatImg} alt="" />
                    <img src={playImg} alt="" />
                </div>
            </div>
        </div>
    )
}

const SearchEngine = ({scroll="", gap="my-[100px] gap-[100px]"}) => {

    const [inSearch, setInSearch] = useState("false");

    return (
        <div className={`w-full ${gap} max-sm:mt-[20px] flex flex-col items-center`}>
            <div className="search-bar w-full max-w-[968px] h-[71px] max-sm:h-[50px] flex justify-between bg-[#d9d9d9] px-[20px] rounded-[8px] bg-opacity-20">
                <input className="text-[#eee] outline-none border-none flex-1 bg-transparent" placeholder="Type Somethings..." type="text" />
                <img className="w-full max-w-[40px]" src={search} />
            </div>
            <div className={`${scroll} search-res-container w-full max-w-[968px] flex flex-col gap-[20px]`}>
                <SearchResultCard 
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
                />
                <SearchResultCard 
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
                />
                <SearchResultCard 
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
                />
                <SearchResultCard 
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
                />
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