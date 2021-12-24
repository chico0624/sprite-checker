import { Link } from "react-router-dom"
import Title from "../components/Title"
import styled from "styled-components"
import LinkCard from "../components/LinkCard"
import { ICONS } from "../constants/icons"

const LinkListDiv = styled.div`
    width: 100%;
`

const TopPage = () => {
    return (
        <>
            <Title title="ツール一覧"></Title>
            <aside>
                <LinkListDiv>
                    <LinkCard
                        to="sprite"
                        title="CSSスプライトアニメーションチェッカー"
                        description="スプライト画像を、ただ動かすだけのページ。ステップ数/秒数の指定のみ可能。"
                        icon={ICONS.pig}
                    >
                    </LinkCard>
                </LinkListDiv>
            </aside>
        </>
    )
}

export default TopPage