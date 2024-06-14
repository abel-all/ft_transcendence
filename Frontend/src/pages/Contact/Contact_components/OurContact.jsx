import address from "../../../assets/imgs/location.svg"
import cell from "../../../assets/imgs/phone.svg"
import email from "../../../assets/imgs/mail.svg"
import ContactCard from './ContactCard.jsx'

function OurContact() {
    return (
        <div className="flex flex-wrap justify-center gap-[20px] mt-[200px]">
            <ContactCard image={email} text="contact@ft-transcendence.net" />
            <ContactCard image={cell} text="+212 600000000" />
            <ContactCard image={address} text="1337, Khouribga, Morocco" />
        </div>
    )
}

export default OurContact;
