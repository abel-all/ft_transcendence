import address from "../../../assets/imgs/location.svg"
import cell from "../../../assets/imgs/phone.svg"
import email from "../../../assets/imgs/mail.svg"
import ContactCard from './ContactCard.jsx'

const contactData = [
    {
        image: email,
        text: "contact@ft-transcendence.net",
    },
    {
        image: cell,
        text: "+212 600000000",
    },
    {
        image: address,
        text: "1337, Khouribga, Morocco",
    },
]

function OurContact() {
    return (
        <div className="flex flex-col items-center flex-wrap justify-center gap-[20px] mt-[100px] mb-[200px]">
            {contactData.map((card, index) => (
                <ContactCard
                    key={index}
                    image={card.image}
                    text={card.text}
                />
            ))}
        </div>
    )
}

export default OurContact;
