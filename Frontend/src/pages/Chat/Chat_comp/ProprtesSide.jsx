import { useState } from "react"
import Search from "../../../assets/imgs/search.svg"
import BoxInboxUsers from "./BoxInboxUsers"
import BoxSearch from "./BoxSearch";
import {useContext} from 'react'
import {chatHeaderOnClick} from '../Chat'

function ProprtesSide({VoidedUsername, className}) {

    let styleSearch;

    const [input, setInput] = useState("");
    function handelchange(e) {
        setInput(e.target.value);
    }

    const ChatContext = useContext(chatHeaderOnClick);

    if (input)
        styleSearch = "SearchInpute h-[60px] p-[18px] focus-visible:outline-0 text-[white]  w-full  text-[16px] bg-[#2d353a] border-y-[1px] border-[#626262]";
    else
        styleSearch = "SearchInpute p-[18px] focus-visible:outline-0 text-[white] rounded-full w-full blur-none text-[16px] bg-transparent border-[1px] border-[#626262]";

    return (
        <div className={" " + (className) ? className : ``}>
            <div className="SearchInpute relative my-[5px] mt-[15px]">
                <input 
                    className={styleSearch}
                    onChange={handelchange}
                    type="text" placeholder="Search" />
                <img src={Search} className="w-[37px] h-[37px] cursor-pointer absolute top-[12px] opacity-50 right-[17px]" alt=""/>
            </div>
            { (!input) ? <BoxInboxUsers VoidedUsername={VoidedUsername} lastMessage={ChatContext.lastMessage}/> : <BoxSearch data= {input} />}
        </div>
    )
}

export default ProprtesSide