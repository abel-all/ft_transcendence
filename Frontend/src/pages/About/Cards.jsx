import Card from './Card.jsx'
import imageone from '../../assets/imgs/aboutimage1.svg'
import imagetwo from '../../assets/imgs/aboutimage2.svg'
import imagethree from '../../assets/imgs/aboutimage3.svg'
import imagefour from '../../assets/imgs/aboutimage4.svg'

const cardData = [
    {
        image: imageone,
        title: 'Competitive Matches and Tournaments',
    },
    {
        image: imagethree,
        title: 'Detailed Performance Tracking',
    },
    {
        image: imagetwo,
        title: 'Global Community',
    },
    {
        image: imagefour,
        title: 'Join Us',
    }
]

function Cards() {

    return (
        <div className='mb-[200px] mt-[10px] flex justify-between w-[calc(100%-84px)] mx-auto gap-[10px] flex-wrap max-sm:w-[100%]'>
            {cardData.map((card, index) => (
                <Card
                    key={index}
                    image={card.image}
                    title={card.title}
                />
            ))}
        </div>
    )
}

export default Cards;
