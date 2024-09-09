import rankImg from "../../assets/imgs/rank.svg"
import addUserImg from "../../assets/imgs/AddUser.svg"
import chatImg from "../../assets/imgs/chat_friend.svg"
import playImg from "../../assets/imgs/paly_friend.svg"

const SearchResultCard = ({rank, userImage, username, bgColor}) => {

    const handlePlayWithMeClick = () => {
        console.log(username);
    }

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
                <div onClick={handlePlayWithMeClick} className="cursor-pointer icons-link flex gap-[20px]">
                    <img src={playImg} />
                    <img src={addUserImg} />
                    <img src={chatImg} />
                </div>
            </div>
        </div>
    )
}

export default SearchResultCard
