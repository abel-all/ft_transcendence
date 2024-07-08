
const MapImg = ({ leftSide, rightSide }) => {
    return (
        <svg width="303" height="293" viewBox="0 0 303 293" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.704841" y="167.96" width="258" height="162" rx="12.5" transform="rotate(-40.4119 0.704841 167.96)" fill={leftSide} stroke="#626262"/>
            <rect x="61.5869" y="240.237" width="6" height="26" rx="3" transform="rotate(-40.4119 61.5869 240.237)" fill="white"/>
            <path d="M100.449 83.0361L187.63 8.80829C192.886 4.33287 200.775 4.96598 205.251 10.2224L294.065 114.535C298.54 119.791 297.907 127.68 292.651 132.156L205.47 206.384L100.449 83.0361Z" fill={rightSide}/>
            <rect x="204.84" y="19.7661" width="7" height="27" rx="3.5" transform="rotate(-40.4119 204.84 19.7661)" fill="white"/>
            <line x1="99.3638" y1="83.3037" x2="205.033" y2="207.413" stroke="white" strokeWidth="3" strokeDasharray="10 10"/>
        </svg>
    )
}

export default MapImg