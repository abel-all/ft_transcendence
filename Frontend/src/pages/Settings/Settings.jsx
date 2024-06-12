import ProfileNav from './Profile_comp/ProfileNav'
import Userbg from './Profile_comp/Userbg'
import Badge from './Profile_comp/Badge'
import Statistics from './Profile_comp/Statistics'
import MatchHistory from './Profile_comp/MatchHistory'
import FriendsList from './Profile_comp/FriendsList'
import ProfileNavBottom from './Profile_comp/ProfileNavBottom'
import "./Profile.css"



function Profile() {
    return (
        <div className="container mx-auto flex justify-center w-full h-full">
            <div className='w-full'>
                <ProfileNav/>
                <Userbg/>
                <Badge/>
                <div className='w-full flex flex-col lg:flex-row gap-2'>
                    <div className='flex flex-col w-full gap-2'>
                            <Statistics className="w-full" />
                            <FriendsList className="w-full" />
                    </div>
                    <MatchHistory className="grow w-full"/>
                </div>
                <ProfileNavBottom/>
            </div>
        </div>
    )
} 