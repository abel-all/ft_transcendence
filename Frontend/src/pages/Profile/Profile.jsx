import ProfileNav from './Profile_comp/ProfileNav'
import Userbg from './Profile_comp/Userbg'
import Badge from './Profile_comp/Badge'
import Statistics from './Profile_comp/Statistics'
import MatchHistory from './Profile_comp/MatchHistory'
import FriendsList from './Profile_comp/FriendsList'
import "./Profile.css"



function Profile() {
    return (
        <div className="Profile w-full h-full pb-20 px-5">
            <ProfileNav/>
            <Userbg/>
            <Badge/>
            <div className='flex flex-col md:flex-row gap-2'>
                <div className='flex flex-col w-full gap-2'>
                        <Statistics className="w-full" />
                        <FriendsList className="w-full" />
                </div>
                <MatchHistory className="grow w-full"/>
            </div>
        </div>
    )
} 

export default Profile








//
//
//
//
// 1780 242 -> 13.59 