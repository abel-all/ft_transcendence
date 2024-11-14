import rankIcon from "../../assets/imgs/rank.svg"
import avatarIcon from "../../assets/imgs/avatar.svg"

const MatchMakingCard = ( { image, bgColor, username, avatar, rank } ) => {

    return (
        <div className="flex flex-col gap-[5px] w-[130px]">
            <div className={`font-medium text-[25px] text-[#f0f0f1] w-full text-center ${avatar ? "hidden" : ""}`}>{username}</div>
            <div className={`${avatar ? "bg-white" : bgColor}  w-full h-[150px] relative rounded-[10px] hover:scale-[1.02] duration-[600ms] flex flex-col items-center`}>
                <img className={`w-full max-w-[130px] h-[130px] border-black rounded-t-[10px] ${avatar ? "" : "border"}`} src={avatar ? avatarIcon : image} alt="profile image" />
                <div className={`spiner w-full max-w-[17px] h-[17px] bg-transparent rounded-full ${avatar ? "" : "hidden"}`} ></div>
            </div>
            <div className={`w-full font-medium opacity-80 text-[#f0f0f1] flex gap-[15px] ${avatar ? "hidden" : ""}`}>
                <img src={rankIcon} alt="rank icon" />
                <div>{rank}</div>
            </div>
        </div>
    )
}

export default MatchMakingCard;
