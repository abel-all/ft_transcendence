import FriendPic from "../assets/imgs/FriendPic.svg"

function Player ({rank, username, profile}) {
    console.log("Profile : ", profile);
    return (
        <>
            <img className="w-[44.15px] h-[44.15px] rounded-full" src={profile} alt="" />
            <span className="text-[18px] md:text-[20px] font-[400]  w-[150px] font-[Outfit]">{username}</span>
            <div className="flex flex-row justify-start pl-[10px]">
                <span className="trendup-icon text-[12px] px-[3px] font-[500] font-[Outfit] opacity-60"></span>
                <span className="text-[12px] px-[3px] font-[500] font-[Outfit] opacity-60">{rank}</span>
            </div>
        </>
    )
}

function MatchHistoryfiled(Data) {
    console.log("Data : ", Data);
    return (
        <>
            <div className="playerone flex flex-col text-center justify-between items-center ">
                <Player
                    rank = {Data.rankone}
                    username = {Data.userone}
                    profile = {Data.Picone ? `http://localhost:8888${Data.Picone}` : FriendPic}
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
            <div className="playertwo flex flex-col text-center items-center">
                <Player
                        rank = {Data.ranktwo}
                        username = {Data.usertwo}
                        profile = {Data.Pictwo ? `http://localhost:8888${Data.Pictwo}` : FriendPic}
                    />
            </div>
        </>
    )
}


export default MatchHistoryfiled

