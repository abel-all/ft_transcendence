import user001 from '../../../assets/users/user (5).png'
import playGame from '../../../assets/imgs/playGame.svg'
import addFriend from '../../../assets/imgs/addFriend.svg'


function UserSearch() {
    return (
        <div className="SearchUser flex flex-row px-[10px] mt-[15px]">
            <div className='imageStatusHolder '>
                <img className=" w-[53.85px] h-[53.85px] rounded-full" src={user001} alt=""/>
                <span className='ActiveStatus'></span>
            </div>
            <div className='ml-[7px] flex flex-col py-[3px]'>
                <div className='text-white '>HelloIamuser</div>
                <div className='flex flex-row justify-start'>
                    <span className='trendup-icon pt-[5px] mr-[5px]'></span>
                    <span className='text-white text-[12px] font-[500] font-[Outfit] pt-[4px] opacity-60'> 526</span>
                </div>
            </div>
            <div className='Spaces grow'></div>
            <div className='PlayWithPlayer  ml-[7px]'>
                <img className='pt-[10px] opacity-80 mx-[px]' src={playGame} alt=''/>
            </div>
            <div className='AddFriend ml-[7px] '>
                <img className='pt-[10px] opacity-80 mx-[px]' src={addFriend} alt=''/>
            </div>
        </div>
    )
}

export default UserSearch