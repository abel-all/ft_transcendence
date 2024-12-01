import { useState, useEffect } from 'react'
import axios from 'axios'
import FriendListCurrent from './FriendListCurrent'
import FriendListHost from './FriendListHost'
import { useAuth } from '../../../components/Auth'

function FriendsList({ className, UrlUsername }) {
  const [toggle, setToggle] = useState(false)
  const [FriendlistFromSearch, setFriendlistFromSearch] = useState({})

  let TimeToDown
  function handelToglle() {
    setToggle(!toggle)
  }

  const [prop, setProp] = useState('Search')

  function HandelProp(prop) {
    setProp(prop)
  }

  const HandelSearchRequest = (e) => {
    if (TimeToDown) clearTimeout(TimeToDown)

    TimeToDown = setTimeout(() => {
      e.target.value &&
        axios
          .post('http://localhost:8800/api/profile/search/', {
            prefix: e.target.value,
          })
          .then((res) => {
            setFriendlistFromSearch(res.data)
          })
          .catch((err) => {
            if (err.response?.status === 403) {const auth = useAuth(); auth.RefreshToken()}
          })
    }, 500)
  }

  return (
    <>
      {!UrlUsername ? (
        <FriendListCurrent
          toggle={toggle}
          className={className}
          prop={prop}
          HandelProp={HandelProp}
          handelToglle={handelToglle}
          HandelSearchRequest={HandelSearchRequest}
          FriendlistFromSearch={FriendlistFromSearch}
        />
      ) : (
        <FriendListHost className={className} UrlUsername={UrlUsername} />
      )}
    </>
  )
}

export default FriendsList
