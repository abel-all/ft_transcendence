import rankIcon from "../../assets/imgs/rank.svg"
import avatarIcon from "../../assets/imgs/avatar.svg"

const MatchMakingCard = (props) => {

    let hideSpiner = "hidden";
    let image = props.image;
    let bg = props.bgColor;
    let border = "border";

    if (props.avatar) {
        image = avatarIcon;
        hideSpiner = "";
        bg = "bg-white";
        border=""
    }
    return (
        <div className="flex flex-col gap-[5px] w-[130px]">
            <div className="font-medium text-[25px] text-[#f0f0f1] w-full text-center">{props.username}</div>
            <div className={bg + " w-full h-[150px] relative rounded-[10px] hover:scale-[1.02] duration-[600ms] flex flex-col items-center"}>
                <img className={"w-full max-w-[130px] h-[130px] border-black rounded-t-[10px] " + border} src={image} alt="profile image" />
                <div className={"spiner w-full max-w-[17px] h-[17px] bg-transparent rounded-full " + hideSpiner} ></div>
            </div>
            <div className="w-full font-medium opacity-80 text-[#f0f0f1] flex gap-[15px]">
                <img src={rankIcon} alt="rank icon" />
                <div>{props.rank}</div>
            </div>
        </div>
    )
}

export default MatchMakingCard;