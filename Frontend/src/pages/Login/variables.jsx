import ftImage from '../../assets/imgs/42.svg'
import googleImage from '../../assets/imgs/google.svg'

const signInFieldProps = [
    {
        placeHolder: "Email", type: "email"
    },
    {
        placeHolder: "Password", type: "password"
    }
]

const itemData = [
    {
        className: "w-[166px] h-[1px] bg-[#626262]",
        content: ""
    },
    {
        className: "text-[#EEEEEE] px-[8px] text-[16px] font-normal",
        content: "Or"
    },
    {
        className: "w-[166px] h-[1px] bg-[#626262]",
        content: ""
    }
]

const oAuthItems = [
    {
        image: ftImage, imgTilte: "42"
    },
    {
        image: googleImage, imgTilte: "google"
    }
]

const signUpFieldProps = [
    {
        placeHolder: "First Name", type: "text"
    },
    {
        placeHolder: "Last Name", type: "text"
    },
    {
        placeHolder: "Username", type: "text"
    },
    {
        placeHolder: "Email", type: "email"
    },
    {
        placeHolder: "Password", type: "password"
    },
]

const fieldReGex = {
    nameReGex: /^[a-zA-Z-]{2,16}$/,
    usernameReGex: /^[a-zA-Z0-9_]{3,16}$/,
    emailReGex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,8}$/,
    passwordReGex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
}

export {signInFieldProps, itemData, oAuthItems, signUpFieldProps, fieldReGex}
