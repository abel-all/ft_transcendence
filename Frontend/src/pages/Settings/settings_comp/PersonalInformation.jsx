import { useEffect, useState } from 'react';
import Edit from '../../../assets/imgs/edit.svg'



function PersonalInformation(className) {

    const [save, setSave] = useState(false);
    const [errors, setErrors] = useState([]);
    const [Firstname, setFirstname] = useState("First Name");
    const [Lastname, setLastname] = useState("Last Name");
    const [Email, setEmail] = useState("Email Address");
    const [Phone, setPhone] = useState("Phone");

    function HandelSave() {
        setSave(!save);
    }

    const handelErrors = (str) => {
        if (!errors.includes(str))
            setErrors(prevErrors => [...prevErrors, str]);
    }

    const removeErrors = (str) => {
        if (errors.includes(str))
            setErrors(errors.filter(item => item !== str));
    }
    
    const FNfiled = (e, str) => {
        e.preventDefault();
        str == "FN" && setFirstname(e.target.value);
        str == "LN" && setLastname(e.target.value);
        str == "EM" && setEmail(e.target.value);
        str == "PH" && setPhone(e.target.value);
    }

    const HandelSubmet = (e) => {
        e.preventDefault();
        const NamesRegix = /^[a-zA-Z]+$/;
        const EmailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const PhoneRegix = /^\+?[1-9]\d{1,14}$/;
        if (!NamesRegix.test(Firstname))
            handelErrors("FN")
        else {
            removeErrors("FN");
            if (!NamesRegix.test(Lastname))
                handelErrors("LN")
            else {
                removeErrors("LN");
                if (!EmailRegix.test(Email))
                    handelErrors("EM")
                else {
                    removeErrors("EM");
                    if (!PhoneRegix.test(Phone))
                        handelErrors("PH")
                    else {
                        removeErrors("PH");
                        console.log("All Is Right Ready To Send ");
                    }
                }
            }
        }
    }

    const placeHolder = `bg-transparent focus-visible:outline-0 border-b-[1px] border-transparent pb-[5px] pl-[4px] placeholder:text-[#FFFFFF] placeholder:font-[400] placeholder:font-[Outfit] mt-[5px] mb-[20px]`;
    const Error       = `border-rose-600`;
    const labelFiled = "text-[#FFFFFF] opacity-60 my-[7px]";
    const DivHolder  = "FiledHolder flex flex-col";

    return (
        <div className={"border-[#626262] bg-[#15262a] px-[25px] py-[40px] mb-[10px] border-[1px]" + (className.className ? ` ${className.className}` : '')}>
            <form action='' method='POST'>
                <div className="flex flex-row justify-between">
                    <div className='font-[600] font-[Outfit]'>Personal Information</div>
                    {!save && <div className='flex flex-row justify-end  px-[10px] py-[3px] rounded-full border-[1px] border-solid border-[#626262]'>
                        <button onClick={HandelSave} className='px-[2px] font-[500] font-[Outfit] text-[#626262]'>Edit</button>
                        <img className='px-[2px]' src={Edit} alt='' />
                    </div> }

                    {save && <div className='flex flex-row justify-end  px-[10px] py-[3px] rounded-full border-[1px] border-solid border-[#e0dada]'>
                        <button onClick={HandelSubmet} className='px-[2px] font-[500] font-[Outfit] text-[#d3caca]'>Save</button>
                    </div>}

                </div>
                <div className='FullnameHolder flex flex-col  md:justify-between md:flex-row'>
                    <div className={DivHolder}>
                        <label className={labelFiled}>First Name</label>
                        <input className={ (save) ? (errors.includes("FN")) ? `${placeHolder} ${Error}` : `${placeHolder}`  : `pointer-events-none ${placeHolder}` }
                            onChange={(e) => {FNfiled(e, "FN")}}
                            type="text" name="FirstName" vlaue={Firstname} placeholder='Fisrt Name'/>
                    </div>
                    <div className={DivHolder}>
                        <label className={labelFiled}>Last Name</label>
                        <input className={ (save) ? (errors.includes("LN")) ? `${placeHolder} ${Error}` : `${placeHolder}`  : `pointer-events-none ${placeHolder}` }
                            onChange={(e) => {FNfiled(e, "LN")}}
                            type="text" id="LastName" vlaue={Lastname} placeholder='Last name'/>
                    </div>
                </div>
                <div className='ContacInfo flex flex-col md:justify-between md:flex-row'>
                    <div className={DivHolder}>
                        <label className={labelFiled}>Email Address</label>
                        <input className={ (save) ? (errors.includes("EM")) ? `${placeHolder} ${Error}` : `${placeHolder}`  : `pointer-events-none ${placeHolder}` }
                            onChange={(e) => {FNfiled(e, "EM")}}
                            type="text" id="EmailAddress" vlaue={Email} placeholder='Email@email.com'/>
                    </div>
                    <div className={DivHolder}>
                        <label className={labelFiled}>Phone</label>
                        <input className={ (save) ? (errors.includes("PH")) ? `${placeHolder} ${Error}` : `${placeHolder}`  : `pointer-events-none ${placeHolder}` }
                            onChange={(e) => {FNfiled(e, "PH")}}
                            type="text" id="Phone" vlaue={Phone} placeholder='+2120600000000'/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PersonalInformation