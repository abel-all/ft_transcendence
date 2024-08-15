import arrowRight from "../assets/imgs/arrow-right.svg"

function Button({width = "w-full", bgColor = " bg-white", title = "Default title!"}) {
    return (
        <div className={`${width}  ${bgColor} border border-black rounded-[15px] shadow-[5px_5px_5px_rgba(0,0,0,0.4)] hover:opacity-90 duration-[600ms]`}>
            <button className="py-[8px] px-[20px] group duration-[600ms] font-medium text-[18px] w-full flex justify-between items-center gap-[10px]">
                <div className="duration-[600ms]">
                    {title}
                </div>
                <img className="transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-[600ms]" src={arrowRight} />
            </button>
        </div>
    )
}

export default Button;
