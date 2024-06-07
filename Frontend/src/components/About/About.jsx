import Navb from "./About_components/Navb"
import Content from "./About_components/Content"
import Cards from "./About_components/Cards"
import Cup from "../../assets/Cup.png"
import Sienz from "../../assets/sienz.png"
import Throne from "../../assets/throne.png"
import GameBoeard from "../../assets/gameBoeard.png"


function About() {
    return (
        <div className="About w-[100% - 15.74%] mx-[15.74%] h-full">
            <Navb/>
            <Content/>
            <div className="About-Cards space-x-2 mx-[35px] flex flex-row">
            <Cards
                    title    = "Competitive Matches and Tournaments"
                    body     = "Whether you're a beginner or a pro, you'll find matches and tournaments that suit your skill level. Compete for fun, bragging rights, and exciting prizes."
                    img      = {Cup}
                    uniqe    = "rounded-bl-lg"
                    color    = "#7DAA48"
                />
                <Cards
                    title    = "Detailed Performance Tracking"
                    body     = "Our advanced analytics tools help you track your progress, analyze your performance, and set new goals to improve your game."
                    img      = {Sienz}
                    uniqe    = ""
                    color    = "#8374D1"
                />
                <Cards
                    title    = "Global Community"
                    body     = "Connect with players from around the world. Share tips, challenge each other, and make lasting friendships with fellow ping pong enthusiasts."
                    img      = {Throne}
                    uniqe    = ""
                    color    = "#E04154"
                />
                <Cards
                    title    = "Join Us"
                    body     = "Whether you're looking to play casually or compete at a high level, PING! is the perfect place to start. Sign up today and join a global network of players who share your love for the game."
                    img      = {GameBoeard}
                    uniqe    = "rounded-br-lg"
                    color    = "#D9D9D9"
                />

            </div>
        </div>
    )
}

export default About

