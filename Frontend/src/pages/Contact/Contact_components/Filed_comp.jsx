import React, { useState } from 'react';


function Fields (Data) {
    const [Value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    if (Data.element == "textaria") {
        return (
            <textarea
            className={Data.classes}
            value={Value}
            onChange={handleChange}
            placeholder={Data.placeholder}/>
        );
    }
    else {
        return (
            <input
            className={Data.classes}
            type={Data.type}
            value={Value}
            onChange={handleChange}
            placeholder={Data.placeholder}/>
        );
    }
}

export default Fields