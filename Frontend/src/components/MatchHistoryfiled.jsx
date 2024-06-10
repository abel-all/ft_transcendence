import FriendPic from "../assets/imgs/FriendPic.svg"

function Player (Data) {
    return (
        <>
            <img className="w-[44.15px] h-[44.15px]" src={Data.profile} alt="" />
            <span className="text-[18px] md:text-[20px] font-[400] font-[Outfit]">{Data.username}</span>
            <div className="flex flex-row justify-start pl-[10px]">
                <span className="trendup-icon text-[12px] px-[3px] font-[500] font-[Outfit] opacity-60"></span>
                <span className="text-[12px] px-[3px] font-[500] font-[Outfit] opacity-60">{Data.rank}</span>
            </div>
        </>
    )
}

function MatchHistoryfiled(Data) {
    return (
        <div className="flex justify-around items-center historyHolder w-[100%] mb-[5px] h-[123px] md:rounded-full bg-[#2d3c3f] border-[1px] text-[#ffffff] border-[#000000]">
        <div className="playerone flex flex-col items-center ">
            <Player
                rank = {Data.rankone}
                username = {Data.userone}
                profile = {FriendPic}
            />
        </div>
        <div className="detailes flex flex-col items-center">
            <div className="resulte flex flex-row justify-between">
                <div className="playeronePoint text-[17px] md:text-[35px] text-[#FFFFFF] font-[500] font-[Outfit]">{Data.home}</div>
                <div className="double text-[17px] md:text-[35px] text-[#FFFFFF] font-[500] mx-[25px] font-[Outfit]">:</div>
                <div className="playertowPoint text-[17px] md:text-[35px] text-[#FFFFFF] font-[500] font-[Outfit]">{Data.away}</div>
            </div>
            <div className="date text-[16px] px-[3px] font-[500] font-[Outfit] opacity-60"> {Data.date}</div>
        </div>
        <div className="playertwo  flex flex-col items-center">
            <Player
                    rank = {Data.ranktwo}
                    username = {Data.usertwo}
                    profile = {FriendPic}
                />
        </div>
    </div>
    )
}


export default MatchHistoryfiled

