import Button from '../../Assets/Button'

function HomeContent() {

    return (
        <div className="HomeContent block mt-[17%] mx-[18%] max-SmallSize:mx-[0%]">
            <h1 className="text-[64px] max-OurSize:text-[42px] max-lg:text-[51px] text-center text-white">
                Embrace the Ping Pong Challenge!
            </h1>
            <span className="opacity-90 block max-OurSize:px-[0px] text-xl text-[#EEEEEE] pt-[20px] px-[15%] text-center w-full">
                Ready to elevate your ping pong game? Compete in matches and tournaments on our platform to sharpen your skills and track your pro gress.
            </span>
            <Button/>
        </div>
    )
}

export default HomeContent;