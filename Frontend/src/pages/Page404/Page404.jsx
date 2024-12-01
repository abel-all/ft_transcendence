import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import textFile from '../../assets/data/404BaseImage.txt'
import { twMerge } from "tailwind-merge";


function Page404() {
    const navigate = useNavigate();
    const [countDown, setCountDown] = useState(5);


    const timer = setInterval(() => {
        if (countDown <= 0) {
            clearInterval(timer);
            navigate("/");
        }else {
            setCountDown(countDown - 1);
        }
    }, 1000);
    
    return (
        <>
            <div className={twMerge(" h-screen ")}>
                <div className="relative z-2 bg-black bg-opacity-10 h-screen text-[60px] py-[250px] text-center text-white">
                    Got lost ?
                    <div className="flex text-[30px] p-[25px] items-center mt-[200px] justify-center ">
                        <Link className="block center rounded-full bg-white text-black py-[10px] px-[50px]" to="/"> {`Take me home before : ${countDown}s`}</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
{/* <div ref={Canv} className={twMerge(" h-screen bg-repeat")} style={{ backgroundImage: `url('data:image/jpeg;base64,${readText}')` }}> */}

export default Page404