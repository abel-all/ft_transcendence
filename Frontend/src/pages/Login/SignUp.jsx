import LogoImage from '../../assets/imgs/logo.png'
import Button from '../../components/Button.jsx';
import OAuthButton from '../../components/OAuthButton.jsx';
import { Link} from 'react-router-dom'
import { useState } from 'react';
import FormInput from '../../components/FormInput.jsx'
import Axios from 'axios'
import {itemData, oAuthItems, signUpFieldProps, fieldReGex} from './variables.jsx'
import { useNavigate } from 'react-router-dom';

function SignUp() {


    const [formValues, setFormValues] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const checkFieldInput = async () => {
        
        if (fieldReGex.nameReGex.test(formValues["First Name"]) &&
            fieldReGex.nameReGex.test(formValues["Last Name"]) &&
            fieldReGex.usernameReGex.test(formValues["Username"]) &&
            fieldReGex.emailReGex.test(formValues["Email"]) &&
            fieldReGex.passwordReGex.test(formValues["Password"])) {
                try {
                    const response = await Axios.post("http://10.13.100.192:8000/api/signup/", JSON.stringify({
                            first_name: formValues["First Name"],
                            last_name: formValues["Last Name"],
                            username: formValues.Username,
                            email: formValues.Email,
                            password: formValues.Password
                        }), {
                            headers: { 'Content-Type': 'application/json' },
                            withCredentials: true
                        }
                    )
                    if (response.status === 201)
                        navigate("/signin", { replace: true });
                    else
                        setMessage("No Server Response [reason-from-backend]")
                } catch (err) {
                    if(!err?.response) { setMessage("No Server Response") }
                    else { setMessage(!err?.response?.data?.reason) }
                }
            }
        else
            setMessage("Invalid Information")
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
            <div className="px-[40px] mb-[200px] w-full max-w-[460px] border border-[#626262] rounded-[7px] mt-[120px] bg-gradient-to-b from-[#152c2a] to-[#16181c] via-[#161c20] max-sm:border-none max-sm:px-[0px] max-sm:bg-gradient-to-b max-sm:from-transparent max-sm:to-transparent max-sm:mt-[20px] max-sm:mb-[0px]">
                <img className="w-[97px] m-auto pb-[41px]" src={LogoImage} alt="PING! image" />
                <form onSubmit={handleSubmit} className="inputs flex items-center flex-col gap-3 pb-[48px]">
                    {signUpFieldProps.map((item, index) => (
                        <FormInput
                            key={index}
                            placeHolder={item.placeHolder}
                            type={item.type}
                            handleChange={(type, value) => { setFormValues(prevState => { return ({ ...prevState, ...{ [type]: value } }) }); }}
                        />
                    ))}
                    <input className="hidden" type="submit" />
                </form>
                <div className="text-[#ff0000] flex justify-center mb-[20px]">{message}</div>
                <div onClick={handleUserClick}>
                    <Button width="w-full" title="Sign Up" formValues={formValues} />
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
                <div className="footer flex justify-between text-[16px] pt-[29px] pb-[29px]">
                    <div className="pl-[10px] text-[rgba(238,238,238,0.51)] font-normal">Already Have An Account?</div>
                    <Link className="pr-[10px] text-[#EEEEEE] font-medium underline" to="/signin">Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
