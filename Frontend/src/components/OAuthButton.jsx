import arrowRight from "../assets/imgs/arrow-right.svg"


function OAuthButton(props) {

    const clickHandler = () => {

        if (props.imgTilte === "google")
            window.location.href = "https://accounts.google.com/o/oauth2/auth?client_id=895845289499-jt7kib2t1n5tr6ah3oekfdp6l6i29abm.apps.googleusercontent.com&redirect_uri=https://aennaki.me/api/auth/oauth/google/callback/&response_type=code&scope=email%20profile";
        else
            window.location.href = "https://bit.ly/oAuth42";
    }

    return (
        <div className="bg-[#019F9F] w-full rounded-[15px] shadow-[5px_5px_5px_rgba(0,0,0,0.4)] hover:opacity-90 duration-[600ms]">
            <button onClick={clickHandler} className="py-[8px] px-[20px] group w-full flex justify-between items-center gap-[10px]">
                <div className="w-full flex gap-[13px]">
                    <div className="font-medium text-[18px]">Continue With</div>
                    <img src={props.image} alt={props.imgTilte + " image"} />
                </div>
                <img className="transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-[600ms]" src={arrowRight} />
            </button>
        </div>
    )
}

export default OAuthButton;
