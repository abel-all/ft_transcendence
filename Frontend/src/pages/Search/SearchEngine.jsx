import { useState } from "react"
import search from "../../assets/imgs/search.svg"
import '../Game/css/index.css'

function getRandomUsername() {
    const usernames = ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10",
                        "user11", "user12", "user13", "user14", "user15", "user16", "user17", "user18", "user19", "user20"];
    return usernames[Math.floor(Math.random() * usernames.length)];
}

function getRandomNumber() {
    return Math.floor(Math.random() * 3001);
}

const dataArray = Array.from({ length: 20 }, () => ({
    image: "https://picsum.photos/200/200",
    username: getRandomUsername(),
    randomNumber: getRandomNumber()
}));

// console.log(dataArray);

const SearchEngine = () => {

    const [inSearch, setInSearch] = useState("false");

    return (
        <div className="w-full mb-[100px] flex flex-col gap-[100px]">
            <div className="search-bar w-full max-w-[968px] h-[71px] flex justify-between">
                <input className="text-[#eee] outline-none border-none flex-1 bg-transparent fo" placeholder="Type Somethings..." type="text" />
                <img src={search} />
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