import { useEffect } from "react";

const Buttons = ({fun, styleR, icon, type}) => {

    return (
        <>
            <button onClick={() => fun(type)}>
                <img style={{right : styleR}} className={`top-[20px] absolute w-[25.6px] h-[25.6px]`} src={icon} alt=''/>
            </button>
        </>
    );
}

export default Buttons;