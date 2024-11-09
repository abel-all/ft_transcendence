import imageone from '../../assets/imgs/aboutimage1.svg'

const GameEndScreen = ({ winner, score, playerNumber, winTournament=false }) => {
  // const isWinner = winner === playerNumber
  // const color = winner === playerNumber ? 'text-[#1e6c0e]' : 'text-[#ff0000]'

  return (
    <div className="fixed z-[49] top-0 left-0 backdrop-blur w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-[30px] justify-center items-center">
        {winTournament && <figure>
          <img src={imageone} alt="trofy image" />
        </figure>}
        <div
          className={`font-semibold text-[50px] max-sm:text-[35px] ${winner === playerNumber ? 'text-[#1e6c0e]' : 'text-[#ff0000]'}`}
        >
          {winner === playerNumber ? 'You Win  ' : 'You Lose  '}
          {playerNumber}
        </div>
        <div className={`font-normal text-[38px] max-sm:text[22px] ${winner === playerNumber ? 'text-[#1e6c0e]' : 'text-[#ff0000]'}`}>
          {winner === playerNumber ? '+50 xp' : '0 xp'}
        </div>
        <div className="font-normal text-[#fff0f9] text-[38px] max-sm:text[22px]">
          {score}
        </div>
        {winTournament && <button className='text-[#eee] text-[30px] max-sm:text-[22px] rounded-[12px] font-extralight p-[10px] bg-[#ffca61]'>
          Back to game!
        </button>}
      </div>
    </div>
  )
}

export default GameEndScreen
