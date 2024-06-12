import MatchHistoryfiled from '../../../components/MatchHistoryfiled'
import MatchHistor from "../../../assets/MatchHistory.json"

function MatchHistory({className}) {
    return (
        <div className={"MatchHistor max-h-[687px] overflow-auto mb-[82px] w-[620px] p-[5px] md:p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262] mr-[2px] mt-[4px]" + (className ? ` ${className}` : '')}>
            <div className="Title text-[20px] md:text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]"> Match History</div>
                {
                    MatchHistor.map( MatchJson => {
                        return (
                            <MatchHistoryfiled
                                ranktwo =   {MatchJson.ranktwo}
                                rankone =   {MatchJson.rankone}
                                userone =   {MatchJson.userone}
                                usertwo =   {MatchJson.usertwo}
                                home    =   {MatchJson.home}
                                away    =   {MatchJson.away}
                            />
                        )
                    })
                }
        </div>
    )
}

export default MatchHistory