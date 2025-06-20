import arrowRight from '../assets/imgs/arrow-right.svg'

function OAuthButton(props) {
  const clickHandler = () => {
    if (props.imgTilte === 'google')
      window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=895845289499-jt7kib2t1n5tr6ah3oekfdp6l6i29abm.apps.googleusercontent.com&redirect_uri=http://localhost:8800/api/auth/google/callback/&response_type=code&scope=email%20profile'
    else
      window.location.href = 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-f64caba64b208f5cb8e10ed71b8c6073df6796995e4be9f5d5c07eacf1d37752&redirect_uri=http%3A%2F%2Flocalhost%3A8800%2Fapi%2Fauth%2Fintra42%2Fcallback%2F&response_type=code'
  }

  return (
    <div className="bg-[#019F9F] w-full rounded-[15px] shadow-[5px_5px_5px_rgba(0,0,0,0.4)] hover:opacity-90 duration-[600ms]">
      <button
        onClick={clickHandler}
        className="py-[8px] px-[20px] group w-full flex justify-between items-center gap-[10px]"
      >
        <div className="w-full flex gap-[13px]">
          <div className="font-medium text-[18px]">Continue With</div>
          <img src={props.image} alt={props.imgTilte + ' image'} />
        </div>
        <img
          className="transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-[600ms]"
          src={arrowRight}
        />
      </button>
    </div>
  )
}

export default OAuthButton
