import { useState } from "react"
import Search from "../../../assets/imgs/search.svg"
import BoxInboxUsers from "./BoxInboxUsers"
import BoxSearch from "./BoxSearch";
import {useContext} from 'react'
import {chatHeaderOnClick} from '../Chat'

function ProprtesSide({VoidedUsername, className}) {

    let styleSearch;

    const ChatContext = useContext(chatHeaderOnClick);

    styleSearch = "SearchInpute p-[18px] focus-visible:outline-0 text-[white] rounded-full w-full blur-none text-[16px] bg-transparent border-[1px] border-[#626262]";

    return (
        <div className={" " + (className) ? className : ``}>
            <BoxInboxUsers VoidedUsername={VoidedUsername} lastMessage={ChatContext.lastMessage} lMUS={ChatContext.lastMessageUserSend}/>
        </div>
    )
}

export default ProprtesSide