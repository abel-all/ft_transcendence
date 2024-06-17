

function Card(props) {

    return (
        <div className={props.bgColor + " flex-1 px-[30px] pt-[10px] hover:scale-[1.03] duration-[400ms] shadow-[10px_10px_10px_rgba(0,0,0,0.4)] " + props.rounded}>
            <div className="text-white font-bold mb-[27px]">{props.title}</div>
            <div className="font-semibold text-[35px]">
                {props.description}
            </div>
            <div className="w-full flex justify-end">
                <img src={props.image} alt="play oing pong game" />
            </div>
        </div>
    )
}

export default Card;
