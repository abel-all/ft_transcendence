import Axios from 'axios'
import Loader from "../../components/Loader.jsx";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OauthCallBack = () => {
    
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const check2Fa = async () => {
            await Axios.post("https://www.fttran.tech/api/token/", // must edited
            {
                withCredentials:true,
            }).then((response) => {
                if (isMounted) {
                    if (response.data.is_2fa_enabled) // is 2fa enable must redirect them to 2fa page
                        navigate("/2fa/verify");
                    else
                        navigate("/game", { replace: true }); // is 2fa disable must redirect them to game page
                }
            }).catch(() => {
                if (isMounted) {
                    navigate("/signin", { replace: true }); // is an error catched must redirect them to game page
                }
            })
        }

        check2Fa();

        return () => {
            isMounted = false;
        }
    }, [navigate])

    return (
        // must receive redirect from backend, and send a request to ckeck :
        //    1- 2fa (enable): redirect them to 2fa page to provide the key,
        //      then send a request to backend include the key.
        //    2- if something wrong redirect user to sign-in page.
        <Loader />
    )
}

export default OauthCallBack;