import LogoImage from "../../../assets/imgs/logo.png"
import FormInput from '../../../components/FormInput.jsx'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Button from '../../../components/Button.jsx';

const formData = [
    {
        placeHolder: "Username",
        type: "text",
        height: "h-[58px]",
    },
    {
        placeHolder: "Email",
        type: "email",
        height: "h-[58px]",
    },
    {
        placeHolder: "Your Message",
        type: "textarea",
        height: "h-[200px]",
    }
]

function Fileds() {

    const [formValues, setFormValues] = useState({});

    const handleUserClick = () => {
        console.log("hhhhhhh");
        console.log(formValues["Username"]);
        console.log(formValues["Email"]);
        console.log(formValues["Your Message"]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("dfhsdjf")
        console.log(formValues["Username"] + "hello");
        console.log(formValues["Email"] + "hello");
        console.log(formValues["Your Message"] + "hello");
    }

    return (
        <div className="px-[40px] mx-auto w-full max-w-[460px] border border-[#626262] rounded-[7px] mt-[120px] bg-gradient-to-b from-[#152c2a] to-[#16181c] via-[#161c20] flex flex-col justify-between items-center max-sm:border-none max-sm:px-[0px] max-sm:bg-gradient-to-b max-sm:from-transparent max-sm:to-transparent max-sm:mt-[20px]">
            <Link to="/"><img className="w-[97px] m-auto pb-[41px]" src={LogoImage} alt="PING! image" /></Link>
            <div className="text-white font-bold text-[36px] mb-[65px]" >Contact Us</div>
            <form onSubmit={handleSubmit} className="w-full inputs flex items-center flex-col gap-3 pb-[48px]">
                {formData.map((field, index) => (
                    <FormInput
                        key={index}
                        placeHolder={field.placeHolder}
                        type={field.type}
                        height={field.height}
                        handleChange={(type, value) => { setFormValues(prevState => { return ({ ...prevState, ...{ [type]: value } }) }); }}
                    />
                ))}
                <input className="hidden" type="submit" />
            </form>
            <div className=" mb-[20px] w-full" onClick={handleUserClick}>
                <Button bgColor=" bg-[#FFCA61]" title="Send Message" formValues={formValues} />
            </div>
        </div>
    )
}

export default Fileds
