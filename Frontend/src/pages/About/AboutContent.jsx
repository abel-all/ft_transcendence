
const aboutItems = [
    {
        className: "text-[#eee] font-bold text-[69px] text-center mt-[45px]",
        text: "About Us",
    },
    {
        className: "text-[#009f9f] font-semibold text-[36px] text-center",
        text: "Welcom to PING!",
    },
    {
        className: "tracking-wide text-[#eee] opacity-60 text-center mx-[25px] mb-[45px] max-w-[600px]",
        text: "At PING!, we believe that ping pong is more than just a game it's a passion, a community, and a journey of self-improvement. Our mission is to create a dynamic platform where ping pong enthusiasts of all skill levels can come together , compete, and elevate their game.",
    },
]

function AboutContent() {

    return (
        <div className="bg-gradient-to-t from-[#161c20] to-[#273036] rounded-b-[5px] w-[calc(100%-84px)] max-sm:w-[100%] mx-auto mt-[200px] rounded-t-[25px] hover:scale-[1.03] duration-[600ms] shadow-[10px_10px_10px_rgba(0,0,0,0.8)] flex flex-col gap-[30px] items-center">
            {aboutItems.map((item, index) => (
                <div key={index} className={item.className}>
                    {item.text}
                </div>
            ))}
        </div>
    )
}

export default AboutContent;
