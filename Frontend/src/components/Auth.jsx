import SetCookie from '../hooks/SetCookie'
import GetCookie from '../hooks/GetCookie'
import RemoveCookie from '../hooks/RemoveCookie'

function isAuthenticated() {
    return (!!GetCookie('jwt_token'))
}

function login(token) {
    SetCookie('jwt_token', token)
}

function logout() {
    RemoveCookie('jwt_token')
}

export { isAuthenticated, login, logout }