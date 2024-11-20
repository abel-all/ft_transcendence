import { useEffect, useState } from "react";
import plusIconWhite from "../../assets/imgs/plusIconWhite.svg";
import tourCreate from "../../assets/imgs/tourCreate.svg";
import { useGameSettings } from "./GameSettingsContext";
import CreateTournamentSection from "./CreateTournamentSection";

const TournamentCard = ({
  image,
  bgColor,
  iconColor,
  title,
  description,
  hoverColor,
  paramvalue
}) => {
  const gameContext = useGameSettings();

  useEffect(() => {
    console.log("vals tourns : ", paramvalue)
    if (paramvalue) joinATournament()
  }, [])

  const createNewTournament = () => {
    gameContext.setHandler("loading", true);
    gameContext.setHandler("createtour", true);
    gameContext.setHandler("jointour", false);
  };
  const joinATournament = () => {
    gameContext.setHandler("loading", true);
    gameContext.setHandler("jointour", true);
    gameContext.setHandler("createtour", false);
  };

  const clickHandler = () => {
    title === "Create new Tournament"
      ? createNewTournament()
      : joinATournament();
  };

  return (
    <div
      onClick={clickHandler}
      className={`select-none cursor-pointer w-[350px] h-[65px] bg-[#2C3134] group ${hoverColor} duration-500 rounded-[15px] flex gap-[18px] items-center pl-[18px]`}
    >
      <div
        className={`flex justify-center items-center w-[35px] h-[35px] ${bgColor} ${iconColor} duration-500 rounded-full`}
      >
        <img className="w-[25px] h-[25px]" src={image} />
      </div>
      <div className="flex flex-col">
        <div className="text-[#fff6f9] text-[18px] font-medium">{title}</div>
        <div className="text-[#fff6f9]/60 text-[14px] font-light">
          {description}
        </div>
      </div>
    </div>
  );
};

const card = [
  {
    image: tourCreate,
    bgColor: "bg-[#0f8ce9]",
    hoverColor: "hover:bg-[#0f8ce9]",
    iconColor: "first:group-hover:bg-[#005DA3]",
    title: "Create new Tournament",
    description: "create and play",
  },
  {
    image: plusIconWhite,
    bgColor: "bg-[#8A38F5]",
    hoverColor: "hover:bg-[#8A38F5]",
    iconColor: "first:group-hover:bg-[#620DD1]",
    title: "Join a Tournament",
    description: "Join and play",
  },
];

const CreateTournament = () => {
  const gameContext = useGameSettings();
  const [createTour, setCreateTour] = useState(false);
  const [joinTour, setJoinTour] = useState(false);
  const urlSearchString = location.search
  const params = new URLSearchParams(urlSearchString)
  const paramValue = params.get('param')

  useEffect(() => {
    if (gameContext.loading) {
      setTimeout(() => {
        gameContext.setHandler("loading", false);
      }, 300);
    }
    setCreateTour(gameContext.createTour);
    setJoinTour(gameContext.joinTour);
  }, [
    gameContext,
    gameContext.loading,
    gameContext.createTour,
    gameContext.joinTour,
  ]);

  return (
    <div className="h-[calc(100vh-65px)] min-h-[1300px] py-[200px] w-full flex max-md:flex-col justify-center items-center gap-[10px]">
      {!createTour && !joinTour && (
        <>
          {card.map((item, index) => (
            <TournamentCard
              key={index}
              image={item.image}
              bgColor={item.bgColor}
              iconColor={item.iconColor}
              title={item.title}
              description={item.description}
              hoverColor={item.hoverColor}
              paramvalue={paramValue}
            />
          ))}
        </>
      )}
      {createTour && !gameContext.loading && (
        <CreateTournamentSection
          title="Create new Tournament"
          callToAction="Create"
          buttonColor="bg-[#0f8ce9]"
          params={paramValue}
        />
      )}
      {joinTour && !gameContext.loading && (
        <CreateTournamentSection
          title="Join a Tournament"
          callToAction="Join"
          buttonColor="bg-[#8a38f5]"
          params={paramValue}
        />
      )}
    </div>
  );
};

export default CreateTournament;