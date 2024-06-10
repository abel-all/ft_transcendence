import MatchHistoryfiled from '../../../components/MatchHistoryfiled'


function MatchHistory({className}) {
    return (
        <div className={"w-[620px] p-[5px] md:p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262] mr-[2px] mt-[4px]" + (className ? ` ${className}` : '')}>
            <div className="Title text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]"> Match History</div>
            <MatchHistoryfiled
                ranktwo =   "6456"
                rankone =   "456"
                userone =   "username"
                usertwo =   "username"
                home    =   "10"
                away    =   "9"
            />
            <MatchHistoryfiled
                ranktwo =   "320"
                rankone =   "250"
                userone =   "username"
                usertwo =   "username"
                home    =   "10"
                away    =   "9"
            />
            <MatchHistoryfiled
                ranktwo =   "320"
                rankone =   "250"
                userone =   "username"
                usertwo =   "username"
                home    =   "10"
                away    =   "9"
            />
            <MatchHistoryfiled
                ranktwo =   "320"
                rankone =   "250"
                userone =   "username"
                usertwo =   "username"
                home    =   "10"
                away    =   "9"
            />
        </div>
    )
}

export default MatchHistory