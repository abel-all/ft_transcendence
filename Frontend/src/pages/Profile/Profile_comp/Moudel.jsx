import axios from 'axios'
import { useAuth } from '../../../components/Auth';

function Buttn({ toggles, rsn, user, content, friendlist, setfriendlist}) {
  const handelClick = () => {
    if (rsn == 'Block') {
      axios
        .post('http://localhost:8800/api/profile/block-friend/', {
          username: user,
        })
        .then((response) => {
          setfriendlist(friendlist.filter(obj => obj.username != user));
        })
        .catch((error) => {
          if (error.response?.status === 403) {const auth = useAuth(); auth.RefreshToken()}
        })
      } else if (rsn == 'Unblock') {
        axios
        .post('http://localhost:8800/api/profile/unblock-friend/', {
          username: user,
        })
        .then((response) => {
          setfriendlist(friendlist.filter(obj => obj.username != user));
        })
        .catch((error) => {
          if (error.response?.status === 403) {const auth = useAuth(); auth.RefreshToken()}
        })
      } else if (rsn == 'undo') {
        axios
        .post('http://localhost:8800/api/profile/eliminate-friendship-request/', {
          username: user,
        })
        .then((response) => {
          setfriendlist(friendlist.filter(obj => obj.username != user));
        })
        .catch((error) => {
          if (error.response?.status === 403) {const auth = useAuth(); auth.RefreshToken()}
        })
    }
    toggles()
  }
  return (
    <>
      <div
        className="my-[24px] flex justify-center items-center font-[700] mx-[5px] bg-[#e92828] w-[100px] h-[36px] rounded-sm text-white"
        onClick={handelClick}
      >
        <span>{content}</span>
      </div>
    </>
  )
}

function Moudel(Data) {
  return (
    <div className="moudle w-[100%] h-[100%] fixed top-0 left-0 right-0 flex justify-center align-center bottom-0 bg-slate-800/[.73] z-10">
      <div className="w-[100%] h-[100%] absolute" onClick={Data.tggl}></div>
      <div className="content bg-[white] top-[200px] fixed h-[245px] text-black p-[51px] rounded-md">
        <p className="font-[600] text-[19px] text-[red] mb-[20px]">
          {Data.message} {Data.username}?
        </p>
        <div className="flex flex-row justify-center">
          {
            <Buttn
              friendlist={Data.friendlist}
              setfriendlist={Data.setfriendlist}
              content="Yes"
              toggles={Data.tggl}
              rsn={Data.reason}
              user={Data.username}
            />
          }
          {<Buttn content="No" toggles={Data.tggl} />}
        </div>
      </div>
    </div>
  )
}

export default Moudel
