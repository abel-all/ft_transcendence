import Axios from 'axios'
import Loader from "../../components/Loader.jsx";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OauthCallBack = () => {
    
    const navigate = useNavigate();
    useEffect(() => {
        const FetchData = async () => {
            await Axios.post("http://ip:8090/api/token")
            .then(response => {
                console.log(response);
                if (response.status == 200 || response.status == 304) {
                    navigate("/signin");
                }
                else {
                    console.error("Please try again")
                }
            }).catch(err => {
                console.error(err);
            })
        };
        FetchData();
    }, [navigate])
    
    return (
        <Loader />
    )
}

export default OauthCallBack;