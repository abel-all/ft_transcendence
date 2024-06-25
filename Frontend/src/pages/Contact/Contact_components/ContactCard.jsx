
function ContactCard(props) {

    return (
        <div className="border border-[#626262] bg-[#162A29] h-[150px] w-[250px] flex flex-col justify-center rounded-[15px] pl-[15px] gap-[10px] py-[10px] hover:scale-[1.05] duration-[600ms]">
            <img className="h-[50px] w-[50px]" src={props.image} alt={props.text} />
            <div className="text-[16px] font-semibold text-white">{props.text}</div>
        </div>
    )
}

export default ContactCard;
