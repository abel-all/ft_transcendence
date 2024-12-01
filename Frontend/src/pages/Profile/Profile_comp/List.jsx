import { useState, useEffect } from 'react'
import friendlistTest from '../../../assets/friendlist.json'
import Friend from '../../../components/Friend'
import axios from 'axios'
import { useAuth } from '../../../components/Auth';

function List({ reason, EndPoint, AlreadyDated, isfriend } = data) {
  const [friendlist, setfriendlist] = useState(AlreadyDated);

  useEffect(() => {
    if (!friendlist) {
      const fetchmydata = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8800/api/profile/${EndPoint}/`
          )
          setfriendlist(res.data)
        } catch (error) {
          if (error.response?.status === 403) {const auth = useAuth(); auth.RefreshToken()}
        }
      }
      fetchmydata()
    } else setfriendlist(AlreadyDated)
  }, [AlreadyDated])

  return (
    <>
      {Array.isArray(friendlist) && friendlist.length > 0 ? (
        friendlist.map((friends, index) => {
          return (
            <div key={index} className="relative friend flex items-center justify-between h-[57px] px-2  bg-[#2d3c3f] rounded-full border-[1px] border-[#000000] sm:mr-5">
              <Friend
                username={friends.username}
                picture={friends.picture}
                status={friends.is_online}
                rank={friends.rank}
                reason={reason}
                isFriend={true}
                friendlist={friendlist}
                setfriendlist={setfriendlist}
              />
            </div>
          )
        })
      ) : (
        <div className="NoData flex items-center h-full text[20px] font[oblique] font[500] justify-center text-white">
          No Data To Fetch !
        </div>
      )}
    </>
  )
}

export default List
