import adress from "../../../assets/adress.png"
import cell from "../../../assets/cell.png"
import email from "../../../assets/email.png"


function OurContact() {
    return (
        <div className="Contact-holder p-[43px] mt-[60px] flex text-center items-center flex-col mx-auto w-[481px]">
            <div className="call-phone mt-[25px] flex w-[100%]">
                <div className="w-[20%]"><img className="w-[32.75px] h-[32.75px]" src={cell} alt="" /></div>
                <span className="w-[80%] font-bold text-white text-[20px] inter text-start">+212 613608904</span>
            </div>
            <div className="email-contact mt-[25px] flex w-[100%]">
                <div className="w-[20%]"><img className="w-[27.75px] h-[27.75px]" src={email} alt="" /></div>
                <span className="w-[80%] font-bold text-white text-[20px] inter text-start">contact@ft-transcendence.net</span>
            </div>
            <div className="address mt-[25px] flex w-[100%]">
                <div className="w-[20%]"><img className="w-[32.75px] h-[32.75px]" src={adress} alt="" /></div>
                <span className="w-[80%] font-bold text-white text-[20px] inter text-start">1337, Khouribga, Morocco</span>
            </div>
        </div>
    )
}

export default OurContact