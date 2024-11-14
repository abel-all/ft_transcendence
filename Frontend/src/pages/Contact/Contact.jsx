import OurContact from './Contact_components/OurContact';
import Fileds from './Contact_components/Fileds';
import { useEffect, useState } from "react";
import LoaderOntop from "../../components/LoaderOntop.jsx";

function Contact() {

    const [isloaded, setIsloaded] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsloaded(false)
        }, 300);
    }, [])

    if (isloaded)
        return <LoaderOntop />

    return (
        <div className="container mx-auto px-[10px]">
            <OurContact/>
            <Fileds/>
        </div>
    )
}

export default Contact
