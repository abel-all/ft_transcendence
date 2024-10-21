const GameEndScreen = ({ winner, score, playerNumber }) => {
  const isWinner = winner === playerNumber

  return (
    <div className="fixed z-[49] top-0 left-0 backdrop-blur w-full h-full flex justify-center items-center text-[#fff6f9] font-bold text-[80px] max-sm:text-[30px]">
      <div className="flex flex-col gap-[30px] justify-center items-center">
        <div
          className={`font-semibold text-[#fff0f9] text-[50px] max-sm:text-[35px] ${
            isWinner ? 'text-[#1e6c0e]' : 'text-[#ff0000]'
          }`}
        >
          {isWinner ? 'You Win  ' : 'You Lose  '}
          {playerNumber}
        </div>
        <div className="font-normal text-[#fff0f9] text-[38px] max-sm:text[22px]">
          {score}
        </div>
      </div>
    </div>
  )
}

export default GameEndScreen
