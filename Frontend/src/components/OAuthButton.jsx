import circleArrow from './circleArrow.jsx'

function OAuthButton(props) {
    return (
        <div className="bg-[#FFCA61] w-[364px] border border-black mx-auto rounded-[40px] shadow-[5px_5px_5px_rgba(0,0,0,0.4)] hover:scale-[1.02] hover:opacity-90 duration-[400ms]">
            <button className="button py-[13px] px-[24px] w-full flex justify-between">
                <div className="text-container flex">
                    <div className="font-bold text-base pr-[25px]">Continue With</div>
                    <img src={props.image} alt={props.imgTilte + " image"} />
                </div>
                {circleArrow()}
            </button>
        </div>
    )
}

export default OAuthButton;
