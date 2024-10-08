import MatchHistoryfiled from '../../../components/MatchHistoryfiled'
import MatchHistor from "../../../assets/MatchHistory.json"
import { useEffect } from 'react'
import axios from 'axios';

function MatchHistory({className}) {

    // useEffect(() => {
    //     axios.get('https://aennaki.me/api/game/match-history/ahennaki', {
    //         headers: {
    //         'Accept': 'application/json'
    //       }})
    //     .then((res) => {
    //       console.log("Data from ahmed", res.data);
    //     }).catch(err => {
    //         console.log("Data from ahmed", err);
    //     })

    //     axios.get('https://aennaki.me/api/game/player/4/', {
    //         headers: {
    //             'Accept': 'application/json'
    //           }})
    //         .then((res) => {
    //           console.log("Data from ahmed 2 ", res.data);
    //         }).catch(err => {
    //             console.log("Data from ahmed 2 ", err);
    //         })
    // }, []);
    
    return (
        <div className={"MatchHistor max-h-[685px] mb-[82px] w-[620px] p-[5px] md:p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262]" + (className ? ` ${className}` : '')}>
            <div className="Title text-[20px] md:text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]"> Match History</div>
                <div className='HistoryContainer max-h-[563px] overflow-auto'>
                    {
                        MatchHistor.map( (MatchJson, index )=> {
                            return (
                                <div key={index} className="flex justify-around items-center historyHolder w-[99%] mb-[5px] h-[123px] md:rounded-full bg-[#2d3c3f] border-[1px] text-[#ffffff] border-[#000000]">
                                    <MatchHistoryfiled
                                        ranktwo =   {MatchJson.ranktwo}
                                        rankone =   {MatchJson.rankone}
                                        userone =   {MatchJson.userone}
                                        usertwo =   {MatchJson.usertwo}
                                        home    =   {MatchJson.home}
                                        away    =   {MatchJson.away}
                                        index   = {index}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
        </div>
    )
}

export default MatchHistory