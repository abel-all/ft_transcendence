

function TimeHM () {

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    const now = new Date();

    return formatTime(now);
}

export default TimeHM;