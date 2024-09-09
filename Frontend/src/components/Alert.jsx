import { useEffect, useRef, useState } from "react";













/*


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
};*/

const Alert = ({ message, color }) => {
    const display = useRef("block");
    const [percent, setPercent] = useState(100);
    const [messageArray, setMessageArray] = useState([message]);

    useEffect(() => {
        if (messageArray.length > 0) {
            const startHideTimeout = setTimeout(() => {
                display.current = "block";
                const percentInterval = setInterval(() => {
                    setPercent((prevPercent) => {
                        if (prevPercent > 0) {
                            return prevPercent - 10;
                        } else {
                            clearInterval(percentInterval);
                            setPercent(100);
                            setMessageArray((prev) => prev.slice(1));
                            return 100;
                        }
                    });
                }, 100);
            }, 3000);
            
            return () => {
                clearTimeout(startHideTimeout);
            };
        }
        else
            display.current = "hidden";
    }, [messageArray]);

    useEffect(() => {
        if (message) {
            setMessageArray((prev) => [...prev, message]);
        }
    }, [message]);

    return (
        messageArray.length > 0 && (
            <div
                className={`Alert ${display.current} top-[120px] p-[6px] z-[100] rounded-md text-center fixed text-white h-[41px]`}
                style={{ backgroundColor: color, opacity: percent / 100 }}>
                <p>{messageArray[0]}</p>
            </div>
        )
    );
};


export default Alert;

