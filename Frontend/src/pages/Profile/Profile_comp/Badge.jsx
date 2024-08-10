
import { useEffect , useState} from 'react';
import UserIcon from '../../../assets/imgs/UserIcon.png'
import axios from "axios"

// https://fttran.tech/api/profile/

function Badge() {
    const [data, setData] = useState({});
    
    const handelData = (res) => {
        const {image_url, username, last_name, random_number} = res;
        setData({image_url, username, last_name, random_number});
    }
    useEffect(() => {
        const fetchmydata = async () => {
            try {
                const res = await axios.get("https://fttran.tech/api/profile");
                handelData(res.data);
                console.log("Res:", res);
            } catch (error) {
                console.log("error    -     ", error);
            }
        }
        fetchmydata();
    }, []);

    return (
        <div className="Badge bg-[#15262A] text-center h-[182px] w-full border-x-[1px] border-b-[1px] border-[#626262] flex flex-col items-center">
            <div className="BadgeRank w-[100px] h-[110px] flex flex-col bg-[#cd7f32]">
                <div className='profileImgaeHolder relative top-[-57px] h-[53px]'>
                    <img className="rounded-full w-[107.69px] h-[107.69px] absolute" src={data.image_url ? "https://xsgames.co/randomusers/avatar.php?g=male" : UserIcon} alt=""></img>
                </div>
                <div className='InfoHolder flex flex-col relative top-[13px]'>
                    <span className="Rank text-[16px] text-center font-semibold font-Outfit"> Bronze</span>
                    <span className="Level text-[16px] text-center font-semibold font-Outfit">{data.random_number ? data.random_number : "0"}</span>
                    <span className="trendup-icon-profile"></span>
                </div>
            </div>
                <div className='tranglr realative w-[100px] h-[122px] border-x-[49px] border-x-[#00000000] border-t-[27px]  flex flex-col border-[#cd7f32]'>
                </div>
            <span className='text-[25px] font-normal text-[#d0d4d4] font-Outfit'>{data.username}</span>
        </div>
    )
}

export default Badge