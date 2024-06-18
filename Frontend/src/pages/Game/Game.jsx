import Header from "../../components/Header.jsx"
import BottomNaveBar from "../../components/BottomNavBar.jsx"
import imageone from '../../assets/imgs/gameimage1.svg'
import imagetwo from '../../assets/imgs/gameimage2.svg'
import imagethree from '../../assets/imgs/gameimage3.svg'
import Card from './Card.jsx'

function Game() {

    return (
        <div className="container mx-auto px-[10px]">
            <Header title="Game" activeSection="GametableIcon" />
            <div className="mx-[100px] my-[100px] max-sm:mx-[10px]">
                <div className="bg-[#8374D1] px-[30px] pt-[10px] mb-[5px] rounded-t-[50px] flex justify-between max-lg:block hover:scale-[1.03] duration-[400ms] shadow-[10px_10px_10px_rgba(0,0,0,0.4)]">
                    <div>
                        <div className="text-white font-bold">1 vs 1</div>
                        <div className="font-semibold text-[56px] max-w-[660px] mb-[25px] max-sm:text-[35px]">
                            Prove Your Mettle Against Real Opponents!
                        </div>
                        <div className="font-normal text-[27px] max-w-[330px] opacity-80 mb-[40px] max-sm:text-[18px]">
                            Step into the arena and challenge skilled players from around the world.
                        </div>
                    </div>
                    <div className="max-lg:flex max-lg:justify-end">
                        <img src={imageone} alt="play oing pong game" />
                    </div>
                </div>
                <div className="flex flex-wrap gap-[5px]">
                    <Card bgColor="bg-[#FF974A]" rounded="rounded-bl-[50px] max-md:rounded-none" title="1 vs BOT" description="Face the Ultimate AI Challenger!" image={imagetwo} />
                    <Card bgColor="bg-[#A8293F]" rounded="rounded-br-[50px] max-md:rounded-b-[50px]" title="Tournament" description="Enter the Battlefield of Champions!" image={imagethree} />
                </div>
            </div>
            <BottomNaveBar activeSection="GametableIcon" />
        </div>
    )
}


export default Game;
