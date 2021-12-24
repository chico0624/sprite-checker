
import React, { DragEvent, useState, useCallback } from "react"
import styled, { keyframes } from "styled-components"

type SpriteDivProps = {
    width: number,
    height: number,
    backgrondImage: string,
    steps: number,
    seconds: number,
    backgroundWidth: number,
    backgroundHeight: number,
}
type SpriteKeyFrameProps = {
    backgroundWidht: number,
    backgroundHeight: number,
}

const sprite = (props: SpriteKeyFrameProps) => {
    return keyframes`
      to { background-position: ${props.backgroundWidht}px ${props.backgroundHeight}px}
    `
}

const SpriteDiv = styled.div<SpriteDivProps>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: url(${props => props.backgrondImage});
    animation: ${props => sprite({ backgroundWidht: props.backgroundWidth, backgroundHeight: props.backgroundHeight })} ${props => props.seconds}s steps(${props => props.steps}) infinite;
    z-index: 1;
  `

type PreviewDivType = {
    isDragOver: boolean
}

const PreviewDiv = styled.div<PreviewDivType>`
    position: relative;
    width: 100%;
    @media screen and (min-width:768px) {
      width: calc(50% - 10px);
    }
    &::before {
      content: '';
      display: block;
      padding-top: 100%;
    }
    border: 2px dashed #666;
    border-radius: 10px;
    padding: 20px;
    background-color: ${props => props.isDragOver ? "#b7e4c7" : "#fff"};
    overflow: hidden;
`

const DropInput = styled.input`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    opacity: 0;
    z-index: 1;
    &:hover {
      background-color: black;
    }
`

const GuidanceDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

type PropsType = {
    preview: string,
    steps: number,
    seconds: number,
    previewSize: { width: number, height: number, backgroundWidth: number, backgroundHeight: number }
    handleChangeFile: Function
}

const Preview: React.FC<PropsType> = ({ preview, steps, seconds, previewSize, handleChangeFile }) => {
    const [dragOver, setDragOver] = useState(false)

    // drag and drop
    const handleDragOver = useCallback((e: DragEvent) => {
        setDragOver(true)
        e.stopPropagation()
        e.preventDefault()
    }, [])

    const handleDrop = (e: DragEvent) => {
        setDragOver(false)
        e.stopPropagation()
    }

    const handleDragLeave = (e: DragEvent) => {
        setDragOver(false)
        e.stopPropagation()
    }

    return (
        <>
            <PreviewDiv
                draggable
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                isDragOver={dragOver}
            >
                <DropInput
                    type="file"
                    name="spriteImg"
                    onChange={(e) => handleChangeFile(e)}
                    accept="image/png,image/jpeg,image/gif"
                />
                {!preview &&
                    <GuidanceDiv>
                        ここにファイルをドロップしてください(jpeg/png/gif)
                    </GuidanceDiv>
                }
                <SpriteDiv
                    width={previewSize.width}
                    height={previewSize.height}
                    backgrondImage={preview}
                    steps={steps}
                    seconds={seconds}
                    backgroundWidth={previewSize.backgroundWidth}
                    backgroundHeight={previewSize.backgroundHeight}
                >
                </SpriteDiv>
            </PreviewDiv>
        </>
    )
}

export default Preview