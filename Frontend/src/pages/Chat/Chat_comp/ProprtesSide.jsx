import { useState } from "react"
import Search from "../../../assets/imgs/search.svg"
import BoxInboxUsers from "./BoxInboxUsers"
import BoxSearch from "./BoxSearch";


function ProprtesSide(Data) {

    let styleSearch;

    const [input, setInput] = useState("");
    function handelchange(e) {
        setInput(e.target.value);
    }

    function whichShouldShowen() {
        if(!input)
            return <BoxInboxUsers/>;
        return <BoxSearch data= {input} />;
    }

    if (input)
        styleSearch = "SearchInpute p-[25px] focus-visible:outline-0 text-[white]  w-full  text-[16px] bg-[#2d353a] border-y-[1px] border-[#626262]";
    else
        styleSearch = "SearchInpute p-[25px] focus-visible:outline-0 text-[white] rounded-full w-full blur-none text-[16px] bg-transparent border-[1px] border-[#626262]";

    return (
        <div className={" " + (Data.className) ? Data.className : ``}>
            <div className="SearchInpute relative my-[5px]">
                <input 
                    className={styleSearch}
                    onChange={handelchange}
                    type="text" placeholder="Search" />
                <img src={Search} className="w-[37px] h-[37px] cursor-pointer absolute top-[17px] opacity-50 right-[17px]" alt=""/>
            </div>
            {whichShouldShowen()}
        </div>
    )
}

export default ProprtesSide