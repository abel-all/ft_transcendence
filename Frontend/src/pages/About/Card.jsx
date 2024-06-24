

function Card(props) {

    return (
        <div className={props.bgColor + ' hover:scale-[1.03] duration-[600ms] shadow-[10px_10px_10px_rgba(0,0,0,0.8)] rounded-[5px] flex flex-col flex-1 items-center px-[10px] py-[20px] justify-between h-[561px]'}>
            <div className="font-bold text-[30px] text-center">
                {props.title}
            </div>
            <img src={props.image} alt="ping pong website" />
            <div className="text-center min-w-[195px] px-[10px]">
                {props.description}
            </div>
        </div>
    )
}

export default Card;
