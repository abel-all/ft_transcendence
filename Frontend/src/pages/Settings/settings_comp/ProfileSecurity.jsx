import MenuBar from "./MenuBar"
import Button from "../../../components/Button"
import close from "../../../assets/imgs/close.svg"
import { useEffect, useState } from "react"
import axios from "axios"



function ProfileSecurity(className) {



    const [display, setDisplay] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [Errors, setErrors] = useState([]);
    const [IsCurPassword, setIsCurPassword] = useState(false);
    const [SendData, setSendData] = useState(false);
    const [ShowErrors, setShowErrors] = useState(false);
    const [SixDigit, setSixDigit] = useState(0);
    const [OldPassword, setOldPassword] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [DeleteConfirmed, setDeleteConfirmed] = useState(false);
    const [CurPassword, setCurPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const passwordValidRegux = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/;
    const CheckConfirm = "Please Cheack Confirmed Password !";
    const PinError     = "Code Not Correct !";
    const CurrentPass  = "Current Password Not Correct !.";
    const ValidMessage = "Password must be 8-32 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.";


    const DisplayHandler = () => {
        setDisplay(!display);
        (deleteUser) && DeleteHandler(false);
    }
    const DeleteHandler = () => {
        setDeleteUser(!deleteUser);
        setDeleteConfirmed(false);
        (display) && setDisplay(false)
    }

    const StatusUpdate = (e, name) => {
        (name == "Current") && setOldPassword(e.target.value);
        (name == "New") && setNewPassword(e.target.value);
        (name == "Confirm") && setConfirmPassword(e.target.value);
    }

    const HandelSetingErrors = (Err) => {
        (!Errors.includes(Err)) && setErrors(prevErrors => [...prevErrors, Err]);
    }

    const CleanErros = (Err) => {
        if (Errors.includes(Err)) {
            const Cleaned = Errors.filter(item => item !== Err);
            setErrors(Cleaned);
        }
    }

    useEffect(() => {
        (NewPassword != ConfirmPassword) ? HandelSetingErrors(CheckConfirm) : CleanErros(CheckConfirm);
    }, [NewPassword, ConfirmPassword]);

    useEffect(() => {
        !(passwordValidRegux.test(NewPassword)) ? HandelSetingErrors(ValidMessage) : CleanErros(ValidMessage);
    }, [NewPassword]);

    useEffect(() => {
        IsCurPassword ? HandelSetingErrors(CurPassword) : CleanErros(CurPassword);
    }, [IsCurPassword]);

    const HandelChangingPassword = (e) => {
        e.preventDefault();
        setIsCurPassword(false);
        if (Errors.length != 0)
            setShowErrors(true)
        else {
            setShowErrors(false);
            console.log("Axios Ready");
            axios.post('https://fttran.tech/api/auth/passwordchange/', {
                old_password : OldPassword,
                new_password : NewPassword,
                cur_password : CurrentPass,
            }).then((res) => {
                if (err.status == 400){
                    setShowErrors(true);
                    setIsCurPassword(true);
                }
                else
                    console.log("Done Changing The password !", res);
            }).catch((err) => {
                console.log("Server Has no respond !");
            });
        }
        console.log(`${OldPassword} | ${NewPassword} | ${ConfirmPassword} \n=> ${Errors}`);
    }
    return (
        <div className={"h-[1093px]" + (className.className ? ` ${className.className}` : '')}>
            <div className="hidden md:block text-[20px] font-[500] font-[Outfit] opacity-80 py-[25px]"> Security</div>
            <MenuBar className="md:hidden SecuritySettings flex flex-row justify-between font-[500] font-[Outfit] py-[35px] " setShown={className.setShown}/>
            <div className="linksHolder p-[17px]">
                <div onClick={DisplayHandler} className="text-[16px] font-[500] font-[Outfit] text-[#219EBC] mb-[20px] cursor-pointer">Change My Passowrd</div>
                <div className="text-[16px] font-[500] font-[Outfit] text-[#219EBC] mb-[20px] cursor-pointer">Two-factor Authentication</div>
                <div onClick={DeleteHandler} className="DeleteSettingsButton text-[16px] font-[500] font-[Outfit] mb-[20px] cursor-pointer text-[#B63C3C] underline" > Delete Account</div>
               {display &&  <form action="" method="" className="relative">
                    <div className="m-[auto] py-[40px] relative px-[40px] mb-[200px] w-full max-w-[460px] border border-[#626262] rounded-[7px] bg-gradient-to-b from-[#152c2a] to-[#16181c] via-[#161c20] mt-[120px] max-sm:border-none max-sm:px-[0px] max-sm:bg-gradient-to-b max-sm:from-transparent max-sm:to-transparent max-sm:mt-[20px] max-sm:mb-[0px]">
                        <ul className="ShowErrors text-[red] list-disc list-inside">
                            {
                                ShowErrors && Errors && Errors.map((error, index) => {
                                    if (error != PinError)
                                        return <li key={index}>{error}</li>;
                                })
                            }
                        </ul>
                        <img className="w-[32px] h-[32px] absolute top-[5px] right-[5px] cursor-pointer" onClick={DisplayHandler} src={close} alt=""/>
                        <div className="flex my-[20px] border border-[#626262] bg-transparent w-full h-[58px]">
                            <input type="password" onChange={(e) => {StatusUpdate(e, "Current")}} className="bg-transparent outline-none w-full text-[#EEEEEE] text-[16px] p-[15px] duration-70 focus:border focus:border-[#00CEFF]"
                                placeholder="Current Password"
                            />
                        </div>
                        <div className="flex border my-[20px] border-[#626262] bg-transparent w-full h-[58px]">
                            <input type="password" onChange={(e) => {StatusUpdate(e, "New")}} className="bg-transparent outline-none w-full text-[#EEEEEE] text-[16px] p-[15px] duration-70 focus:border focus:border-[#00CEFF]"
                                placeholder="New Password"
                            />
                        </div>
                        <div className="flex border my-[20px] border-[#626262] bg-transparent w-full h-[58px]">
                            <input type="password" onChange={(e) => {StatusUpdate(e, "Confirm")}} className="bg-transparent outline-none w-full text-[#EEEEEE] text-[16px] p-[15px] duration-70 focus:border focus:border-[#00CEFF]"
                                placeholder="Confirm Password"
                            />
                        </div>
                        <div onClick={HandelChangingPassword} className="text-black">
                            <Button
                                title="Change My Password"
                                type="submit"
                            />
                        </div>
                    </div>
                </form>}
                {deleteUser && <form action="" method="" className="relative">
                    <div className="m-[auto] py-[40px] relative px-[40px] mb-[200px] w-full max-w-[460px] border border-[#626262] rounded-[7px] bg-gradient-to-b from-[#152c2a] to-[#16181c] via-[#161c20] mt-[120px] max-sm:border-none max-sm:px-[0px] max-sm:bg-gradient-to-b max-sm:from-transparent max-sm:to-transparent max-sm:mt-[20px] max-sm:mb-[0px]">
                        <img className="w-[32px] h-[32px] absolute top-[5px] right-[5px] cursor-pointer" onClick={DeleteHandler} src={close} alt=""/>
                        <div className="flex flex-col my-[20px] justify-around items-center border-0 bg-transparent w-full h-[58px]">
                            <ul className="ShowErrors text-[red] list-disc list-inside">
                                {
                                    ShowErrors && Errors && Errors.map((error, index) => {
                                        if (error == PinError)
                                            return <li key={index}>{error}</li>;
                                    })
                                }
                            </ul>
                                <h1 className="text-[18px] py-[10px]">
                                {!DeleteConfirmed ?
                                    "Are you sure you want to delete your account?"
                                    : "Six digit sent to your email !"
                                }
                                </h1>
                            <p className="py-[10px] text-center">
                                {!DeleteConfirmed ?
                                    "This action is irreversible and you will lose all your data associated with this account."
                                    : <input className="text-black outline-none p-[5px] text-center rounded-sm" name="confirm" type='number' placeholder="Enter 6 digit"/>
                                }
                            </p>
                        </div>
                        <div className="text-white text-center mt-[80px]">
                            <div onClick={(e) => {
                                if (!DeleteConfirmed) {
                                    e.preventDefault();
                                    setDeleteConfirmed(true)
                                    axios.get('https://fttran.tech/api/auth/delete-account/send-code')
                                        .then((res) => {
                                            console.log("succses : ", res);
                                        })
                                        .catch((ers) => {
                                            console.log("Send code : ", ers);
                                        });
                                }
                                else {
                                    setShowErrors(true);
                                    e.preventDefault();
                                    axios.post('https://fttran.tech/api/auth/delete-account/check-code', {
                                        code : SixDigit,
                                    })
                                    .then((res) => {
                                        if (res.status == 400) {
                                            HandelSetingErrors(PinError);
                                            console.log("code not correct : ", res);
                                        }
                                        else {
                                            CleanErros(PinError);
                                            window.location = "/signup";
                                        }
                                    })
                                    .catch((ers) => {
                                        HandelSetingErrors(PinError);
                                        console.log("Reciving : ", ers);
                                    });
                                }
                            }}>
                            <Button title="Confirm Delete" type="submit" bgColor=" bg-[#ff0000]"/></div>
                        </div>
                    </div>
                </form>}
            </div>
        </div>
    )
}

export default ProfileSecurity
