import { Link } from "react-router-dom"




function Page404() {
    return (
        <>
            <div className="w-[100%] h-[100%] text-[70px] py-[250px] text-center text-white ">
                Got lost?
                <div className="flex text-[50px] p-[25px] items-center mt-[200px] justify-center ">
                    <Link className="block center rounded-full bg-white text-black " to="/"> {"Take me home:-)"}</Link>
                </div>
            </div>
        </>
    )
}

export default Page404