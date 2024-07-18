import Axios from 'axios'
import Loader from "../../components/Loader.jsx";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OauthCallBack = () => {
    
    const navigate = useNavigate();
    // const [code, setCode] = useState("");
    // const id = useParams;
    
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
            navigate("/signin", { replace: true });
        }
        else {
            const checkCode = async () => {
                if (isMounted) {
                    console.log("jjjd");
    
                    await Axios.post("https://www.fttran.tech/api/GnrToken/",{
                        user_id: paramValue,
                    }, // must edited
                    {
                        withCredentials:true,
                    }
                ).then((response) => {
                    console.log(response);
                    if (isMounted) {
                        navigate("/game", { replace: true }); // is 2fa disable must redirect them to game page
                    }
                }).catch(() => {
                    if (isMounted) {
                        console.log("catch")
                        navigate("/signin", { replace: true }); // is an error catched must redirect them to game page
                    }
                })
            }

        }
        checkCode();
    }


        return () => {
            isMounted = false;
        }
    },[navigate])

    return (
        // must receive redirect from backend, and send a request to ckeck :
        //    1- 2fa (enable): redirect them to 2fa page to provide the key,
        //      then send a request to backend include the key.
        //    2- if something wrong redirect user to sign-in page.
        <Loader />
    )
}

export default OauthCallBack;