import circleArrow from './circleArrow.jsx'


function Button({width = "w-full", bgColor = " bg-white", title = "Default title!"}) {
    return (
        <div className={width + bgColor + " border border-black rounded-[40px] shadow-[5px_5px_5px_rgba(0,0,0,0.4)] hover:scale-[1.02] hover:opacity-90 duration-[600ms]"}>
            <button className="py-[13px] px-[24px] w-full flex justify-between">
                <div className="font-bold text-base">{title}</div>
                {circleArrow()}
            </button>
        </div>
    )
}

export default Button;
