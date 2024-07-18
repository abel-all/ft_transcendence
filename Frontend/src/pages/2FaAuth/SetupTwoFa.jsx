import TwoFaAuthPassStep from "./TwoFaAuthPassStep";
import TwoFaAuthStep1 from "./TwoFaAuthStep1";
import TwoFaAuthStep2 from "./TwoFaAuthStep2";
import TwoFaAuthStep3 from "./TwoFaAuthStep3";
import { TwoFaContextProvider } from "./TwoFaContext"
import { useTwoFaContext } from "./TwoFaContext"


const TwoFaSteps = () => {

    const TwoFaContext = useTwoFaContext();

    return (
        <>
            {TwoFaContext.isPass && <TwoFaAuthPassStep />}
            {TwoFaContext.isStep1 && <TwoFaAuthStep1 />}
            {TwoFaContext.isStep2 && <TwoFaAuthStep2 />}
            {TwoFaContext.isStep3 && <TwoFaAuthStep3 />}
        </>
    )
}

const SetupTwoFa = () => {

    return (
        <TwoFaContextProvider>
            <TwoFaSteps />
        </TwoFaContextProvider>
    )
}

export default SetupTwoFa