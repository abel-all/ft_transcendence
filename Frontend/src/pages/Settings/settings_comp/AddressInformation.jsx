import { useState } from 'react';


import Edit from '../../../assets/imgs/edit.svg'



function AddressInformation(className) {

    const placeHolder = "bg-transparent focus-visible:outline-0  placeholder:text-[#FFFFFF] placeholder:font-[400] placeholder:font-[Outfit] mt-[5px] mb-[20px]";
    const labelFiled = "text-[#FFFFFF] opacity-60 my-[7px]";
    const DivHolder  = "FiledHolder flex flex-col";

    const [save, setSave] = useState(false);

    function HandelSave() {
        setSave(!save);
    }


    return (
        <div className={"border-[#626262] bg-[#15262a] px-[25px] py-[40px] mb-[120px] border-[1px]" + (className.className ? ` ${className.className}` : '')}>
            <form>
                <div className="flex flex-row justify-between">
                    <div className='font-[600] font-[Outfit]'>Address</div>
                        {!save && <div className='flex flex-row justify-end  px-[10px] py-[3px] rounded-full border-[1px] border-solid border-[#626262]'>
                            <button onClick={HandelSave} className='px-[2px] font-[500] font-[Outfit] text-[#626262]'>Edit</button>
                            <img className='px-[2px]' src={Edit} alt='' />
                        </div> }

                        {save && <div className='flex flex-row justify-end  px-[10px] py-[3px] rounded-full border-[1px] border-solid border-[#e0dada]'>
                            <button type='submit' className='px-[2px] font-[500] font-[Outfit] text-[#d3caca]'>Save</button>
                    </div>}
                </div>
                <div className='CountryCity flex md:justify-between md:flex-row flex-col'>
                    <div className={DivHolder}>
                        <label className={labelFiled}>Country</label>
                        <input className={save ? `${placeHolder}` : `pointer-events-none ${placeHolder}`} type="text" vlaue="Country" placeholder='Morocco'/>
                    </div>
                    <div className={DivHolder}>
                        <label className={labelFiled}>City</label>
                        <input className={save ? `${placeHolder}` : `pointer-events-none ${placeHolder}`} type="text" vlaue="City" placeholder='Oued Zem'/>
                    </div>
                </div>
                <div className='AddressZip flex md:justify-between md:flex-row flex-col'>
                    <div className={DivHolder}>
                        <label className={labelFiled}>Address</label>
                        <input className={save ? `${placeHolder}` : `pointer-events-none ${placeHolder}`} type="text" vlaue="Address" placeholder='Oued Zem in Oued Zem at Oued Zem'/>
                    </div>
                    <div className={DivHolder}>
                        <label className={labelFiled}>Zip Code</label>
                        <input className={save ? `${placeHolder}` : `pointer-events-none ${placeHolder}`} type="text" vlaue="Phone" placeholder='25350'/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddressInformation