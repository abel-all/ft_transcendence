
function Moudel(Data) {

    return (
        <div className="moudle w-[100%] h-[100%] fixed top-0 left-0 right-0 flex justify-center align-center bottom-0 bg-slate-800/[.73] z-10">
        <div className="content bg-[white] top-[200px] fixed h-[245px] text-black p-[51px] rounded-md">
            <p className="font-[600] text-[19px] text-[red] mb-[20px]">Are you sure you want to Block {Data.username}?</p>
            <button className="my-[24px] font-[700] mx-[5px] bg-[#e92828] w-[100px] h-[36px] rounded-sm text-white"  onClick={Data.toggle}>
                yes
            </button>
            <button className="my-[24px] font-[700] mx-[5px] bg-[#e92828] w-[100px] h-[36px] rounded-sm text-white" onClick={Data.toggle}>
                no
            </button>
            </div>
        </div>
    )
}

export default Moudel
