
function ContactCard(props) {

    return (
        <div className="sm:bg-gradient-to-t sm:from-[#161c20] sm:to-[#273036] h-[150px] w-full max-w-[460px] flex flex-col justify-center items-center rounded-[15px] hover:scale-[1.05] duration-[600ms]">
            <img className="h-[50px] w-[50px]" src={props.image} alt={props.text} />
            <div className="text-[16px] font-semibold text-white">{props.text}</div>
        </div>
    )
}

export default ContactCard;
