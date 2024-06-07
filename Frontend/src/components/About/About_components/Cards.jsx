


function Cards(Data) {


    let classO = "";

    if (Data.uniqe)
        classO = Data.uniqe;




    return (
        <div className={`Card w-[19%] basis-1/4 p-[15px] ${classO} bg-[${Data.color}]`}>
            <h1 className="Title h-[146px] text-[28px] font-Outfit font-semibold text-black"> {Data.title} </h1>
            <p className="description opacity-60 text-[16px] font-Outfit font-semibold text-black"> {Data.body} </p>
            <div className="small-sides flex flex-row">
                <div className="basis-1/2 ImageHolder relative top-[48px] left-[7px]">
                    <img className="" src={Data.img} alt=""/>
                </div>
                <div className="basis-1/2 ButtonHolder relative">
                    <button className="btn-sub-about right-0 bottom-0 absolute bg-[#00CEFF] w-[42px] h-[42px] rounded-full"></button>
                </div>
            </div>
        </div>
    )
}

export default Cards