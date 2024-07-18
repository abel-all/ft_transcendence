import LogoImage from '../../assets/imgs/logo.png'
import Button from '../../components/Button.jsx';
import OAuthButton from '../../components/OAuthButton.jsx';
import { Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import FormInput from '../../components/FormInput.jsx'
import Axios from 'axios'
import {itemData, oAuthItems, signUpFieldProps, fieldReGex} from './variables.jsx'
import { useNavigate } from 'react-router-dom';
import LoaderOntop from "../../components/LoaderOntop.jsx";

function SignUp() {


    const [formValues, setFormValues] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [isloaded, setIsloaded] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsloaded(false)
        }, 300);
    }, [])

    const checkFieldInput = async () => {
        
        if (fieldReGex.nameReGex.test(formValues["First Name"]) &&
            fieldReGex.nameReGex.test(formValues["Last Name"]) &&
            fieldReGex.usernameReGex.test(formValues["Username"]) &&
            fieldReGex.emailReGex.test(formValues["Email"]) &&
            fieldReGex.passwordReGex.test(formValues["Password"])) {
                await Axios.post("https://www.fttran.tech/api/signup/", {
                    first_name: formValues["First Name"],
                    last_name: formValues["Last Name"],
                    username: formValues.Username,
                    email: formValues.Email,
                    password: formValues.Password
                },
                {
                    withCredentials:true,
                }).then(() => {
                    navigate("/signin", { replace: true });
                }).catch(err => {
                    console.log(err);
                    setMessage("Please try again!")
                })
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

    if (isloaded)
        return <LoaderOntop />

    return (
        <div className='container max-sm:scale-[0.8] flex flex-col justify-center items-center mx-auto relative'>
            <div className="px-[40px] mb-[200px] w-full max-w-[460px] rounded-[15px] mt-[120px] sm:bg-gradient-to-t sm:from-[#161c20] sm:to-[#273036] max-sm:px-[0px] max-sm:mt-[20px] max-sm:mb-[0px]">
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
