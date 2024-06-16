
function FormInput({ height = "h-[58px]", placeHolder, type, handleChange }) {

    const handleInputChange = (e) => {
        const type = e.currentTarget.placeholder;
        const value = e.currentTarget.value;

        handleChange(type, value);
    }

    return (
        <div className={"flex border border-[#626262] bg-transparent w-full " + height}>
            {type === 'textarea' ? (
                <textarea
                    onChange={handleInputChange}
                    className={"bg-transparent outline-none w-full text-[#EEEEEE] text-[16px] p-[15px] duration-70 focus:border focus:border-[#00CEFF] max-h-[200px]"}
                    placeholder={placeHolder}
                    required
                />
            ) : (
                <input
                    onChange={handleInputChange}
                    className="bg-transparent outline-none w-full text-[#EEEEEE] text-[16px] p-[15px] duration-70 focus:border focus:border-[#00CEFF]"
                    placeholder={placeHolder}
                    type={type}
                    required
                />
            )}
        </div>
    )
}

export default FormInput;

