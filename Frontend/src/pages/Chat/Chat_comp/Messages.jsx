import Chat from '../../../assets/Chat.json'

function Messages(Data) {

    return (
        <div className={"" + (Data.className) ? Data.className : ''}>
            {
                Chat.chat.messages.map(chatMessages => {
                    return (
                        <>
                            {chatMessages.sender == "User1" &&
                                <>
                                    <div className='text-white rounded-b-lg rounded-tr-lg bg-[#0A0C0E] w-[70%] lg:w-[450px] m-[10px] p-[20px]'>
                                        {chatMessages.message}
                                    </div>
                                    <span className='text-white text-center opacity-60'> {chatMessages.timestamp}</span>
                                </>
                            }
                            {chatMessages.sender == "User2" &&
                                <>
                                    <div className='text-black self-end rounded-b-lg rounded-tl-lg bg-white w-[70%] lg:w-[450px] m-[10px] p-[20px]'>
                                        {chatMessages.message}
                                    </div>
                                    <span className='text-white text-center opacity-60'> {chatMessages.timestamp}</span>
                                </>
                            }
                        </>
                    )
                })
            }
        </div>
    )
}


export default Messages