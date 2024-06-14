import UserIcon from '../../../assets/imgs/UserIcon.png'
import Edit from '../../../assets/imgs/edit.svg'

function Badge() {
    return (
        <div className="Badge relative md:static bg-[#15262A] h-[182px] md:h-[73px] w-full border-x-[1px] mb-[10px] border-b-[1px] border-[#626262] flex flex-col md:flex-row items-center">
            <img className="rounded-full md:ml-[25px] w-[107.69px] h-[107.69px] top-[-57px] absolute md:relative" src={UserIcon} alt=""></img>
            <div className='InfoHolder flex flex-col relative md:mt-[30px] md:static top-[57px]'>
                <span className='text-[25px] ml-[10px] font-normal text-[#d0d4d4] font-Outfit'>Name Name</span>
                <div className='flex flex-row ml-[10px] justify-center md:justify-normal'>
                    <span className="trendup-icon-white"></span>
                    <span className="Rank text-[12px] text-[#FFFFFF] text-center font-semibold font-Outfit"> Bronze</span>
                </div>
                <div className='flex flex-row md:relative md:top-[-220px] md:right-[-341px] bg-[#15262a] justify-center m-auto px-[10px] py-[6px] rounded-full border-[1px] border-solid border-[#626262]'>
                    <span className='px-[2px] font-[500] font-[Outfit] text-[#626262] md:text-white md:opacity-60'>Edit</span>
                    <img className='px-[2px]' src={Edit} alt='' />
                </div>
            </div>
        </div>
    )
}

export default Badge
