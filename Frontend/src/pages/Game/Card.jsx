

function Card(props) {

    return (
        <div className={props.bgColor + " w-[300px] max-sm:w-full h-[360px] relative rounded-[10px] hover:scale-[1.02] duration-[600ms]"}>
            <img className="absolute top-[-146px]" src={props.image} alt="ping pong game" />
            <div className="h-full flex flex-col justify-end pb-[30px] pl-[20px]">
                <div className="font-bold text-[45px] text-[#29292C]">{props.title}</div>
                <div className="font-medium opacity-80 text-[#29292C]">{props.description}</div>
            </div>
        </div>
    )
}

export default Card;
