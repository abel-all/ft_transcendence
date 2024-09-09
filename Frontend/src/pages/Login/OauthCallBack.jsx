import Axios from 'axios'
import Loader from "../../components/LoaderOntop.jsx";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/Auth.jsx';

const OauthCallBack = () => {

    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        let isMounted = true;

        // const urlSearchString = "param=1";
        // // const urlSearchString = window.location.search;
        // const params = new URLSearchParams(urlSearchString);

        // setCode(params.get("param"));
        // console.log("uuuu");
        // console.log(params.get("param"));
        const urlSearchString = location.search;
        const params = new URLSearchParams(urlSearchString);

        // Get the value of 'param' from the query parameters
        const paramValue = params.get("param");
        if (paramValue === "0") {
            auth.setHandler("login", true);
            navigate("/signin", { replace: true });
        }
        else {
            const checkCode = async () => {
                await Axios.post("https://fttran.tech/api/auth/GnrToken/",{
                    user_id: paramValue,
                }, // must edited
                {
                    withCredentials:true,
                }
                ).then(() => {
                    console.log("first request");
                    auth.setHandler("game", true);
                    navigate("/game", { replace: true }); // is 2fa disable must redirect them to game page
                }).catch((err) => {
                    console.log(err)
                    auth.setHandler("login", true);
                    navigate("/signin", { replace: true }); // is an error catched must redirect them to game page
                })

            }
            if (isMounted) {
                checkCode();
            }
        }

        return () => {
            isMounted = false;
        }
    },[auth, navigate])

    return (
        // must receive redirect from backend, and send a request to ckeck :
        //    1- 2fa (enable): redirect them to 2fa page to provide the key,
        //      then send a request to backend include the key.
        //    2- if something wrong redirect user to sign-in page.
        <Loader />
    )
}

export default OauthCallBack;
