import deef from '../../../assets/imgs/deffe.png'
import "../About.css"


function Content() {
    return (
        <div className="About-Content mx-[35px] flex column rounded-t-lg bg-[#3fadc8] mb-[10px]">
            <div className="AboutFont px-[28px] w-[60%] text-black">
                <h1 className="text-[69px] pb-[18px] font-bold font-Outfit">About Us</h1>
                <h3 className="text-[36px] pb-[18px] font-semibold">Welcome to PING!</h3>
                <p className="text-[16px] font-semibold font-Outfit opacity-60 pb-[29px]">
                    At PING!, we believe that ping pong is more than just a game—it's a passion, a community, and a journey of self-improvement. Our mission is to create a dynamic platform where ping pong enthusiasts of all skill levels can come together, compete, and elevate their game.
                </p>
            </div>
            <div className="deefholder top-[-39px] right-[-79px] relative rotate-16 flex justify-end w-[40%]">
                <img className="absolute" src={deef} alt='' />
            </div>
        </div>
    )
}

export default Content
