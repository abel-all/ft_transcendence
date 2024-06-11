
function FormInput(props) {

    const handleInputChange = (e) => {
        const type = e.currentTarget.placeholder;
        const value = e.currentTarget.value;

        props.handleChange(type, value);
    }

    return (
        <div className="flex border border-[#626262] bg-transparent w-full h-[58px]">
            <input onChange={handleInputChange} className="bg-transparent outline-none w-full text-[#EEEEEE] text-[16px] p-[15px] duration-70 focus:border focus:border-[#00CEFF]" placeholder={props.placeHolder} type={props.type} required/>
        </div>
    )
}

export default FormInput;
