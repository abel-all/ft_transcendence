import LogoImage from '../../assets/imgs/logo.png'
import Button from '../../components/Button.jsx';
import OAuthButton from '../../components/OAuthButton.jsx';
import { Link } from 'react-router-dom'
import FormInput from '../../components/FormInput.jsx'
import { useState, useEffect } from 'react';
import Axios from 'axios'
import {signInFieldProps, itemData, oAuthItems} from './variables.jsx'
import { useNavigate } from 'react-router-dom';
import LoaderOntop from "../../components/LoaderOntop.jsx";
import TwoFaAuthVerify from '../2FaAuth/TwoFaAuthVerify.jsx'
import "./css/index.css"


function SignIn() {

    const [formValues, setFormValues] = useState({});
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");
    const [isVerify, setIsVerify] = useState(false);
    const [isloaded, setIsloaded] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setIsloaded(false)
        }, 300);
    }, [])

    const checkFieldInput = async () => {
        
        await Axios.post("https://www.fttran.tech/api/token/", {
            username: formValues.Username,
            password: formValues.Password,
        },
        {
            withCredentials:true,
        }).then((response) => {
            console.log("first request");
            setUserId(response.data.user_id);
            if (response.data.is_2fa_enabled) {// is 2fa enable must redirect them to 2fa page
                setIsVerify(true);
            }
            else {
                Axios.post("https://www.fttran.tech/api/GnrToken/", {
                    user_id: userId,
                },
                {
                    withCredentials:true,
                }).then(() => {
                    console.log("second request");
                    navigate("/game", { replace: true }); // is 2fa disable must redirect them to game page
                }).catch((err) => {
                    console.log(err);
                    setMessage("Somethings wrong, please try again!")
                });
            }
        }).catch(err => {
            console.log(err);
            setMessage("Somethings wrong, please try again!")
        })
    }
    const handleUserClick = () => {
        checkFieldInput();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        checkFieldInput();
    }

    if (isVerify)
        return <TwoFaAuthVerify userId={userId}/>

    if (isloaded)
        return <LoaderOntop />

    return (
        <div className='container max-sm:scale-[0.8] flex flex-col justify-center items-center mx-auto relative'>
            <div className="px-[40px] mb-[200px] w-full max-w-[460px] rounded-[15px]  mt-[120px] max-sm:px-[0px] sm:bg-gradient-to-t sm:from-[#161c20] sm:to-[#273036] max-sm:mt-[20px] max-sm:mb-[0px]">
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
                <div className="flex justify-between text-[14px] pt-[29px] pb-[29px]">
                    <div className="pl-[10px] text-[rgba(238,238,238,0.51)]">Don’t Have An Account?</div>
                    <Link className="pr-[10px] text-[#EEEEEE] font-medium underline" to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
