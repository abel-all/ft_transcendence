import Card from './Card.jsx'
import imageone from '../../assets/imgs/aboutimage1.svg'
import imagetwo from '../../assets/imgs/aboutimage2.svg'
import imagethree from '../../assets/imgs/aboutimage3.svg'
import imagefour from '../../assets/imgs/aboutimage4.svg'

const cardData = [
    {
        bgColor: "bg-[#7DAA48]",
        image: imageone,
        title: 'Competitive Matches and Tournaments',
        description: "Whether you're a beginner or a pro, you'll find matches and tournaments that suit your skill level. Compete for fun, bragging rights, and exciting prizes."
    },
    {
        bgColor: "bg-[#8374D1]",
        image: imagethree,
        title: 'Detailed Performance Tracking',
        description: "Our advanced analytics tools help you track your progress, analyze your performance, and set new goals to improve your game.",
    },
    {
        bgColor: "bg-[#E04154]",
        image: imagetwo,
        title: 'Global Community',
        description: "Connect with players from around the world. Share tips, challenge each other, and make lasting friendships with fellow ping pong enthusiasts.",
    },
    {
        bgColor: "bg-[#D9D9D9]",
        image: imagefour,
        title: 'Join Us',
        description: "Whether you're looking to play casually or compete at a high level, PING! is the perfect place to start. Sign up today and join a global network of players who share your love for the game.",
    }
]

function Cards() {

    return (
        <div className='mb-[200px] mt-[10px] flex justify-between w-[calc(100%-84px)] mx-auto gap-[10px] flex-wrap max-sm:w-[100%]'>
            {cardData.map((card, index) => (
                <Card
                    key={index}
                    bgColor={card.bgColor}
                    image={card.image}
                    title={card.title}
                    description={card.description}
                />
            ))}
        </div>
    )
}

export default Cards;
