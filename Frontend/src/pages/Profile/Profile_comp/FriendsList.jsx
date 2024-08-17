import Friend from '../../../components/Friend'
import AddUser from "../../../assets/imgs/AddUser.svg"
import friendlist from "../../../assets/friendlist.json"
import removefriend from "../../../assets/imgs/remove_friend.svg"
import { useState, useEffect } from 'react'
import userIcon from "../../../assets/imgs/userprofile.svg"
import close from "../../../assets/imgs/close.svg"
import invite from "../../../assets/imgs/panding.svg"
import axios from 'axios'
import List from './List'
import useWebSocket from 'react-use-websocket';
import Alert from '../../../components/Alert'



function FriendsList({className}) {
    const [toggle, setToggle] = useState(false);
    const [FriendlistFromSearch, setFriendlistFromSearch] = useState({});
    const [ShowAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    
    useEffect(() => {

    }, [message, color]);

    const handelShowingAlert = (stats) => {
        setShowAlert(stats);

        const TimeOut = setTimeout(() => {
            setShowAlert(!stats);
            clearTimeout(TimeOut);
        }, 4000);
    }

    const {lastMessage } = useWebSocket('ws://192.168.8.142:8001/', {
        onError: (error) => console.error('WebSocket error:', error),
        shouldReconnect: () => true,
        reconnectInterval: 3000
      });

    useEffect(() => {
        if (lastMessage) {
            handelShowingAlert(true);
            console.log("The message", lastMessage);
            const { type, from, status } = JSON.parse(lastMessage.data);

            if (type == "friendship_request") {
                setMessage(`${from} sent you a friend request`);
                setColor("green");
            }
            
            if (type == "handle_friendship_request") {
                if (status == "rejected") {
                    setMessage(`${from} has rejected your friend request`);
                    setColor("#ff0000");
                }
                else if (status == "accepted") {
                    setMessage(`${from} has accepted your friend request`);
                    setColor("green");
                }
            }
        }
      }, [lastMessage]);


    let TimeToDown;
    function handelToglle() {
        setToggle(!toggle);
    }

    const [prop, setProp] = useState("Search");

    function HandelProp(prop) {
        setProp(prop);
    }

    const HandelSearchRequest = (e) => {
        if (TimeToDown)
            clearTimeout(TimeToDown);

        TimeToDown = setTimeout(() => {
            e.target.value && axios.post('https://fttran.tech/api/profile/search/', {
                username : e.target.value
            }).then ((res) => {
                console.log("message sent : ", res);
                setFriendlistFromSearch(res.data);
            }).catch((err) => {
                console.log("there is an error : ", err);
            });
            console.log(e.target.value);
        }, 500);
    }
    return (
        <>
            {ShowAlert && <Alert message={message} color={color}/>} 
            {toggle && <div className={"relative w-[620px] p-[5px] md:p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262]"  + (className ? ` ${className}` : '')}>
                <div className="Title text-[20px] md:text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]"> {prop} </div>
                <div className='flex fle-row'>
                    <button onClick={handelToglle}>
                            <img className=" top-[20px] right-[18px] absolute w-[25.6px] h-[25.6px]" src={close} alt=''/>
                    </button>
                    <button onClick={() => HandelProp("Search")}>
                            <img className=" top-[20px] right-[58px] absolute w-[25.6px] h-[25.6px]" src={AddUser} alt=''/>
                    </button>
                    <button onClick={() => HandelProp("Blocked Users")}>
                        <img className=" top-[20px] right-[98px] absolute w-[25.6px] h-[25.6px]" src={removefriend} alt=''/>
                    </button>
                    <button onClick={() => HandelProp("Panding Requests")}>
                        <img className=" top-[20px] right-[138px] absolute w-[25.6px] h-[25.6px]" src={userIcon} alt=''/>
                    </button>
                    <button onClick={() => HandelProp("Invetations")}>
                        <img className=" top-[20px] right-[178px] absolute w-[25.6px] h-[25.6px]" src={invite} alt=''/>
                    </button>
                </div>
                <div className="friends-list text-[white] friendsHolder flex flex-col gap-5 h-[254px] overflow-auto">
                    {prop == "Search" &&
                        <>
                            <input onKeyUp={HandelSearchRequest}  className='bg-transparent border-b-[1px] w-[60%] focus-visible:outline-none ' placeholder='Search'/>
                            { <List reason="Search" EndPoint="search" AlreadyDated={FriendlistFromSearch}/> }
                        </>
                    }
                    { prop == "Blocked Users" &&  <List reason="Blocked Users" EndPoint="blocked-friends" /> }
                    { prop == "Panding Requests" && <List reason="Panding Requests" EndPoint="requested-friendships" /> }
                    { prop == "Invetations" && <List reason="Invetations" EndPoint="friendship-requests" /> }                       

                </div>
            </div>}
            {!toggle && <div className={"relative w-[620px] p-[5px] md:p-[25px] bg-[var(--bg-color)] border-[1px] border-[#626262]"  + (className ? ` ${className}` : '')}>
                <div className="Title text-[20px] md:text-[30px] font-[500] font-Outfit  text-[#FFFFFF] opacity-80 block mb-[25px]"> Friends List</div>
                <button onClick={handelToglle}>
                    <img className=" top-[20px] right-[18px] absolute w-[25.6px] h-[25.6px]" src={AddUser} alt=''/>
                </button>
                <div className="friends-list text-[white] friendsHolder flex flex-col gap-5 max-h-[230px] overflow-auto">
                    { <List reason="Friends list" isfriend={true} EndPoint="friends" /> }
                </div>
            </div>}
        </>
    )
}

export default FriendsList