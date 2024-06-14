import userbg from "../../../assets/imgs/userbg.png"

function UserBg() {
    return (
        <div className="userbgHolder relative">
            <img className="rounded-t-lg h-[182px] w-full" src={userbg} alt="" />
        </div>
    )
}

export default UserBg