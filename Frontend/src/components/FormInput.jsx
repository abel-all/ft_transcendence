
function FormInput(props) {

    return (
        <div className="flex border border-[#626262] bg-transparent w-[364px] h-[58px]">
            <input className="bg-transparent outline-none w-full text-[#EEEEEE] text-[16px] p-[15px] duration-70 focus:border focus:border-[#00CEFF]" placeholder={props.placeHolder} type={props.type} required/>
        </div>
    )
}

export default FormInput;
