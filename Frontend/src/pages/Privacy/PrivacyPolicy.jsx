import PrivacyContent from "./PrivacyContent"
import Navbar from '../../components/Navbar.jsx';

const contentData = [
    {
        title: "Summary of changes",
        description: `
            We strive to be transparent about our use of personal data and make it easy to understand your rights and choices.
            
            Thanks for using PingPong! We've written this policy to help you understand what information we collect, how we use it,
            and the choices you have regarding that information. Some of the concepts below are a bit technical, but we've done our best
            to explain things in a simple and clear manner.
        `,
    },
    {
        title: "Thanks for using PingPong!",
        description: `We've written this policy to help you understand what information we collect, how we use it,
            and the choices you have regarding that information. Some of the concepts below are a bit
            technical, but we've done our best to explain things in a simple and clear manner.        `,
    },{
        title: "We collect data in different ways",
        description: `
            When you give them to us or when you give us permission to obtain them.<br/><br/>
            
            When you use PingPong websites you voluntarily share certain information.<br/><br/>

            - <strong>Account Information</strong>: When you join our Services, we collect information such as your name, email address, and country of residence.<br/>
            - <strong>Content</strong>: We collect information when you save or upload photos, when you play, or when you message and interact with other users.<br/>
            - <strong>Your communications with us</strong>: If you contact us for support or otherwise engage with us, we collect the content of those communications.<br/><br/>
        `,
    },
    {
        title: "Your Rights and Choices",
        description: `
            We offer you certain choices to control how your data is used. Depending on where you live (e.g., EEA, Switzerland, UK, US),
            these choices may also be privacy rights you have under local law. To exercise these rights, visit your account settings and,
            if you still need help, our Help Center.<br/><br/>

            - Access: You can request access to the information we collect and hold about you in your Account settings.<br/>
            - Correction/Rectification: You may correct your information by updating your profile information.<br/>
            - Deletion/Erasure: You can have your information deleted. In your settings, select “Delete Account” and follow the instructions.<br/><br/>
            
            Where your consent is our legal basis, you may withdraw that consent at any time.
        `,
    },
    {
        title: "Our Children's Information Policy",
        description: `
            Children under the age of 13 are not permitted to use PingPong. If you live in a state or country with an age requirement
            of over 13, you may use the Services only if you are of legal age to consent to the processing of your data.
        `,
    },
    {
        title: "How we make changes to this policy",
        description: `
            We may make changes to this policy from time to time. We will post those changes on this page. If you continue to use PingPong
            after those changes take effect, the new policy will apply to you. If the changes are significant, we may notify you more
            explicitly about the changes, such as by sending you an email.
        `,
    },
    {
        title: "Contact us",
        description: `
            If you have any questions or concerns regarding this Agreement, please contact us at:<br/><br/>
            - Email: [The Support Email]<br/>
            - Address: [The Office Address, if applicable]
        `,
    }
];

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto px-[10px]">
            <Navbar />
            <PrivacyContent contentData={contentData} page="Privacy Policy"/>
        </div>
    )
}

export default PrivacyPolicy
