import Cookie from 'js-cookie'

function SetCookie(cookieName, token) {
    Cookie.set(cookieName, token, {
        expires: 1,
        secure: true,
        sameSite: 'strict',
        path: '/'
    })
}

export default SetCookie