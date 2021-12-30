import styled from "styled-components"


type PreviewWrapperDivProps = {
    width?: number
}

const PreviewWrapperDiv = styled.div<PreviewWrapperDivProps>`
    width: ${props => props.width}px;
`

type PreviewDivProps = {
    hex: string
    width?: number
    height: number
}

const PreviewDiv = styled.div<PreviewDivProps>`
    width: 100%;
    max-width: ${props => props.width ? `${props.width}px` : `100%`};
    height: ${props => props.height}px;
    background-color: #${props => props.hex};
`

const HexP = styled.p`
    color: #000;
    cursor: pointer;
    padding: 5px 0;
`

type PropsType = {
    hex: string
    width?: number
    height?: number
}

const Preview: React.FC<PropsType> = ({ hex, width, height = 70 }) => {

    return (
        <PreviewWrapperDiv width={width}>
            <PreviewDiv hex={hex} width={width} height={height}>
            </PreviewDiv>
            <HexP>#{hex}</HexP>
        </PreviewWrapperDiv>
    )

}


export default Preview