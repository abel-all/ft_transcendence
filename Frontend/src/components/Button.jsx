

function Button({width = "w-full", bgColor = " bg-white", title = "Default title!"}) {
    return (
        <div className={width + bgColor + " border border-black rounded-[15px] shadow-[5px_5px_5px_rgba(0,0,0,0.4)] hover:scale-[1.02] hover:opacity-90 duration-[600ms]"}>
            <button className="py-[8px] font-medium text-[18px] w-full flex justify-center">
                {title}
            </button>
        </div>
    )
}

export default Button;
