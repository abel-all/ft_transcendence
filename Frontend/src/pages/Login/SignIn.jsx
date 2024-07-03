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


function SignIn() {

    const [formValues, setFormValues] = useState({});
    const [message, setMessage] = useState("");
    const [isloaded, setIsloaded] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsloaded(false)
        }, 300);
    }, [])

    const navigate = useNavigate();
    const checkFieldInput = async () => {
        
        await Axios.post("http://10.13.100.18:8800/api/token/", {
                username: formValues.Username,
                password: formValues.Password
            },
            {
                credentials: 'include',
            }).then(response => {
                console.log(response);
                if (response.status == 200 || response.status == 304) {
                    navigate("/game", { replace: true });
                }
                else {
                    console.log(response.data.reason)
                    setMessage("Please check you information, and try again")
                }
            }).catch(err => {
                console.log(err);
                setMessage("No Server Response")
            })
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
