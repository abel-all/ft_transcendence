import Navb from "./About_components/Navb"
import Content from "./About_components/Content"
import Cards from "./About_components/Cards"
import Cup from "../../assets/Cup.png"
import Sienz from "../../assets/sienz.png"
import Throne from "../../assets/throne.png"
import GameBoeard from "../../assets/gameBoeard.png"
import Card from "../../assets/Cards.json"

function About() {

    let comps = [Cup, Sienz, Throne, GameBoeard];

    return (
        <div className="About w-[100% - 15.74%] mx-[15.74%] h-full">
            <Navb/>
            <Content/>
            <div className="About-Cards space-x-2 mx-[35px] flex flex-row">
            {
                Card.map( card => {
                    return (
                        <Cards
                            title    = {card.title}
                            body     = {card.body}
                            img      = {comps[card.id]}
                            uniqe    = {card.uniqe}
                            color    = {card.color}
                        />
                    )
                })
            }
            </div>
        </div>
    )
}

export default About

