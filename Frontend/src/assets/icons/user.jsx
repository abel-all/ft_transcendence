


function UserIcon({who, color="#eee"}) {

    let opacity = 1;
    if (who == "UserIcon")
        opacity = 0.5;
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 34.1874C4 27.8948 9.25714 22.7936 20 22.7936C30.7429 22.7936 36 27.8948 36 34.1874C36 35.1885 35.2696 36 34.3686 36H5.63137C4.73039 36 4 35.1885 4 34.1874Z" stroke={color} strokeOpacity={opacity} strokeWidth="3" />
            <path d="M26 10C26 13.3137 23.3137 16 20 16C16.6863 16 14 13.3137 14 10C14 6.68629 16.6863 4 20 4C23.3137 4 26 6.68629 26 10Z" stroke={color} strokeOpacity={opacity} strokeWidth="3" />
        </svg>
    )
}

export default UserIcon
