
import UserIcon from '../../../assets/imgs/UserIcon.png'

function Badge() {
    return (
        <div className="Badge bg-[#15262A] text-center h-[182px] w-[1245px] border-x-1 border-b-1 border-[#626262]">
            <div className="BadgeRank w-[100px] h-[138px] flex flex-row">
                <img className="rounded-full w-[107.69px] h-[107.69px]" src={UserIcon} alt=""></img>
                <span className="Rank text-[16px] text-center font-semibold font-Outfit"> Bronze</span>
                <span className="Level text-[16px] text-center font-semibold font-Outfit">95</span>
                <span className="Chart"></span>
            </div>
            <span>Name Name</span>
        </div>
    )
}

export default Badge