
const badgeConverter = (badge) => {

    switch (badge) {
        case "BRONZE" :
            return "bg-[#CD7F32]"
        case "SILVER" :
            return "bg-[#C0C0C0]"
        case "GOLD" :
            return "bg-[#FFD700]"
        case "PLATINUM" :
            return "bg-[#A0B2C6]"
        case "DIAMOND" :
            return "bg-[#B9F2FF]"
        case "HEROIC" :
            return "bg-[#CB3401]"
        case "GRAND_MASTER" :
            return "bg-[#FF0000]"
        default:
            return "bg-[#ffffff]"
    }

}

export const toBadgeConverter = (badge) => {

    switch (badge) {
        case "BRONZE" :
            return "to-[#CD7F32]"
        case "SILVER" :
            return "to-[#C0C0C0]"
        case "GOLD" :
            return "to-[#FFD700]"
        case "PLATINUM" :
            return "to-[#A0B2C6]"
        case "DIAMOND" :
            return "to-[#B9F2FF]"
        case "HEROIC" :
            return "to-[#CB3401]"
        case "GRAND_MASTER" :
            return "to-[#FF0000]"
        default:
            return "to-[#ffffff]"
    }

}

export const scoreConverter = (score) => {
    switch (score) {
        case "Three" :
            return 3
        case "Five" :
            return 5
        case "Eleven" :
            return 11
        case "Fifteen" :
            return 15
    }
}

export const mapColorConverter = (mapColor) => {
    switch (mapColor) {
        case "Default" :
            return "#1F1F1F"
        case "Classic" :
            return "#4A9E3C"
        case "Ocean" :
            return "#005477"
        case "Granite" :
            return "#676767"
    }
}

export const paddleAndBallColorConverter = (paddleAndBallColor) => {
    switch (paddleAndBallColor) {
        case "Default" :
            return {paddleColor: "#92B2E4", ballColor: "#D7CACA"}
        case "Thunderstrike" :
            return {paddleColor: "#D7C040", ballColor: "#ECEBE8"}
        case "SpinMaster" :
            return {paddleColor: "#C1243C", ballColor: "#FBC12A"}
        case "Lightning" :
            return {paddleColor: "#4D4D4D", ballColor: "#FCB13B"}
    }
}


export default badgeConverter