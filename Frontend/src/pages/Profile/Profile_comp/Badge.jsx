import { twMerge } from 'tailwind-merge';
import UserIcon from '../../../assets/imgs/UserIcon.png'


// Bronze (0 to 200) -> (#CD7F32)
// Silver (201 to 400) -> (#C0C0C0)
// Gold (401 to 600) -> (#FFD700)
// Platinum (601 to 800) -> (#A0B2C6)
// Diamond (801 to 1000) -> (#B9F2FF)
// Heroic (1001 to 1200) -> (#CB3401)
// Grand Master (1201 -) -> (#FF0000)


const Badge = ({username, picture, rank, badge}) => {

    const Colors = new Map([
        ["BRONZE", "#CD7F32"],
        ["SILVER", "#C0C0C0"],
        ["GOLD", "#FFD700"],
        ["PLATINUM", "#A0B2C6"],
        ["DIAMOND", "#B9F2FF"],
        ["HEROIC", "#CB3401"],
        ["GRAND MASTER", "#FF0000"],
    ]);

    return (
        <div className="Badge bg-[#15262A] text-center h-[182px] w-full border-x-[1px] border-b-[1px] border-[#626262] flex flex-col items-center">
            <div
                style={{backgroundColor: Colors.get(badge) ? Colors.get(badge) : "#CD7F32"}} 
                className={twMerge(`BadgeRank w-[100px] h-[110px] flex flex-col`)}>
                <div className='profileImgaeHolder relative top-[-57px] h-[53px]'>
                    <img className="rounded-full w-[107.69px] h-[107.69px] absolute" src={picture ?
                        `http://localhost:9001/api/v1/buckets/img-cache/objects/download?preview=true&prefix=${picture.split("/")[picture.split("/").length - 1]}&version_id=null`
                        : UserIcon} alt=""></img>
                </div>
                <div className='InfoHolder flex flex-col relative top-[13px]'>
                    <span className="Rank text-[16px] text-center font-semibold font-Outfit"> {badge}</span>
                    <span className="Level text-[16px] text-center font-semibold font-Outfit">{rank ? rank : "0"}</span>
                    <span className="trendup-icon-profile"></span>
                </div>
            </div>
                <div
                    style={{
                        borderLeftColor: "#00000000",
                        borderRightColor: "#00000000",
                        borderTopColor: Colors.get(badge) ? Colors.get(badge) : "#CD7F32"
                    }}
                    className={twMerge(`tranglr realative w-[100px] h-[122px] border-x-[49px] border-t-[27px]  flex flex-col`)}></div>
            <span className='text-[25px] font-normal text-[#d0d4d4] font-Outfit'>{username}</span>
        </div>
    )
}

export default Badge