import NavActive from "../../../components/NavActive"

function ProfileNavBottom() {
    return (
        <div className=" ProfileSectionsBottom md:hidden fixed bottom-0 right-0 left-0 bg-[#2D3C40] w-full mt-[10px] h-[66px]">
        <ul className="flex flex-row justify-around  py-[10px] gap-5">
            <NavActive active = "UserIcon"/>
        </ul>
        </div>
    )
}

export default ProfileNavBottom