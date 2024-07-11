import circleArrow from './circleArrow.jsx'


function OAuthButton(props) {

    const clickHandler = () => {

        if (props.imgTilte === "google")
            window.location.href = "https://bit.ly/oAuth-google";
        else
            window.location.href = "https://bit.ly/oAuth42";
    }

    return (
        <div className="bg-[#FFCA61] w-full border border-black rounded-[40px] shadow-[5px_5px_5px_rgba(0,0,0,0.4)] hover:scale-[1.02] hover:opacity-90 duration-[600ms]">
            <button onClick={clickHandler} className="py-[13px] px-[24px] w-full flex justify-between">
                <div className="w-full flex">
                    <div className="font-bold pr-[25px]">Continue With</div>
                    <img src={props.image} alt={props.imgTilte + " image"} />
                </div>
                {circleArrow()}
            </button>
        </div>
    )
}

export default OAuthButton;
