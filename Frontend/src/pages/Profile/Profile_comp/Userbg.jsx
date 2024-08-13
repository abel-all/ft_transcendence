import { Link } from "react-router-dom"
import userbg from "../../../assets/imgs/userbg.png"
import { useState , useEffect} from "react"

function Userbg() {

    const [bgUrl, setBgUrl] = useState("");

    const HandelBg = (BgUrlFetched) => {
        const {BackGroundUrl} = BgUrlFetched;
        setBgUrl(BackGroundUrl);
    }

    useEffect(() => {
        const fetchmydata = async () => {
            try {
                const res = await axios.get("https://random-data-api.com/api/v3/projects/d415ba10-ec54-4553-81c6-971fe1cb0791?api_key=jN6feYkT1a1AWYKvl96EkA");
                HandelBg(res.data);
                console.log("statics:", res);
            } catch (error) {
                console.log("Static error    -     ", error);
            }
        }
        fetchmydata();
    }, []);

    return (
        <div className="userbgHolder mt-[101px] relative">
            <div className={`rounded-t-lg bg-cover bg-center bg-[url('${bgUrl ? bgUrl : "src/assets/imgs/userbg.png"}')] h-[182px] w-full`} ></div>
            <Link to="/settings">
                <div className="Btn-dec flex flex-row justify-around bg-[#15262A]  opacity-90 font-Outfit rounded-full top-[3px] right-[6px] absolute w-[153px] h-[42px] ">
                    <button className="btn-editProfile text-[16px]  text-[#EEEEEE] font-medium">Edit profile</button>
                    <div className="divDico"></div>
                </div>
            </Link>
        </div>
    )
}

export default Userbg
