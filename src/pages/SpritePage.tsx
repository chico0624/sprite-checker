import Title from "../components/Title"
import Sprite from "../components/Sprite/Sprite"
import { SpriteFormContextProvider } from "../providers/SpriteFormContext"

const SpritePage = () => {
    return (
        <SpriteFormContextProvider>
            <>
                <Title title="CSSスプライトアニメーションチェッカー"></Title>
                <Sprite></Sprite>
            </>
        </SpriteFormContextProvider>
    )
}

export default SpritePage