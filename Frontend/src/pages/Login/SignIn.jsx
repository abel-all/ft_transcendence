import LogoImage from '../../assets/imgs/logo.png'
import Button from '../../components/Button.jsx';
import OAuthButton from '../../components/OAuthButton.jsx';
import { Link } from 'react-router-dom'
import FormInput from '../../components/FormInput.jsx'
import { useState } from 'react';
// import Axios from 'axios'
import {signInFieldProps, itemData, oAuthItems} from './variables.jsx'
import { useAuth } from '../../components/Auth.jsx';
import { useNavigate } from 'react-router-dom';


function SignIn() {

    const [formValues, setFormValues] = useState({});
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const auth = useAuth();
    const checkFieldInput = () => {
        setMessage("redirect to profile");
        auth.login(formValues["Email"]);
        navigate("/game", { replace: true });
        // Axios.post("http://10.13.100.192:8000/api/signin/", {
        //     email: formValues["Email"],
        //     password: formValues["Password"]
        // }).then(res => {
        //     if (res.status === 201)
        //         // must redirect the user to your profile.
        //         console.log("infos created in database successfuly")
        //     else
        //         setMessage("Incorrect information")
        // })
    }
    const handleUserClick = () => {
        checkFieldInput();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        checkFieldInput();
    }

    return (
        <div className='container flex flex-col justify-center items-center mx-auto relative'>
            <div className="px-[40px] mb-[200px] w-full max-w-[460px] border border-[#626262] rounded-[7px] bg-gradient-to-b from-[#152c2a] to-[#16181c] via-[#161c20] mt-[120px] max-sm:border-none max-sm:px-[0px] max-sm:bg-gradient-to-b max-sm:from-transparent max-sm:to-transparent max-sm:mt-[20px] max-sm:mb-[0px]">
                <img className="w-[97px] m-auto pb-[41px]" src={LogoImage} alt="PING! image" />
                <form onSubmit={handleSubmit} className="flex items-center flex-col gap-3 pb-[16px]">
                    {signInFieldProps.map((item, index) => (
                        <FormInput
                            key={index}
                            placeHolder={item.placeHolder}
                            type={item.type}
                            handleChange={(type, value) => { setFormValues(prevState => { return ({ ...prevState, ...{ [type]: value } }) }); }}
                        />
                    ))}
                    <input className="hidden" type="submit" />
                </form>
                <div className="flex justify-end underline text-[#EEEEEE] font-normal text-[12px] pb-[34px]">Forget Password?</div>
                <div className="text-[#ff0000] flex justify-center mb-[20px]">{message}</div>
                <div onClick={handleUserClick}>
                    <Button type="submit" width="w-full" title="Sign In" formValues={formValues} />
                </div>
                <div className="flex justify-center items-center py-[16px]">
                    {itemData.map((item, index) => (
                        <div key={index} className={item.className}>
                            {item.content}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-[11px]">
                    {oAuthItems.map((item, index) => (
                        <OAuthButton
                            key={index}
                            image={item.image}
                            imgTilte={item.imgTilte}
                        />
                    ))}
                </div>
                <div className="flex justify-between text-[16px] pt-[29px] pb-[29px]">
                    <div className="pl-[10px] text-[rgba(238,238,238,0.51)] font-normal">Don’t Have An Account?</div>
                    <Link className="pr-[10px] text-[#EEEEEE] font-medium underline" to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
