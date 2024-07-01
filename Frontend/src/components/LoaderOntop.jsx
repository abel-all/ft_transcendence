import './css/Loader.css'

const LoaderOntop = () => {
    return (
        <div className="h-[100vh] w-full">
            <div className="w-full h-[5px] bg-transparent relative overflow-hidden">
                <div className='w-full h-full absolute left-[-100%] bg-[#3EADC8] slide-in'></div>
            </div>
        </div>
    )
}

export default LoaderOntop