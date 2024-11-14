import PrivacyContent from "./PrivacyContent"
import Navbar from '../../components/Navbar.jsx';

const data = [
    {
        title: "Thanks for using PingPong!",
        description: `These Terms of Service ("Terms") govern your access to and use of any website, service, API, or features owned, operated, or offered by PingPong, except where we expressly state that separate terms (and not these) apply. Please read these Terms carefully, and contact us if you have any questions.
        
        You may not use the Service to do or share anything that is contrary to these Terms. For clarity, these Terms include, and incorporate by reference, the following policies:
        
        Our Community Guidelines, which explain what is and isn’t allowed on PingPong;
        
        Our Enforcement practices, which explain how we put our policies into practice, including restrictions we may impose on your use of PingPong.
        
        By accessing or using PingPong, you agree to be bound by these Terms. If you do not agree to our Terms, you must not access or use PingPong.`
    },
];


const UserAgreement = () => {
    return (
        <div className="container mx-auto px-[10px]">
            <Navbar />
            <PrivacyContent contentData={data}/>
        </div>
    )
}

export default UserAgreement
