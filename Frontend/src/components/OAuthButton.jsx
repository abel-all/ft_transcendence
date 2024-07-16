


function OAuthButton(props) {

    const clickHandler = () => {

        if (props.imgTilte === "google")
            window.location.href = "https://bit.ly/oAuth-google";
        else
            window.location.href = "https://bit.ly/oAuth42";
    }

    return (
        <div className="bg-[#019F9F] w-full rounded-[15px] shadow-[5px_5px_5px_rgba(0,0,0,0.4)] hover:scale-[1.02] hover:opacity-90 duration-[600ms]">
            <button onClick={clickHandler} className="py-[8px] w-full flex">
                <div className="w-full flex justify-center gap-[13px]">
                    <div className="font-medium text-[18px]">Continue With</div>
                    <img src={props.image} alt={props.imgTilte + " image"} />
                </div>
            </button>
        </div>
    )
}

export default OAuthButton;
