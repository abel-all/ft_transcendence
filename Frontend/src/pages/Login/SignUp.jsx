import LogoImage from '../../assets/imgs/logo.png'
import ftImage from '../../assets/imgs/42.svg'
import googleImage from '../../assets/imgs/google.svg'
import Button from '../../components/Button.jsx';
import OAuthButton from '../../components/OAuthButton.jsx';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import FormInput from '../../components/FormInput.jsx'

function SignUp() {

    const [formValues, setFormValues] = useState({});

    const handleUserClick = () => {
        console.log("hhhhhhh");
        console.log(formValues["Username"]);
        console.log(formValues["Email"]);
        console.log(formValues["Password"]);
        console.log(formValues["Repeat Password"]);
        // return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("dfhsdjf")
        console.log(formValues["Username"] + "hello");
        console.log(formValues["Email"] + "hello");
        console.log(formValues["Password"] + "hello");
        console.log(formValues["Repeat Password"] + "hello");
    }

    return (
        <div className='container flex flex-col justify-center items-center mx-auto relative'>
            <div className="px-[40px] mb-[200px] w-full max-w-[460px] border border-[#626262] rounded-[7px] mt-[120px] bg-gradient-to-b from-[#152c2a] to-[#16181c] via-[#161c20]">
                <img className="w-[97px] m-auto pb-[41px]" src={LogoImage} alt="PING! image" />
                <form onSubmit={handleSubmit} className="inputs flex items-center flex-col gap-3 pb-[48px]">
                    <FormInput placeHolder="Username" type="text" handleChange={(type, value) => { setFormValues(prevState => { return ({ ...prevState, ...{ [type]: value } }) }); }} />
                    <FormInput placeHolder="Email" type="email" handleChange={(type, value) => { setFormValues(prevState => { return ({ ...prevState, ...{ [type]: value } }) }); }} />
                    <FormInput placeHolder="Password" type="password" handleChange={(type, value) => { setFormValues(prevState => { return ({ ...prevState, ...{ [type]: value } }) }); }} />
                    <FormInput placeHolder="Repeat Password" type="password" handleChange={(type, value) => { setFormValues(prevState => { return ({ ...prevState, ...{ [type]: value } }) }); }} />
                    <input className="hidden" type="submit" />
                    {/* For this FormInput you can use map function instead of repetition */}
                </form>
                <div onClick={handleUserClick}>
                    <Button width="w-full" title="Sign Up" formValues={formValues} />
                </div>
                <div className="flex justify-center items-center py-[16px]">
                    <div className="w-[166px] h-[1px] bg-[#626262]"></div>
                    <div className="text-[#EEEEEE] px-[8px] text-[16px] font-normal">Or</div>
                    <div className="w-[166px] h-[1px] bg-[#626262]"></div>
                </div>
                <div className="flex flex-col gap-[11px]">
                    <OAuthButton image={ftImage} imgTilte="42" />
                    <OAuthButton image={googleImage} imgTilte="google" />
                </div>
                <div className="footer flex justify-between text-[16px] pt-[29px] pb-[29px]">
                    <div className="pl-[10px] text-[rgba(238,238,238,0.51)] font-normal">Already Have An Account?</div>
                    <Link className="pr-[10px] text-[#EEEEEE] font-medium underline" to="/signin">Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
