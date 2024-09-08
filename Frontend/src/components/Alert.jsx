import { useEffect, useRef, useState } from "react";
















const Alert = ({ message, color }) => {

    // const [display, setDisplay] = useState("block");
    const display = useRef("block");
    const percent = useRef(100);
    const [messageArray, setMessageArray] = useState(["hello 1", "hello 2", "hello 3"]);

    useEffect(() => {
        for (let i = 0; i < messageArray.length; i++) {
            console.log(`i=${i}  messageArray.length=${messageArray.length}`);
            const startHideTimeout = setTimeout(() => {
                display.current = "block";
                const percentInterval = setInterval(() => {
                        if (percent.current > 0) {
                            percent.current = percent.current - 10;
                        } else {
                            clearInterval(percentInterval);
                            display.current = "hidden";
                            percent.current = 100;
                        }
                }, 100);
            }, 3000);
            
            return () => {
                clearTimeout(startHideTimeout);
                setMessageArray(messageArray => {
                    let newArray = messageArray;
                    newArray.shift();
                    return newArray;
                });
            };
        }
    }, [messageArray]);

    useEffect(() => {
        setMessageArray(prevState => {
            let newArray = [...prevState];
            newArray.push(message);
            return newArray;
        });
        console.log(`${message} is updated! `);
    }, [message])

    return (
        messageArray && <div className={`Alert ${display.current} top-[88px] p-[6px] z-[100] rounded-md text-center right-[10px] fixed text-white w-[304px] h-[41px]`} style={{ backgroundColor: color, opacity: percent.current / 100 }}> <p>{messageArray ? messageArray[0] : ""}</p> </div>
    );
};

export default Alert;

