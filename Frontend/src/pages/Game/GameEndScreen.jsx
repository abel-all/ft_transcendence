import imageone from "../../assets/imgs/aboutimage1.svg";
import tryImg from "../../assets/imgs/tryImg.svg";
import gamePage from "../../assets/imgs/gamePageBlack.svg";
import { useNavigate } from "react-router-dom";

const GameEndScreen = ({
  winner,
  score,
  playerNumber,
  winTournament = false,
  isOnlineGame = false,
}) => {
  const navigate = useNavigate();

  const handleTryAgainClick = () => {
    isOnlineGame === true ? navigate("/game/onlineGame") : navigate("/game/tournament")
  };
  const handleBackToGamePage = () => {
    navigate("/game");
  };

  return (
    <div className="fixed z-[49] top-0 left-0 backdrop-blur w-full h-full flex flex-col gap-20 justify-center items-center">
      <div className="flex flex-col gap-[30px] justify-center items-center">
        {winTournament && (
          <figure>
            <img src={imageone} alt="trofy image" />
          </figure>
        )}
        <div
          className={`font-semibold text-[50px] max-sm:text-[35px] ${
            winner === playerNumber ? "text-[#1e6c0e]" : "text-[#ff0000]"
          }`}
        >
          {winner === playerNumber ? "You Win" : "You Lose"}
        </div>
        <div
          className={`font-normal text-[38px] max-sm:text[22px] ${
            winner === playerNumber ? "text-[#1e6c0e]" : "text-[#ff0000]"
          }`}
        >
          {winner === playerNumber ? "+50 xp" : "0 xp"}
        </div>
        <div className="font-normal text-[#fff0f9] text-[38px] max-sm:text[22px]">
          {score}
        </div>
      </div>
      <div className="flex gap-3 items-center max-md:flex-col">
        <button
          onClick={handleTryAgainClick}
          className="w-60 py-1 px-3 rounded-md text-[#000000] bg-[#fff] flex justify-between items-center"
        >
          <div>Try again</div>
          <img className="w-6 h-6" src={tryImg} alt="try again icon" />
        </button>
        <div className="text-[#fff]">Or</div>
        <button
          onClick={handleBackToGamePage}
          className="w-60 py-1 px-3 rounded-md text-[#000000] bg-[#fff] flex justify-between items-center"
        >
          <div>Back to game page</div>
          <img className="w-6 h-6" src={gamePage} alt="game page icon" />
        </button>
      </div>
    </div>
  );
};

export default GameEndScreen;
