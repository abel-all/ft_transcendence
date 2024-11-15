import logo from '../assets/imgs/logo.png'
import './css/Loader.css'

const Loader = () => {
    return (
        <div className='w-full h-[100vh]'>
            <div className="h-full w-full flex flex-col justify-center items-center">
                <img className="w-[100px]" src={logo} alt="logo image" />
                <div className='w-[200px] h-[3px] bg-white relative overflow-hidden'>
                    <div className='w-full h-full absolute left-[-100%] bg-[#3EADC8] slide-in'></div>
                </div>
            </div>
        </div>
    )
}

export default Loader;