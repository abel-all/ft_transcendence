import { Link } from 'react-router-dom'

function Footer() {

    return (
        <div className="Foter w-full text-center absolute bottom-0">
            <ul className="home-ul flex flex-nowrap justify-center p-6">
                <li className="text-white py-2">
                    <Link to="/about">About Us</Link>
                </li>
                <li className="text-white ml-6 py-2">
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </div>
    )
}

export default Footer;