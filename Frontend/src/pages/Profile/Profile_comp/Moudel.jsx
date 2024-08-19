import axios from "axios";



function Buttn({toggles, rsn, user, content}) {

    const handelClick = () => {
        if (rsn == "Block") {
            console.log(`${user} is blocked`);
            axios.post('https://fttran.tech/api/profile/block-friend/', {
                username : user,
            }).then((response) => {
                console.log("user block sent with suecsses!");
            }).catch((error) => {
                console.log("user block failed !");
            });
        } else if (rsn == "Unblock") {
            console.log(`${user} is Unblocked`);
            axios.post('https://fttran.tech/api/profile/unblock-friend/', {
                username : user,
            }).then((response) => {
                console.log("user Unblock sent with suecsses!");
            }).catch((error) => {
                console.log("user Unblock failed !");
            });
        }
        toggles();
    } 
    return (
        <>
            <div className="my-[24px] flex justify-center items-center font-[700] mx-[5px] bg-[#e92828] w-[100px] h-[36px] rounded-sm text-white"  onClick={handelClick}>
                <span>{content}</span>
            </div>
        </>
    )
}

function Moudel(Data) {

    return (
        <div className="moudle w-[100%] h-[100%] fixed top-0 left-0 right-0 flex justify-center align-center bottom-0 bg-slate-800/[.73] z-10">
            <div className="w-[100%] h-[100%] absolute" onClick={Data.tggl}></div>
            <div className="content bg-[white] top-[200px] fixed h-[245px] text-black p-[51px] rounded-md">
                <p className="font-[600] text-[19px] text-[red] mb-[20px]">{Data.message} {Data.username}?</p>
                <div className="flex flex-row justify-center">
                    {<Buttn content="Yes" toggles={Data.tggl} rsn={Data.reason} user={Data.username}/>}
                    {<Buttn content="No" toggles={Data.tggl}/>}
                </div>
            </div>
        </div>
    )
}

export default Moudel
