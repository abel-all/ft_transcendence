
function ContactCard({ image, text, bgColor, hoverColor, groupHoverColor, type }) {

    return (
        <div className={`cursor-pointer bg-[#273036] ${hoverColor} group h-[70px] w-full max-w-[400px] flex pl-[20px] flex-wrap gap-[20px] items-center rounded-[15px] duration-[600ms]`}>
            <div className={`w-[40px] h-[40px] ${bgColor} ${groupHoverColor} duration-[600ms] flex items-center justify-center rounded-full`}>
                <img className="h-[30px] w-[30px]" src={image} alt={text} />
            </div>
            <div>
                <div className="text-[16px] font-light text-[#fff6f9]" >{text}</div>
                <div className="text-[13px] font-extralight text-[#fff6f9]/70" >{type}</div>
            </div>
        </div>
    )
}

export default ContactCard;
