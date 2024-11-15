import PrivacyContent from "./PrivacyContent"
import Navbar from '../../components/Navbar.jsx';

const contentData = [
    {
        title: "Thanks for using PingPong!",
        description: `These Terms of Service ('Terms') govern your access to and use of any website, service, API, or features owned, operated, or offered by PingPong, except where we expressly state that separate terms (and not these) apply. Please read these Terms carefully, and contact us if you have any questions.<br/>
        <br/>
        You may not use the Service to do or share anything that is contrary to these Terms. For clarity, these Terms include, and incorporate by reference, the following policies:<br/>
        <br/>
        - Our Community Guidelines, which explain what is and isn’t allowed on PingPong.<br/>
        - Our Enforcement practices, which explain how we put our policies into practice, including restrictions we may impose on your use of PingPong.<br/>
        <br/>
        By accessing or using PingPong, you agree to be bound by these Terms. If you do not agree to our Terms, you must not access or use PingPong.`
    },
    {
        title: "Using PingPong",
        description: `Any use or access to PingPong by anyone under the age of 13 is not allowed. If you are older than 13, you can use PingPong if you are over the minimum age of consent in your country. If you are 13 to 18, you may only use the Service with the permission of your parent or legal guardian. Please be sure your parent or legal guardian has reviewed and discussed these Terms with you.<br/>
        <br/>
        If we’ve previously disabled your account for violating these Terms, any of our policies or for legal reasons, you will not create a new PingPong account without our express written permission, which is provided at our sole discretion.<br/>
        <br/>
        In using PingPong, you agree not to scrape, collect, search, copy or otherwise access data or content from PingPong in unauthorized ways, such as by using automated means (without our express prior permission), or access or attempt to access data you do not have permission to access.`
    },
    {
        title: "Security",
        description: `We care about the security of our users. While we work to protect the security of your User Content and account, we can’t guarantee that unauthorized third parties won’t be able to defeat our security measures. Keep your password secure and do not disclose it to any other person or entity. Please notify us immediately of any unauthorized access to your account or any other breach of security.`
    },
    {
        title: "Termination",
        description: `We may terminate your right to access or use PingPong for any violation of these Terms. Where appropriate, we will provide you with written notice and you may appeal a decision you think was made in error.<br/>
        <br/>
        You may also terminate or delete your account at any time.`
    },
    {
        title: "Changes to the Agreement",
        description: `We may make changes to these terms of use from time to time. We will post those changes on this page. If you continue to use PingPong after those changes take effect, the new terms of use will apply to you. If the changes are significant, we may notify you more explicitly about the changes, such as by sending you an email.`
    },
    {
        title: "Contact us",
        description: `If you have any questions or concerns regarding this Agreement, please contact us at:<br/>
        <br/>
        Email: [The Support Email]<br/>
        Address: [The Office Address, if applicable]`
    }
];

const UserAgreement = () => {
    return (
        <div className="container mx-auto px-[10px]">
            <Navbar />
            <PrivacyContent contentData={contentData} page="Terms of Service"/>
        </div>
    )
}

export default UserAgreement
