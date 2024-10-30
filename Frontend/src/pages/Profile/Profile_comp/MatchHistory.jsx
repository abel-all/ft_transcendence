import MatchHistoryfiled from '../../../components/MatchHistoryfiled'
// import MatchHistor from '../../../assets/MatchHistory.json'
import { useEffect, useState } from 'react'
import axios from 'axios'

function MatchHistory({ className , UrlUsername}) {

    const [MatchHistor, setMatchHistory] = useState([]);

    useEffect(() => {
        axios.get(`https://fttran.tech/api/game/match-history/${UrlUsername ? UrlUsername : ""}/`, {
            headers: {
            'Accept': 'application/json'
            }})
        .then((res) => {
            setMatchHistory(res.data);
            console.log("Data from ahmed", res.data);
        }).catch(err => {
            console.log("Data from ahmed", err);
        })

    //     axios.get('https://fttran.tech/api/game/player/4/', {
    //         headers: {
    //             'Accept': 'application/json'
    //           }})
    //         .then((res) => {
    //           console.log("Data from ahmed 2 ", res.data);
    //         }).catch(err => {
    //             console.log("Data from ahmed 2 ", err);
    //         })
    }, []);


    // ended_at
    // : 
    // "2024-10-28T09:05:16.571256Z"
    // loser
    // : 
    // {id: 2, username: 'ennaki', picture: null, rank: 100, badge: 'BRONZE', …}
    // loser_score
    // : 
    // 9
    // match
    // : 
    // {player1: {…}, player2: {…}, start_time: '2024-10-28T09:03:53.694760Z', status: 'finished'}
    // winner
    // : 
    // {id: 1, username: 'ahmed', picture: null, rank: 150, badge: 'BRONZE', …}
    // winner_score
    // : 
    // 10

    
  return (
    <div
        className={
          'MatchHistor max-h-[685px] mb-[82px] w-[620px] p-[5px] md:p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262]' +
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
