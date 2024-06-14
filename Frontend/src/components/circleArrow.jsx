import arrow from '../assets/imgs/arrow-right.svg'

function circleArrow() {
    
    return (
        <div className="arrow-container flex relative">
            <div className="w-[26px] h-[26px] bg-[#00CEFF] rounded-full border border-black"></div>
            <img className="scale-[0.8] absolute top-[1px]" src={arrow} alt="arrow image" />
        </div>
    )
}

export default circleArrow;
