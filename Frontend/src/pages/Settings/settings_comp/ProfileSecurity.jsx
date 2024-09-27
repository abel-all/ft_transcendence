import MenuBar from "./MenuBar"
import Button from "../../../components/Button"
import close from "../../../assets/imgs/close.svg"
import { useEffect, useState } from "react"
import axios from "axios"



function ProfileSecurity({className, token, setShown}) {



    const [display, setDisplay] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [DeleteingAcountConfirmation, setDeleteingAcountConfirmation] = useState(true); 
    const [Confirmation, setConfirmation] = useState(["Your account is Deleting Plaese wait", "This action is irreversible and you will lose all your data associated with this account."]);
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
        if (token) {
            axios.get(`https://www.fttran.tech/api/auth/deleteaccount/check/${token}/`,)
            .then((res) => {
            window.location = '/';
        })
        .catch((ers) => {
            if (ers.response.status == 400) {
                setConfirmation(pervState => ["Somrthing went wrong", "try Again later"]);
                const times = setTimeout(() => {
                    setDeleteingAcountConfirmation(false);
                    clearTimeout(times);
                }, 1500);
            }
            else if (ers.response.status == 403) {
                setConfirmation(pervState => ["Forbidden Try", ers.response.data.message]);
                const times = setTimeout(() => {
                    setDeleteingAcountConfirmation(false);
                    clearTimeout(times);
                }, 1500);
            }
        });
    }
    }, []);
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
            axios.post('https://www.fttran.tech/api/auth/passwordchange/', {
                old_password : OldPassword,
                new_password : NewPassword,
            }).then((res) => {
                window.location.href = '/settings';
            }).catch((err) => {
                if (err.response.status == 400){
                    setShowErrors(true);
                    setIsCurPassword(true);
                    HandelSetingErrors(err.response.data.message);
                    const times = setTimeout(() => {
                        CleanErros(err.response.data.message);
                        clearTimeout(times);
                    }, 2000)
                }
            });
        }
    }
    return (
        <div className={"h-[1093px]" + (className ? ` ${className}` : '')}>
            <div className="hidden md:block text-[20px] font-[500] font-[Outfit] opacity-80 py-[25px]"> Security</div>
            <MenuBar className="md:hidden SecuritySettings flex flex-row justify-between font-[500] font-[Outfit] py-[35px] " setShown={setShown}/>
            <div className="linksHolder p-[17px]">
                <div onClick={DisplayHandler} className="text-[16px] font-[500] font-[Outfit] text-[#219EBC] mb-[20px] cursor-pointer">Change My Passowrd</div>
                <div className="text-[16px] font-[500] font-[Outfit] text-[#219EBC] mb-[20px] cursor-pointer">Two-factor Authentication</div>
                <div onClick={DeleteHandler} className="DeleteSettingsButton text-[16px] font-[500] font-[Outfit] mb-[20px] cursor-pointer text-[#B63C3C] underline" > Delete Account</div>
               {display &&  <form action="" method="" className="relative">
                    <div className="m-[auto] py-[40px] relative px-[40px] mb-[200px] w-full max-w-[460px] border border-[#626262] rounded-[7px] bg-gradient-to-b from-[#152c2a] to-[#16181c] via-[#161c20] mt-[120px] max-sm:border-none max-sm:px-[0px] max-sm:bg-gradient-to-b max-sm:from-transparent max-sm:to-transparent max-sm:mt-[20px] max-sm:mb-[0px]">
                        <ul className="ShowErrors text-[red] list-disc list-inside">
                            {
                                ShowErrors && Errors && Errors.map((error, index) => {
                                    if ((error != PinError) && error)
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
                {token && DeleteingAcountConfirmation && 
                    <form action="" method=""  className="relative ">
                        <div className="m-[auto] py-[40px] relative px-[40px] mb-[200px] w-full max-w-[460px] border border-[#626262] rounded-[7px] bg-gradient-to-b from-[#152c2a] to-[#16181c] via-[#161c20] mt-[120px] max-sm:border-none max-sm:px-[0px] max-sm:bg-gradient-to-b max-sm:from-transparent max-sm:to-transparent max-sm:mt-[20px] max-sm:mb-[0px]">
                            <img className="w-[32px] h-[32px] absolute top-[5px] right-[5px] cursor-pointer" src={close} alt=""/>
                            <div className="flex flex-col my-[20px] justify-around items-center border-0 bg-transparent w-full h-[58px]">
                                    <h1 className="text-[18px] py-[10px]">
                                     {Confirmation[0]}
                                    </h1>
                                <p className="py-[10px] text-center">
                                    {Confirmation[1]}
                                </p>
                            </div>
                            <div className="text-white text-center mt-[80px]">
                            </div>
                        </div>
                    </form>
                }
                {deleteUser && <form action="" method="" className="relative">
                    <div className="m-[auto] py-[40px] relative px-[40px] mb-[200px] w-full max-w-[460px] border border-[#626262] rounded-[7px] bg-gradient-to-b from-[#152c2a] to-[#16181c] via-[#161c20] mt-[120px] max-sm:border-none max-sm:px-[0px] max-sm:bg-gradient-to-b max-sm:from-transparent max-sm:to-transparent max-sm:mt-[20px] max-sm:mb-[0px]">
                        <img className="w-[32px] h-[32px] absolute top-[5px] right-[5px] cursor-pointer" onClick={DeleteHandler} src={close} alt=""/>
                        <div className="flex flex-col my-[20px] justify-around items-center border-0 bg-transparent w-full h-[58px]">
                                <h1 className="text-[18px] py-[10px]">
                                {!DeleteConfirmed ?
                                    "Are you sure you want to delete your account?"
                                    : `A link just sent to your email !`
                                }
                                </h1>
                            <p className="py-[10px] text-center">
                                {!DeleteConfirmed ?
                                    "This action is irreversible and you will lose all your data associated with this account."
                                    : "Dont forget to check spam folder"
                                }
                            </p>
                        </div>
                        <div className="text-white text-center mt-[80px]">
                            <div onClick={(e) => {
                                if (!DeleteConfirmed) {
                                    e.preventDefault();
                                    setDeleteConfirmed(true)
                                    axios.get('https://www.fttran.tech/api/auth/deleteaccount/',)
                                        .then((res) => {
                                        })
                                        .catch((ers) => {
                                        });
                                }
                            }}>
                            {!DeleteConfirmed && <Button title="Confirm Delete" type="submit" bgColor=" bg-[#ff0000]"/>}</div>
                        </div>
                    </div>
                </form>}
            </div>
        </div>
    )
}

export default ProfileSecurity
