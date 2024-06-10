import './Login.css'
import Logo_img from '../../assets/imgs/logo.png'

function Login() {

    return (
        <div className='container mx-auto relative'>
            <div className="login-container absolute">
                <div className="header">
                    <img src={Logo_img} alt="sorry" />
                </div>
                <div className="inputs flex items-center flex-col gap-3">
                    <div className="input">
                        <input placeholder='Username' type="text" />
                    </div>
                    <div className="input">
                        <input placeholder='Email' type="email" />
                    </div>
                    <div className="input">
                        <input placeholder='Password' type="password" />
                    </div>
                    <div className="input">
                        <input placeholder='Repeat Password' type="password" />
                    </div>
                </div>
                <div className="forget-password flex justify-end pr-10">
                    forget password?
                </div>

            </div>
        </div>
    )
}

export default Login;
