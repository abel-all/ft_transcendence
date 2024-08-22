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
        console.log(formValues["Username"]);
        console.log(formValues["Email"]);
        console.log(formValues["Your Message"]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues["Username"] + "hello");
        console.log(formValues["Email"] + "hello");
        console.log(formValues["Your Message"] + "hello");
    }

    return (
        <div className="px-[40px] mx-auto w-full max-w-[460px] rounded-[15px] sm:bg-gradient-to-t sm:from-[#161c20] sm:to-[#273036] mb-[200px] flex flex-col justify-between items-center max-sm:px-[0px] max-sm:mt-[20px]">
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
                <button className="hidden" type='submit'></button>
            </form>
            <div className=" mb-[20px] w-full" onClick={handleUserClick}>
                <Button bgColor=" bg-[#019F9F]" title="Send Message" formValues={formValues} />
            </div>
        </div>
    )
}

export default Fileds
