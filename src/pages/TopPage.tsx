import Title from "../components/Title"
import styled from "styled-components"
import LinkCard from "../components/LinkCard"
import { NAVI } from "../constants/navi"

const LinkListDiv = styled.div`
    width: 100%;
    & > div{
        margin-bottom: 20px;
    }
`

const TopPage = () => {
    return (
        <>
            <Title title="ツール一覧"></Title>
            <aside>
                <LinkListDiv>
                    {NAVI.map(n => {
                        return (<div key={n.to}><LinkCard
                            to={n.to}
                            title={n.title}
                            description={n.description}
                            icon={n.icon}
                        >
                        </LinkCard></div>
                        )
                    })}
                </LinkListDiv>
            </aside>
        </>
    )
}

export default TopPage