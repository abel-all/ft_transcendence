import Button from '../../../components/Button.jsx'
import { Link } from 'react-router-dom'

function Card(props) {

    return (
        <div className="w-[300px] h-[550px] bg-[#c9c9c9] rounded-[15px] flex flex-col justify-between items-center max-sm:w-[240px] max-sm:h-[400px] hover:scale-[1.05] duration-[400ms]">
            <img className="rounded-[15px] w-full" src={props.image} alt={props.title} />
            <div className="text-[25px] font-bold max-sm:text-[20px]" >{props.title}</div>
            <div className="text-center max-sm:text-[13px] px-[10px]">{props.description}</div>
            <Link className="mb-[15px]" to="/signup"><Button width="w-[220px]" title={props.actionTitle} bgColor={props.color} /></Link>
        </div>
    )
}


export default Card;
