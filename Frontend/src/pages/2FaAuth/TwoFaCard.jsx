import './css/index.css'

const TwoFaCard = (props) => {
    return (
        <div className={props.bgColor + " w-[300px] h-[300px] self-end mb-[200px] mr-[30px] max-sm:hidden relative rounded-[10px] hover:scale-[1.02] duration-[600ms]"}>
            <img className="absolute top-[-146px]" src={props.image} alt="ping pong game" />
            <div className="h-full flex flex-col justify-end pb-[30px] pl-[20px]">
                <div className="font-bold text-[45px] text-[#29292C]">{props.title}</div>
            </div>
        </div>
    )
}

export default TwoFaCard