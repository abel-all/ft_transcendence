import Header from '../../components/Header'
import Userbg from './Profile_comp/Userbg'
import Badge from './Profile_comp/Badge'
import Statistics from './Profile_comp/Statistics'
import MatchHistory from './Profile_comp/MatchHistory'
import FriendsList from './Profile_comp/FriendsList'
import ProfileNavBottom from './Profile_comp/ProfileNavBottom'
import {useEffect, useState} from "react"
import axios from "axios"
import "./Profile.css"

function Profile() {



    const [User, setUser] = useState("");
    const [data, setData] = useState({});
    const [DataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        let url = window.location.href;

        if (url.split('').includes('?')) {
            const part = url.split('?')[1];

            if (url.split('?').length == 2 && part[0] == "username")
                var user = part.split('=')[1];
            setUser(user);
        }
    }, []);

    console.log(User);

    const handelData = (res) => {
        const {picture, username, background_picture, rank} = res;
        setData({picture, username, background_picture, rank});
    }

    useEffect(() => {
        const fetchmydata = async () => {
            try {
                const res = await axios.get("http://10.11.2.3:8000/api/profile/data/");
                handelData(res.data);
                console.log("Profile Fetched data with success");
            } catch (error) {
                console.log("Profile fetchig data Error");
            }
        }
        fetchmydata();
    }, []);

    return (
        <div className="container mx-auto flex justify-center w-full h-full">
            <div className='w-full'>
                <Header title="Profile" activeSection="UserIcon" />
                <Userbg background_picture={data.background_picture}/>
                <Badge username={data.username} picture={data.picture} rank={data.rank}/>
                <div className='w-full flex flex-col mt-[0.5rem] lg:flex-row gap-2'>
                    <div className='flex flex-col w-full gap-2'>
                            <Statistics className="w-full" />
                            <FriendsList className="w-full rounded-none lg:rounded-bl-lg" />
                    </div>
                    <MatchHistory className="grow w-full lg:rounded-br-lg lg:rounded-none rounded-b-lg"/>
                </div>
                <ProfileNavBottom/>
            </div>
        </div>
    )
} 

export default Profile
