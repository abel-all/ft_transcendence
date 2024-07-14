import Header from '../../components/Header'
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
                <Header title="Profile" activeSection="UserIcon" />
                <Userbg/>
                <Badge/>
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
