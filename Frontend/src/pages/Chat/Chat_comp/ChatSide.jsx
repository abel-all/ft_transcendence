import ChatComp from "./ChatComp"

function ChatSide(Data) {
    return (
        <div className={" " + (Data.className) ? Data.className : ``}>
            <ChatComp />
        </div>
    )
}

export default ChatSide