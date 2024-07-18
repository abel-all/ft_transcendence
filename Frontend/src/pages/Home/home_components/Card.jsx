import Button from '../../../components/Button.jsx'
import { Link } from 'react-router-dom'

function Card(props) {

    return (
        <div className="w-[300px] bg-[#273036] rounded-[15px] p-[10px] flex flex-col gap-[10px] max-sm:w-full hover:scale-[1.05] duration-[600ms]">
            <div className='w-full h-[200px] relative overflow-hidden rounded-[10px]'>
                <img className="absolute w-full top-[-32px] max-sm:top-[-80px] max-LastSize:top-[-32px]" src={props.image} alt={props.title} />
            </div>
            <div className="text-[25px] font-medium max-sm:text-[20px] text-[#eee]" >{props.title}</div>
            <div className="max-sm:text-[13px] text-[#eee] opacity-80 tracking-wide">{props.description}</div>
            <Link className="mt-[30px]" to="/signup"><Button width="w-full" title={props.actionTitle} bgColor={props.color} /></Link>
        </div>
    )
}


export default Card;
