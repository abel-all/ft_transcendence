import { useEffect, useState } from "react";

const Alert = ({ message, color }) => {
    const [display, setDisplay] = useState("block");
    const [percent, setPercent] = useState(100);

    useEffect(() => {
        const startHideTimeout = setTimeout(() => {
            const percentInterval = setInterval(() => {
                setPercent(prevPercent => {
                    if (prevPercent > 0) {
                        return prevPercent - 10;
                    } else {
                        clearInterval(percentInterval);
                        setDisplay("hidden");
                        return prevPercent;
                    }
                });
            }, 100);
        }, 3000);

        return () => {
            clearTimeout(startHideTimeout);
        };
    }, []);

    return (
        <div className={`Alert ${display} bg-[${color}] top-[88px] p-[6px] z-[100] rounded-md text-center right-[10px] fixed text-${color} w-[304px] h-[41px]`} style={{ opacity: percent / 100 }}>
            <p>{message}</p>
        </div>
    );
};

export default Alert;
