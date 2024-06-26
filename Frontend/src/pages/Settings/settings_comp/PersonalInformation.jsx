import { useState } from 'react';
import Edit from '../../../assets/imgs/edit.svg'



function PersonalInformation(className) {

    const placeHolder = "bg-transparent focus-visible:outline-0 placeholder:text-[#FFFFFF] placeholder:font-[400] placeholder:font-[Outfit] mt-[5px] mb-[20px]";
    const labelFiled = "text-[#FFFFFF] opacity-60 my-[7px]";
    const DivHolder  = "FiledHolder flex flex-col";

    const [save, setSave] = useState(false);

    function HandelSave() {
        setSave(!save);
    }

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
                        <button type='submit' className='px-[2px] font-[500] font-[Outfit] text-[#d3caca]'>Save</button>
                    </div>}

                </div>
                <div className='FullnameHolder flex flex-col  md:justify-between md:flex-row'>
                    <div className={DivHolder}>
                        <label className={labelFiled}>First Name</label>
                        <input className={placeHolder} type="text" vlaue="FirstName" placeholder='Fisrt Name'/>
                    </div>
                    <div className={DivHolder}>
                        <label className={labelFiled}>Last Name</label>
                        <input className={placeHolder} type="text" vlaue="LastName" placeholder='Last name'/>
                    </div>
                </div>
                <div className='ContacInfo flex flex-col md:justify-between md:flex-row'>
                    <div className={DivHolder}>
                        <label className={labelFiled}>Email Address</label>
                        <input className={placeHolder} type="text" vlaue="EmailAddress" placeholder='Email@email.com'/>
                    </div>
                    <div className={DivHolder}>
                        <label className={labelFiled}>Phone</label>
                        <input className={placeHolder} type="text" vlaue="Phone" placeholder='+2120600000000'/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PersonalInformation