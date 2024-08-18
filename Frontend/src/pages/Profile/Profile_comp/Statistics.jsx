import { useEffect, useState } from "react";
import axios from "axios";

function Statistics({className}) {




    const [stat, setStat] = useState({});
    const [total, setTotal] = useState(0);

    const handelStat = (Statistics) => {
        const {win, draw, loss} = Statistics;
        setTotal(win + draw + loss);
        setStat({win, draw, loss});
    }
    useEffect(() => {
        const fetchmydata = async () => {
            try {
                const res = await axios.get("http://10.12.1.3:8000/api/profile/statistics/");
                handelStat(res.data);
                console.log("Statistics fetchid data with Success: ");
            } catch (error) {
                console.log("Statistics page Failed");
            }
        }
        fetchmydata();
    }, []);
    return (
        <div className={"w-[620px] p-[5px] md:p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262]" + (className ? ` ${className}` : '')}>
            <div className="Title text-[20px] md:text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]"> Statistics</div>
            <div className="flex flex-row text-[#FFFFFF] opacity-80">
                <div className="pl-[35px] basis-1/2">
                    <span className="text-[20px] md:text-[25px] font-[500] font-Outfit">Total : {total ? total : "0"}</span>
                    <ul>
                        <li className="relative wins text-[20px] md:text-[25px] font-[400] font-Outfit">Wins: {stat.win ? stat.win : 0}</li>
                        <li className="relative losses text-[20px] md:text-[25px] font-[400] font-Outfit">Losses: {stat.loss ? stat.loss : 0}</li>
                        <li className="relative draws text-[20px] md:text-[25px] font-[400] font-Outfit">Draws: {stat.draw ? stat.draw : 0}</li>
                    </ul>
                </div>
                <div className="basis-1/2 flex justify-center">
                    <div className={`StatisticsChart w-[150px] bg-white rounded-full h-[150px] md:w-[176.75px] md:h-[179px]`}
                        style={{background: `conic-gradient(
                            #ffcb61 0% calc((${stat.win} / ${total}) * 100%),
                            #A8293F calc(${stat.win} / ${total} * 100%) calc((${total} - ${stat.draw}) / ${total} * 100%),
                            #8374D1 calc((${total} - ${stat.draw}) / ${total} * 100%) 100%)`
                            }}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistics







// function Statistics({className}) {
//     return (
//         <div className={"w-[620px] h-[318px] p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262] mt-[4px] mr-[2px]" + (className ? ` ${className}` : '')}>
//             <div className="Title text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]"> Statistics</div>
//             <div className="flex flex-row text-[#FFFFFF] opacity-80">
//                 <div className="pl-[35px] basis-1/2">
//                     <span className="text-[30px] font-[500] font-Outfit">Total : 14</span>
//                     <ul>
//                         <li className="relative wins text-[25px] font-[400] font-Outfit">Wins: 10</li>
//                         <li className="relative losses text-[25px] font-[400] font-Outfit">Losses: 3</li>
//                         <li className="relative draws text-[25px] font-[400] font-Outfit">Draws: 1</li>
//                     </ul>
//                 </div>
//                 <div className="basis-1/2 flex justify-center">
//                     <div className="StatisticsChart w-[176.75px] bg-white rounded-full md:w-[176.75px] md:h-[179px]">
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }