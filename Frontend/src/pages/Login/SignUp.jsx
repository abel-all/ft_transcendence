import LogoImage from '../../assets/imgs/logo.png'
import ftImage from '../../assets/imgs/42.svg'
import googleImage from '../../assets/imgs/google.svg'
import Button from '../../components/Button.jsx';
import OAuthButton from '../../components/OAuthButton.jsx';
import { Link } from 'react-router-dom'
// import { useState } from 'react';
import FormInput from '../../components/FormInput.jsx'

function SignUp() {

    return (
        <div className='container flex flex-col justify-center items-center mx-auto relative'>
            <div className="login-container w-[460px] border border-[#626262] rounded-[7px] mt-[120px] bg-gradient-to-b from-[#152c2a] to-[#16181c] via-[#161c20]">
                <img className="w-[97px] m-auto pb-[41px]" src={LogoImage} alt="sorry" />
                <div className="inputs flex items-center flex-col gap-3 pb-[48px]">
                    <FormInput placeHolder="Username" type="text" />
                    <FormInput placeHolder="Email" type="email" />
                    <FormInput placeHolder="Password" type="password" />
                    <FormInput placeHolder="Repeat Password" type="password" />
                </div>
                <Button width="w-[364px]" title="Sign Up" />
                <div className="flex justify-center items-center py-[16px]">
                    <div className="w-[166px] h-[1px] bg-[#626262]"></div>
                    <div className="text-[#EEEEEE] px-[8px] text-[16px] font-normal">Or</div>
                    <div className="w-[166px] h-[1px] bg-[#626262]"></div>
                </div>
                <div className="flex flex-col gap-[11px]">
                    <OAuthButton image={ftImage} imgTilte="42"/>
                    <OAuthButton image={googleImage} imgTilte="google"/>
                </div>
                <div className="footer flex justify-between text-[16px] pt-[29px] pb-[29px]">
                    <div className="pl-[54px] text-[rgba(238,238,238,0.51)] font-normal">Already Have An Account?</div>
                    <Link className="pr-[54px] text-[#EEEEEE] font-medium underline" to="/signin">Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
