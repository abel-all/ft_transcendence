import Button from '../../../components/Button'

function HomeContent() {

    return (
        <div className="mt-[200px] flex flex-col gap-[30px] items-center w-full">
            <div className="text-[64px] max-md:text-[40px] max-sm:text-[31px] font-bold text-white text-center max-w-[450px]">
                Play <span className="text-[#00CEFF] font-extrabold">Ping Pong</span> Anytime, Anywhere
            </div>
            <p className="opacity-90 text-[#EEEEEE] text-center max-sm:text-[13px] max-w-[450px]">
                Ready to elevate your ping pong game? Compete in matches and tournaments on our platform to sharpen your skills and track your progress.
            </p>
            <Button width="max-w-[205px] w-full" title="Get Started" />
        </div>
    )
}
export default HomeContent;
