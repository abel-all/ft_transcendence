import LogoImage from '../../assets/imgs/logo.png'
import ftImage from '../../assets/imgs/42.svg'
import googleImage from '../../assets/imgs/google.svg'
import Button from '../../components/Button.jsx';
import OAuthButton from '../../components/OAuthButton.jsx';
import { Link } from 'react-router-dom'
import FormInput from '../../components/FormInput.jsx'
import { useState } from 'react';

function SignIn() {

    const [formValues, setFormValues] = useState({});

    const handleUserClick = () => {
            console.log("hhhhhhh");
            console.log(formValues["Username"]);
            console.log(formValues["Email"]);
            console.log(formValues["Password"]);
            console.log(formValues["Repeat Password"]);
            // return true;
    }

    return (
        <div className='container flex flex-col justify-center items-center mx-auto relative'>
            <div className="login-container px-5 w-full max-w-[460px] border border-[#626262] rounded-[7px] bg-gradient-to-b from-[#152c2a] to-[#16181c] via-[#161c20] mt-[120px]">
                <div className="w-[97px] m-auto pb-[41px]" >
                    <Link to="/"><img src={LogoImage} alt="PING! image" /></Link>
                </div>
                <div className="inputs flex items-center flex-col gap-3 pb-[16px]">
                    <FormInput placeHolder="Email" type="email" handleChange={(type, value) => {setFormValues(prevState => { return ({...prevState, ...{[type]: value}}) }); }}/>
                    <FormInput placeHolder="Password" type="password" handleChange={(type, value) => {setFormValues(prevState => { return ({...prevState, ...{[type]: value}}) }); }}/>
                </div>
                <div className="flex justify-end pr-[54px] underline text-[#EEEEEE] font-normal text-[12px] pb-[34px]">Forget Password?</div>
                <div onClick={handleUserClick}>
                    <Button width="w-full" title="Sign In" formValues={formValues}/>
                </div>
                <div className="flex justify-center items-center py-[16px]">
                    <div className="w-[166px] h-[1px] bg-[#626262]"></div>
                    <div className="text-[#EEEEEE] px-[8px] text-[16px] font-normal">Or</div>
                    <div className="w-[166px] h-[1px] bg-[#626262]"></div>
                </div>
                <div className="flex flex-col gap-[11px]">
                    <OAuthButton image={ftImage} imgTilte="42"/>
                    <OAuthButton image={googleImage} imgTilte="google"/>
                </div>
                <div className="flex justify-between text-[16px] pt-[29px] pb-[29px]">
                    <div className="pl-[54px] text-[rgba(238,238,238,0.51)] font-normal">Don’t Have An Account?</div>
                    <Link className="pr-[54px] text-[#EEEEEE] font-medium underline" to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
