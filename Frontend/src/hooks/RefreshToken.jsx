import Axios from "axios"
import { useNavigate } from "react-router-dom"

const RefreshToken = async () => {

  const navigate = useNavigate();

    await Axios.get('http://localhost:8800/api/auth/token/refresh/', {
      withCredentials: true,
    })
      .then(() => {
        console.log('second request')
        // setIsAuth(true)
      })
      .catch((err) => {
        console.log(err)
        navigate("/signin", { replace: true })
        // setIsAuth(false)
      })
  }

export default RefreshToken;