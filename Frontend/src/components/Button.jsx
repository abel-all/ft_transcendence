import circleArrow from './circleArrow.jsx'


function Button(props) {
    return (
        <div className={props.width + " bg-white border border-black mx-auto rounded-[40px] shadow-[5px_5px_5px_rgba(0,0,0,0.4)] hover:scale-[1.02] hover:opacity-90 duration-[400ms]"}>
            <button className="py-[13px] px-[24px] w-full flex justify-between">
                <div className="font-bold text-base">{props.title}</div>
                {circleArrow()}
            </button>
        </div>
    )
}

export default Button;
