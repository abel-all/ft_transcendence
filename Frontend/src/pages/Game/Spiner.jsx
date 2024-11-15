import "./css/index.css"

const Spiner = ({ height="", spHeight="h-[50px]"}) => {

    return (
        <div className={`w-full ${height} max-w-[1000px] flex justify-center items-center`}>
            <div className={`spiner-settings w-[50px] ${spHeight} rounded-full`}></div>
        </div>
    )
}

export default Spiner
