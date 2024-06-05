import logo from "../../../assets/logo.png"
import React, { useState } from 'react';


function Fields (Data) {
    const [Value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    if (Data.element == "textaria") {
        return (
            <textarea
            className={Data.classes}
            value={Value}
            onChange={handleChange}
            placeholder={Data.placeholder}/>
        );
    }
    else {
        return (
            <input
            className={Data.classes}
            type={Data.type}
            value={Value}
            onChange={handleChange}
            placeholder={Data.placeholder}/>
        );
    }
}


function Fileds() {
    return (
        <div className="Fileds pb-[20px] bg-liner-filed border-[1px] border-solid border-[#626262] flex text-center items-center flex-col mx-auto w-[481px]	rounded-md">
            <img className="w-[120px] h-[120px]" src={logo} alt=""/>
            <h1 className="mt-[20px] mb-[40px] text-white text-[36px] Inter font-bold ">Contact Us</h1>
            <form className="px-[25px] w-full text-white" action="done.php" method="post">
                <Fields
                    placeholder = "Username"
                    type = "text"
                    classes = "Usernameinpute mb-[22px] w-full h-[45px] p-[25px] bg-transparent block border-[1px] border-solid border-[#626262] rounded-md "
                />
                <label className="usernamelabel relative m-[-16px] w-[91px] right-[-30px] bg-[#002e47] text-[#9da3af] top-[-76px] p-[5px] border-solid border-[1px] border-[#626262]">
                    Username
                </label>
                <Fields
                    placeholder = "email"
                    type = "text"
                    classes = "emailinpute  mb-[22px] w-full h-[45px] p-[25px] bg-transparent block border-[1px] border-solid border-[#626262] rounded-md"
                />
                <label className="emaillabel relative right-[-30px] m-[-16px] w-[91px] bg-[#002e47] text-[#9da3af] top-[-77px] p-[5px] border-solid border-[1px] border-[#626262]">
                    Email
                </label>
                <Fields
                    element = "textaria"
                    placeholder = "Your Message"
                    classes = "h-[250px] w-full p-[25px] bg-transparent block border-[1px] border-solid border-[#626262] rounded-md mb-[15px]"
                />


                <div className="p-[7px] h-[40px] mb-[20px] text-right pl-[14px] bg-[#EEEEEE] 
                    flex-row flex text-[#000000] text-[16px] font-bold string rounded-full w-full">
                    <span className="w-2/4 text-left ">Send Message </span>
                    <button className="btn-sub w-[30px] h-[30px] bg-[#219EBC] ml-[39%] rounded-full" type="submit" value="" />
                </div>
            </form>
        </div>
    )
}

export default Fileds


// position: relative;
// right: 156px;
// background: #002e47;
// color: #9da3af;
// top: 12px;
// padding: 5px;
// border: 1px solid #626262;