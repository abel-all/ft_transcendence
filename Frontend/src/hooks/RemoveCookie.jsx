import Cookie from 'js-cookie'

function RemoveCookie(cookieName) {
    return Cookie.remove(cookieName)
}

export default RemoveCookie