import MatchHistoryfiled from '../../../components/MatchHistoryfiled'
import { useEffect, useState } from 'react'
import axios from 'axios'

function MatchHistory({ username, className , UrlUsername}) {

    const [MatchHistor, setMatchHistory] = useState([]);
    useEffect(() => {
        if (username || UrlUsername) {

            axios.get(`http://localhost:8800/api/game/match-history/${username ? username : UrlUsername}/`, {
                headers: {
                    'Accept': 'application/json'
                }})
                .then((res) => {
                    setMatchHistory(res.data);
                    console.log(res.data);
                }).catch(err => {
                })
        }
    }, [username, UrlUsername]);
    
  return (
    <div
        className={
          'MatchHistor min-h-[685px] mb-[82px] w-[620px] p-[5px] md:p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262]' +
          (className ? ` ${className}` : '')
        }>
        <div className="Title text-[20px] md:text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]">
            {' '}
            Match History
        </div>
        <div className="HistoryContainer max-h-[563px] overflow-auto">
            {MatchHistor && MatchHistor.map((MatchJson, index) => {
                return (
                    <div
                        key={index}
                        className="flex justify-around items-center historyHolder w-[99%] mb-[5px] h-[123px] md:rounded-full bg-[#2d3c3f] border-[1px] text-[#ffffff] border-[#000000]">
                        <MatchHistoryfiled
                            rankone={MatchJson.winner.rank}
                            ranktwo={MatchJson.loser.rank}
                            userone={MatchJson.winner.username}
                            usertwo={MatchJson.loser.username}
                            Picone={MatchJson.winner.picture}
                            Pictwo={MatchJson.loser.picture}
                            home={MatchJson.winner_score}
                            away={MatchJson.loser_score}
                            index={index}
                        />
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MatchHistory
