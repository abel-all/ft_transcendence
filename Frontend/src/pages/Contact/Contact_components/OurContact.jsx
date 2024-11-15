import address from "../../../assets/imgs/location.svg"
import cell from "../../../assets/imgs/phone.svg"
import email from "../../../assets/imgs/mail.svg"
import ContactCard from './ContactCard.jsx'

const contactData = [
    {
        image: email,
        text: "contact@ft-transcendence.net",
        bgColor: "bg-[#fc8a06]",
        hoverColor: "hover:bg-[#fc8a06]",
        groupHoverColor: "group-hover:bg-[#B86300]",
        type: "Email",
    },
    {
        image: cell,
        text: "+212 600000000",
        bgColor: "bg-[#986afe]",
        hoverColor: "hover:bg-[#986afe]",
        groupHoverColor: "group-hover:bg-[#6D46C2]",
        type: "Phone Number",
    },
    {
        image: address,
        text: "1337, Khouribga, Morocco",
        bgColor: "bg-[#025eec]",
        hoverColor: "hover:bg-[#025eec]",
        groupHoverColor: "group-hover:bg-[#0041A5]",
        type: "Address",
    },
]

function OurContact() {
    return (
        <div className="flex items-center flex-wrap justify-center gap-[20px] mt-[100px] mb-[100px]">
            {contactData.map((card, index) => (
                <ContactCard
                    key={index}
                    image={card.image}
                    text={card.text}
                    bgColor={card.bgColor}
                    hoverColor={card.hoverColor}
                    groupHoverColor={card.groupHoverColor}
                    type={card.type}
                />
            ))}
        </div>
    )
}

export default OurContact;
