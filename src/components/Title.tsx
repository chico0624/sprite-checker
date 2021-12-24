
import styled from "styled-components"

const H1 = styled.h1`
    margin: 20px;
    text-align: center;
`

type PropsType = {
    title: string
}

const Title: React.FC<PropsType> = ({ title }) => {
    return (
        <H1>{title}</H1>
    )
}

export default Title