import Title from "../components/Title"
import Sprite from "../components/Sprite/Sprite"
import { SpriteFormContextProvider } from "../providers/SpriteFormContext"

const SpritePage = () => {
    return (
        <SpriteFormContextProvider>
            <>
                <Title title="CSS スプライトアニメーション"></Title>
                <Sprite></Sprite>
            </>
        </SpriteFormContextProvider>
    )
}

export default SpritePage