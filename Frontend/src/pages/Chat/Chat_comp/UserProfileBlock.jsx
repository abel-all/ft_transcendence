import profile from "../../../assets/imgs/chat/user-profile-01.svg"
import block from "../../../assets/imgs/chat/user-profile-x.svg"



function UserProfileBlock() {
    return (
        <div className="profileBlock absolute right-0 top-[30px] rounded-full flex flex-col">
            <div className="left-[117px] relative w-0 h-0 border-l-[7.5px] border-l-transparent border-r-[7.5px] border-r-transparent border-b-[15px] border-b-[#BFBFBF]"></div>
            <div className="w-[150px] p-[10px] border-b-[1px] border-[#626262] rounded-t-lg pl-[20px] flex flex-row bg-[#BFBFBF] viewProfile">
                <img src={profile} alt="" />
                <span className="p-[5px] text-[14px] font-[400] text-[#004455] font-[Outfit]" >View Profile</span>
            </div>
            <div className="w-[150px]  p-[10px] rounded-b-lg flex flex-row pl-[20px] bg-[#BFBFBF] blockUser">
                <img src={block} alt="" />
                <span className="p-[5px] text-[14px] font-[400] text-[#FF0000] font-[Outfit]">Block</span>
            </div>
        </div>
    )
}


export default UserProfileBlock