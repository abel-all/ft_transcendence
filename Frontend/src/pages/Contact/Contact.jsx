import "./Contact.css";
import React from 'react';
import OurContact from './Contact_components/OurContact';
import Fileds from './Contact_components/Fileds';

function Contact() {
    return (
        <div className="Contact pt-[7%] h-full">
            <Fileds></Fileds>
            <OurContact></OurContact>
        </div>
    )
}

export default Contact