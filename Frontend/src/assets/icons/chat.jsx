


function ChatIcon({who, color="#eee"}) {

    let opacity = 1;
    if (who == "ChatIcon")
        opacity = 0.5;
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.7231 26.0593C34.5422 24.2063 34.9972 22.1563 34.9972 20C34.9972 11.7157 28.2821 5 19.9986 5C11.7151 5 5 11.7157 5 20C5 28.2843 11.7151 35 19.9986 35C22.6655 35 25.1699 34.3039 27.3399 33.0834L35 34.9986L33.7231 26.0593Z" stroke={color} strokeOpacity={opacity} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default ChatIcon
