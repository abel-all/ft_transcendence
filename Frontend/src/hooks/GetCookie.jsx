import Cookie from 'js-cookie'

function GetCookie(cookieName) {
    return Cookie.get(cookieName)
}

export default GetCookie