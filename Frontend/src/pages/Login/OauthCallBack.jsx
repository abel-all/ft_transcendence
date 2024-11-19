import Axios from 'axios'
import Loader from '../../components/LoaderOntop.jsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/Auth.jsx'

const OauthCallBack = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  useEffect(() => {
    let isMounted = true
    const urlSearchString = location.search
    const params = new URLSearchParams(urlSearchString)
    const paramValue = params.get('param')
    if (paramValue === '0') {
      auth.setHandler('login', true)
      navigate('/signin', { replace: true })
    } else {
      const checkCode = async () => {
        await Axios.post(
          'http://localhost:8800/api/auth/GnrToken/',
          {
            user_id: paramValue,
          },
          {
            withCredentials: true,
          }
        )
          .then(() => {
            auth.setHandler('game', true)
            navigate('/profile', { replace: true }) // is 2fa disable must redirect them to game page
          })
          .catch(() => {
            auth.setHandler('login', true)
            navigate('/signin', { replace: true }) // is an error catched must redirect them to game page
          })
      }
      if (isMounted) {
        checkCode()
      }
    }

    return () => {
      isMounted = false
    }
  }, [auth, navigate])

  return (
    <Loader />
  )
}

export default OauthCallBack
