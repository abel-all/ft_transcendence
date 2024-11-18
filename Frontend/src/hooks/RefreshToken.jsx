import Axios from "axios"
import { useNavigate } from "react-router-dom"

const RefreshToken = () => {

  const navigate = useNavigate();

  const refreshTheToken = async () => {
    await Axios.get('http://localhost:8800/api/auth/token/refresh/', {
      withCredentials: true,
    })
      .then(() => {
        console.log('your tocken is refreshed successfully')
      })
      .catch(() => {
        navigate("/signin", { replace: true })
      })
  }
  refreshTheToken();
}

export default RefreshToken;