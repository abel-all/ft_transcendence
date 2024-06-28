import { useState } from "react";
import { fieldReGex } from '../pages/Login/variables'


const validateInput = (type, value) => {
    switch (type) {
        case "First Name":
            return fieldReGex.nameReGex.test(value)
        case "Last Name":
            return fieldReGex.nameReGex.test(value)
        case "Username":
            return fieldReGex.usernameReGex.test(value)
        case "Email":
            return fieldReGex.emailReGex.test(value)
        case "Password":
            return fieldReGex.passwordReGex.test(value)
        default:
            return true
    }
}


function FormInput({ height = "h-[58px]", placeHolder, type, handleChange }) {

    const [focusColor, setFocusColor] = useState("focus:border-[#FF0000]")
    const handleInputChange = (e) => {
        const type = e.currentTarget.placeholder;
        const value = e.currentTarget.value;
        if (validateInput(type, value))
            setFocusColor("focus:border-[#00FF00]");
        else
            setFocusColor("focus:border-[#FF0000]");

        handleChange(type, value);
    }

    return (
        <div className={"flex border-[0px] border-[#626262] w-full " + height}>
            {type === 'textarea' ? (
                <textarea
                    onChange={handleInputChange}
                    className={"bg-transparent outline-[0px] bg-white bg-opacity-[2%] w-full text-[#EEEEEE] text-[16px] p-[15px] duration-70 focus:border max-h-[200px] focus:border-[#00FF00]"}
                    placeholder={placeHolder}
                    required
                />
            ) : (
                <input
                    onChange={handleInputChange}
                    className={"m-[0px] outline-[0px] w-full bg-white bg-opacity-[2%] text-[#EEEEEE] text-[16px] p-[15px] duration-70 focus:border " + focusColor}
                    placeholder={placeHolder}
                    type={type}
                    required
                />
            )}
        </div>
    )
}

export default FormInput;

