import Chat from '../../../assets/Chat.json'
import seen from '../../../assets/imgs/chat/seen.svg'
import notseen from '../../../assets/imgs/chat/notyet.svg'
function Messages(Data) {

    let userStyle;
    return (
        <div className={"" + (Data.className) ? Data.className : ''}>
            {
                Chat.chat.messages.map(chatMessages => {
                    {(chatMessages.sender == "User1") ? userStyle = "text-white bg-[#0A0C0E] rounded-tr-lg " : userStyle = "text-black bg-white self-end rounded-tl-lg "}
                    return (
                        <div key={chatMessages.message_id} className={userStyle + 'relative flex rounded-b-lg w-[70%] lg:w-[450px] m-[10px] p-[20px]'}>
                            <p className='pb-[15px]'>{chatMessages.message}</p>
                            {(chatMessages.sender == "User2") ?
                                <>
                                    <span className='absolute right-[45px] bottom-[5px]'>{chatMessages.timestamp}</span>
                                    <img src={chatMessages.seen ? seen : notseen} alt='' className='absolute right-[15px] bottom-[5px]'/>
                                </>
                                : 
                                    <span className='absolute right-[15px] bottom-[5px]'>{chatMessages.timestamp}</span>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}


export default Messages