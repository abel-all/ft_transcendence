import userslist from "../../../assets/OnlineUsers.json"
import user1 from "../../../assets/users/user (1).png"
import user2 from "../../../assets/users/user (2).png"
import user3 from "../../../assets/users/user (3).png"
import user4 from "../../../assets/users/user (4).png"
import user5 from "../../../assets/users/user (5).png"
import user6 from "../../../assets/users/user (6).png"
import user7 from "../../../assets/users/user (7).png"
import user8 from "../../../assets/users/user (8).png"
import user9 from "../../../assets/users/user (9).png"
import user10 from "../../../assets/users/user (10).png"
import user11 from "../../../assets/users/user (11).png"

const imageMap = {
    "user1": user1,
    "user2": user2,
    "user3": user3,
    "user4": user4,
    "user5": user5,
    "user6": user6,
    "user7": user7,
    "user8": user8,
    "user9": user9,
    "user10": user10,
    "user11": user11,
  };

function Userlist() {
    return (
        <>
            {userslist.map((online) => {
                return (
                    <div key={online.id} className="ActiveUser mx-[5px] mb-[10px] w-[53.85px] h-[53.85px] relative">
                        <img className="w-[53.85px] h-[53.85px] rounded-full" src={imageMap[online.url]} alt="" />
                        <span className="StatusActive bg-[#00FF00] absolute rounded-full right-[2px] bottom-0 w-[10px] h-[10px]"></span>
                    </div>
                );
            })}
        </>
    );
}

export default Userlist;
