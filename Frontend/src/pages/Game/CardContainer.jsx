import imageone from '../../assets/imgs/gameimg1.svg'
import imagetwo from '../../assets/imgs/gameimg2.svg'
import imagethree from '../../assets/imgs/gameimg3.svg'
import imagefour from '../../assets/imgs/gameimg4.svg'
import Card from './Card.jsx'

const cardsData = [
    {
        route: "play/online",
        bgColor: "playonline-bg-gradient",
        title: "Play Online",
        description: "Play vs a person of similar skill",
        image: imageone,
    },
    {
        route: "/",
        bgColor: "ai-bg-gradient",
        title: "Computer",
        description: "Challenge a bot from Easy to Master",
        image: imagetwo,
    },
    {
        route: "/",
        bgColor: "playfriend-bg-gradient",
        title: "Play a Friend",
        description: "Invite a friend to a game of ping pong",
        image: imagethree,
    },
    {
        route: "/",
        bgColor: "tournm-bg-gradient",
        title: "Tournaments",
        description: "Join an Arena where anyone can win",
        image: imagefour,
    },
];

function CardContainer() {

    return (
        <div className="mx-[50px] my-[400px] max-md:mx-[0px] max-sm:mt-[300px] flex gap-x-[15px] gap-y-[162px] flex-wrap justify-center">
            {cardsData.map((card, index) => (
                <Card
                    key={index}
                    route={card.route}
                    bgColor={card.bgColor}
                    title={card.title}
                    description={card.description}
                    image={card.image}
                />
            ))}
        </div>
    )
}

export default CardContainer;
