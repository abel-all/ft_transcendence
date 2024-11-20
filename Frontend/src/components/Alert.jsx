import { useState, useEffect, useRef } from 'react';
import { IoIosNotifications } from 'react-icons/io';

const Alert = ({ message, color }) => {
    const [messageQueue, setMessageQueue] = useState([]);
    const [currentMessage, setCurrentMessage] = useState(null);
    const [percent, setPercent] = useState(100);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const hideTimeout = useRef(null);
    const fadeOutTimeout = useRef(null);

    useEffect(() => {
        if (message) {
            setMessageQueue((prevQueue) => [...prevQueue, { text: message, color: color || 'green' }]);
        }
    }, [message, color]);

    useEffect(() => {
        if (!currentMessage && messageQueue.length > 0) {
            setCurrentMessage(messageQueue[0]);
            setMessageQueue((prevQueue) => prevQueue.slice(1));
        }
    }, [messageQueue, currentMessage]);

    useEffect(() => {
        if (currentMessage) {
            hideTimeout.current = setTimeout(() => {
                setIsFadingOut(true);
                fadeOutTimeout.current = setTimeout(() => {
                    setIsFadingOut(false);
                    setCurrentMessage(null);
                    setPercent(100);
                }, 1000);
            }, 3000);

            return () => {
                clearTimeout(hideTimeout.current);
                clearTimeout(fadeOutTimeout.current);
            };
        }
    }, [currentMessage]);

    useEffect(() => {
        if (isFadingOut) {
            const interval = setInterval(() => {
                setPercent((prev) => (prev > 0 ? prev - 10 : 0));
            }, 100);
            return () => clearInterval(interval);
        }
    }, [isFadingOut]);

    if (!currentMessage) {
        return null;
    }
    return (
        <div className="absolute w-full flex justify-center">
            <div
                className={`Alert top-[100px] z-[100] rounded-md text-center border-l-4 border-r-4 border-white fixed text-white px-4 py-2`}
                style={{
                    backgroundColor: currentMessage.color,
                    opacity: percent / 100,
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                <p className="flex justify-between items-center">
                    <IoIosNotifications style={{ marginRight: '10px', color: 'black' }} size={'25px'} />
                    {currentMessage.text}
                </p>
            </div>
        </div>
    );
};

export default Alert;
