import { useState } from "react";
import { fieldReGex } from '../pages/Login/variables'
import usePasswordToggle from "../hooks/usePasswordToggle";


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
        case "Your Message":
            return /^[a-zA-Z0-9\s.,!?'"@#$%^&*()_+={}\[\]:;-]{10,1000}$/.test(value)
        default:
            return true
    }
}


function FormInput({ height = "h-[58px]", placeHolder, type, handleChange }) {

    const [passFocusColor, setPassFocusColor] = useState("focus:border-[#ff0000]");
    const [focusColor, setFocusColor] = useState("");
    const [eyeIcon, inputType] = usePasswordToggle();

    const handleInputChange = (e) => {
        const type = e.currentTarget.placeholder;
        const value = e.currentTarget.value;
        if (validateInput(type, value)) {
            setFocusColor("border border-[#00FF00]");
            setPassFocusColor("focus:border-[#00FF00]");
        }
        else {
            setFocusColor("border border-[#FF0000]");
            setPassFocusColor("focus:border-[#FF0000]");
        }

        handleChange(type, value);
    }

    if (type === "password") {

        return (
            <>
                <div className={`rounded-[15px] w-full bg-white bg-opacity-[3%] duration-70 ${focusColor} p-[15px] flex`}>
                    <input
                        onChange={handleInputChange}
                        className="flex-1 m-[0px] outline-none text-[#eee] bg-transparent"
                        placeholder={placeHolder}
                        type={inputType}
                        onBlur={() => {setFocusColor("")}}
                        onFocus={handleInputChange}
                        required
                    />
                    <div className="cursor-pointer" >{eyeIcon}</div>
                </div>
                {focusColor && <div className='text-center text-[#fff6f9]/60 font-light'>{placeHolder === "Password" ? "Password must have an uppercase letter, a lowercase letter, a number, a special character, and be at least 8 characters long." : ""}</div>}
            </>
        )
    }

    return (
        <div className={"flex w-full " + height}>
            {type === 'textarea' ? (
                <textarea
                    onChange={handleInputChange}
                    className={"rounded-[15px] bg-transparent outline-none bg-white bg-opacity-[3%] w-full text-[#EEEEEE] text-[16px] p-[15px] duration-70 focus:border max-h-[200px] " + passFocusColor}
                    placeholder={placeHolder}
                    required
                />
            ) : (
                <input
                    onChange={handleInputChange}
                    className={"rounded-[15px] m-[0px] outline-none w-full bg-white bg-opacity-[3%] text-[#EEEEEE] text-[16px] p-[15px] duration-70 focus:border " + passFocusColor}
                    placeholder={placeHolder}
                    type={type}
                    required
                />
            )}
        </div>
    )
}

export default FormInput;
