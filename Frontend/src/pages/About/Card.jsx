

function Card(props) {

    return (
        <div className='bg-gradient-to-t from-[#161c20] to-[#273036] hover:scale-[1.03] duration-[600ms] shadow-[10px_10px_10px_rgba(0,0,0,0.8)] rounded-[15px] flex flex-col flex-1 items-center px-[10px] py-[20px] justify-between'>
            <div className="text-[#cfcfcf] font-bold text-[30px] text-center">
                {props.title}
            </div>
            <img src={props.image} alt="ping pong website" />
        </div>
    )
}

export default Card;
