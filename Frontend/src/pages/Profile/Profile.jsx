import Header from '../../components/Header'
import Userbg from './Profile_comp/Userbg'
import Badge from './Profile_comp/Badge'
import Statistics from './Profile_comp/Statistics'
import MatchHistory from './Profile_comp/MatchHistory'
import FriendsList from './Profile_comp/FriendsList'
import ProfileNavBottom from './Profile_comp/ProfileNavBottom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './Profile.css'
import Alert from '../../components/Alert'
import BottomNaveBar from '../../components/BottomNavBar.jsx'

const GetUserFromUrl = () => {
  let url = window.location.href
  var user
  if (url.split('').includes('?')) {
    const Half = url.split('?')[1]
    const Username = Half.split('=')
    if (Username.length == 2 && Username[0] == 'username') user = Username[1]
  }
  return user
}

function Profile() {
  const [data, setData] = useState({})
  const [UrlUsername, setUrlUsername] = useState(GetUserFromUrl())
  const [DataFetched, setDataFetched] = useState(false)

  const handelData = (res) => {
    const { picture, username, background_picture, rank , badge} = res
    setData({ picture, username, background_picture, rank, badge })
  }

  useEffect(() => {
    let url = UrlUsername
      ? `http://localhost:8800/api/profile/data/${UrlUsername}/`
      : 'http://localhost:8800/api/profile/data/'
    const fetchmydata = async () => {
      try {
        const res = await axios.get(`${url}`, {})
        handelData(res.data)
      } catch (error) {}
    }
    fetchmydata()
  }, [])

  return (
    <div className="container mx-auto flex justify-center w-full h-full">
      <div className="w-full">
        <Header title="Profile" activeSection="UserIcon" />
        <Userbg
          UrlUsername={UrlUsername}
          background_picture={data.background_picture}
        />
        <Badge
          username={data.username}
          picture={data.picture}
          rank={data.rank}
          badge={data.badge}
        />
        <div className="w-full flex flex-col mt-[0.5rem] lg:flex-row gap-2">
          <div className="flex flex-col w-full gap-2">
            <Statistics UrlUsername={UrlUsername} className="w-full" />
            <FriendsList
              UrlUsername={UrlUsername}
              className="w-full rounded-none lg:rounded-bl-lg"
            />
          </div>
          <MatchHistory username={data.username} UrlUsername={UrlUsername} className="grow w-full lg:rounded-br-lg lg:rounded-none rounded-b-lg" />
        </div>
        <BottomNaveBar activeSection="UserIcon" />
      </div>
    </div>
  )
}

export default Profile
