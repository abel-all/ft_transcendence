import MenuBar from "./MenuBar"
import Button from "../../../components/Button"
import close from "../../../assets/imgs/close.svg"
import { useState } from "react"

function ProfileSecurity(className) {



    const [display, setDisplay] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);

    const DisplayHandler = () => {
        setDisplay(!display);
        (deleteUser) && DeleteHandler(false);
    }
    const DeleteHandler = () => {
        setDeleteUser(!deleteUser);
        (display) && setDisplay(false)
    }
    return (
        <div className={"h-[1093px]" + (className.className ? ` ${className.className}` : '')}>
            <div className="hidden md:block text-[20px] font-[500] font-[Outfit] opacity-80 py-[25px]"> Security</div>
            <MenuBar className="md:hidden SecuritySettings flex flex-row justify-between font-[500] font-[Outfit] py-[35px] " setShown={className.setShown}/>
            <div className="linksHolder p-[17px]">
                <div onClick={DisplayHandler} className="text-[16px] font-[500] font-[Outfit] text-[#219EBC] mb-[20px] cursor-pointer">Change My Passowrd</div>
                <div className="text-[16px] font-[500] font-[Outfit] text-[#219EBC] mb-[20px] cursor-pointer">Two-factor Authentication</div>
                <div onClick={DeleteHandler} className="DeleteSettingsButton text-[16px] font-[500] font-[Outfit] mb-[20px] cursor-pointer text-[#B63C3C] underline" > Delete Account</div>
                {display && <form action="" method="" className="relative">
                    <div className="m-[auto] py-[40px] relative px-[40px] mb-[200px] w-full max-w-[460px] border border-[#626262] rounded-[7px] bg-gradient-to-b from-[#152c2a] to-[#16181c] via-[#161c20] mt-[120px] max-sm:border-none max-sm:px-[0px] max-sm:bg-gradient-to-b max-sm:from-transparent max-sm:to-transparent max-sm:mt-[20px] max-sm:mb-[0px]">
                        <img className="w-[32px] h-[32px] absolute top-[5px] right-[5px] cursor-pointer" onClick={DisplayHandler} src={close} alt=""/>
                        <div className="flex my-[20px] border border-[#626262] bg-transparent w-full h-[58px]">
                            <input className="bg-transparent outline-none w-full text-[#EEEEEE] text-[16px] p-[15px] duration-70 focus:border focus:border-[#00CEFF]"
                                placeholder="Current Password"
                            />
                        </div>
                        <div className="flex border my-[20px] border-[#626262] bg-transparent w-full h-[58px]">
                            <input className="bg-transparent outline-none w-full text-[#EEEEEE] text-[16px] p-[15px] duration-70 focus:border focus:border-[#00CEFF]"
                                placeholder="New Password"
                            />
                        </div>
                        <div className="flex border my-[20px] border-[#626262] bg-transparent w-full h-[58px]">
                            <input className="bg-transparent outline-none w-full text-[#EEEEEE] text-[16px] p-[15px] duration-70 focus:border focus:border-[#00CEFF]"
                                placeholder="Confirm Password"
                            />
                        </div>
                        <div className="text-black">
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
                                <h1 className="text-[18px] py-[10px]">Are you sure you want to delete your account?</h1>
                            <p className="py-[10px] text-center">
                                This action is irreversible and you will lose all your data associated with this account.
                            </p>
                        </div>
                        <div className="text-white text-center mt-[80px]">
                            <Button
                                title="Confirm Delete"
                                type="submit"
                                bgColor=" bg-[#ff0000]"
                            />
                        </div>
                    </div>
                </form>}
            </div>
        </div>
    )
}

export default ProfileSecurity