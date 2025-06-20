import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../../components/Auth'

function Statistics({ className, UrlUsername }) {
  const [Status, setStatus] = useState({})
  const [total, setTotal] = useState(0)

  const handelStat = (Statistics) => {
    const { wins, loses } = Statistics
    setTotal(wins + loses)
    setStatus({ wins, loses })
  }

  useEffect(() => {
    const fetchmydata = async () => {
      try {
        const res = await axios.get(
          `${UrlUsername ? `http://localhost:8800/api/profile/data/${UrlUsername}/`: "http://localhost:8800/api/profile/statistics/"}`,
          { username: UrlUsername }
        )
        handelStat(res.data)
      } catch (error) {
        if (error.response?.status === 403) {const auth = useAuth(); auth.RefreshToken()}
      }
    }
    fetchmydata()
  }, [])

  return (
    <div
      className={
        'w-[620px] p-[5px] md:p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262]' +
        (className ? ` ${className}` : '')
      }
    >
      <div className="Title text-[20px] md:text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]">
        {' '}
        Statistics
      </div>
      <div className="flex flex-row text-[#FFFFFF] opacity-80">
        <div className="pl-[35px] basis-1/2">
          <span className="text-[20px] md:text-[25px] font-[500] font-Outfit">
            Total : {total ? total : '0'}
          </span>
          <ul>
            <li className="relative wins text-[20px] md:text-[25px] font-[400] font-Outfit">
              Wins: {Status.wins ? Status.wins : 0}
            </li>
            <li className="relative losses text-[20px] md:text-[25px] font-[400] font-Outfit">
              Loses: {Status.loses ? Status.loses : 0}
            </li>
            {/* <li className="relative draws text-[20px] md:text-[25px] font-[400] font-Outfit">Draws: {Status.draw ? Status.draw : 0}</li> */}
          </ul>
        </div>
        <div className="basis-1/2 flex justify-center">
          <div
            className={`StatisticsChart w-[150px] bg-white rounded-full h-[150px] md:w-[176.75px] md:h-[179px]`}
            style={{
              background: `conic-gradient(
                            #ffcb61 0% calc((${Status.wins} / ${total}) * 100%),
                            #A8293F calc(${Status.wins} / ${total} * 100%) calc((${total} - 0) / ${total} * 100%),
                            #8374D1 calc((${total} - 0) / ${total} * 100%) 100%)`,
            }}
          ></div>
          <div
            className={`StatisticsChart cercal_effect absolute w-[150px] bg-[#00000000] rounded-full h-[150px] md:w-[176.75px] md:h-[179px]`}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
