import playWithfriendImg from '../../../assets/imgs/homeimage1.svg'
import LeaderboardsImg from '../../../assets/imgs/homeimage2.svg'
import TournamentsImg from '../../../assets/imgs/homeimage3.svg'
import PracticeModeImg from '../../../assets/imgs/homeimage4.svg'
import Card from './Card.jsx';

const cardData = [
    {
        image: playWithfriendImg,
        title: "Play with Friends",
        description: "Challenge your friends to a game of ping pong, no matter where they are!",
        actionTitle: "Invite Now",
        color: " bg-[#f6f6b3]",
    },
    {
        image: LeaderboardsImg,
        title: "Leaderboards",
        description: "Compete for the top spot and see how you rank against other players.",
        actionTitle: "View Rankings",
        color: " bg-[#f6f6b3]",
    },
    {
        image: TournamentsImg,
        title: "Tournaments",
        description: "Join exciting tournaments and compete for prizes and glory.",
        actionTitle: "Join Tournament",
        color: " bg-[#f6f6b3]",
    },
    {
        image: PracticeModeImg,
        title: "Practice Mode",
        description: "Hone your skills in practice mode with AI opponents.",
        actionTitle: "Start Practicing",
        color: " bg-[#f6f6b3]",
    }
]

function Cards() {

    return (
        <>
            <div className='text-white text-center mt-[130px] max-sm:mt-[80px] mb-[20px] font-semibold text-[20px] max-sm:text-[16px]'>Website Features :</div>
            <div className='flex justify-center items-center gap-[15px] flex-wrap mb-[200px]'>
                {cardData.map((card, index) => (
                    <Card
                        key={index}
                        image={card.image}
                        title={card.title}
                        description={card.description}
                        actionTitle={card.actionTitle}
                        color={card.color}
                    />
                ))}
            </div>
        </>
    )
}

export default Cards;
