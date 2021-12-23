import { ChangeEvent, DragEvent, useCallback, useState } from "react"
import styled, { keyframes } from "styled-components"


const SpriteWrapperDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
`

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
  border: 1px dashed #666;
  border-radius: 10px;
  padding: 20px;
  background-color: ${props => props.isDragOver ? "#caf0f8": "#fff"};
  overflow: hidden;
`

const FormDiv = styled.div`
  width: 100%;
  @media screen and (min-width:768px) {
    width: calc(50% - 10px);
  }
  div {
    margin-bottom: 20px;
  }
  label {
    display: block;
  }
`

const FormTable = styled.table`
  border-collapse: collapse;
  text-align: left;
  td,th {
    border: 1px solid #666;
    padding: 10px;
  }
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

const Sprite = () => {
  const [preview, setPreview] = useState('');
  const [previewSize, setPreviewSize] = useState({
    width: 0,
    height: 0,
    backgroundWidth: 0,
    backgroundHeight: 0,
  })
  const [steps, setSteps] = useState(1)
  const [seconds, setSeconds] = useState(1)
  const [dragOver, setDragOver] = useState(false)

  const handleChangeFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files) {
      const objectUrl = window.URL.createObjectURL(files[0])

      // サイズ取得
      let img = new Image()
      img.onload = function () {

        if (img.width > img.height) {
          setPreviewSize(
            {
              width: img.width / steps,
              height: img.height,
              backgroundWidth: -img.width,
              backgroundHeight: 0,
            }
          )
        } else {
          setPreviewSize(
            {
              width: img.width,
              height: img.height / steps,
              backgroundWidth: 0,
              backgroundHeight: -img.height,
            }
          )
        }
      };
      img.src = objectUrl;
      setPreview(objectUrl)
    }
  }, [steps])

  const handleChangeSteps = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    const num = parseInt(value)

    if (previewSize.backgroundWidth !== 0) {
      setPreviewSize(
        {
          ...previewSize,
          width: -previewSize.backgroundWidth / num,
        }
      )
    } else {
      setPreviewSize(
        {
          ...previewSize,
          height: -previewSize.backgroundHeight / num,
        }
      )
    }
    setSteps(num)
  }

  const handleChangeSeconds = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setSeconds(parseFloat(value))
  }

  // drag and drop
  const handleDragOver = useCallback((e: DragEvent) => {
    setDragOver(true)
    e.stopPropagation()
    e.preventDefault()
  }, [dragOver])

  const handleDrop = (e:DragEvent) => {
    setDragOver(false)
    e.stopPropagation()
  }

  const handleDragLeave = (e:DragEvent) => {
    console.log("aaa")
    setDragOver(false)
    e.stopPropagation()
  }

  return (
    <SpriteWrapperDiv>
      <PreviewDiv
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        isDragOver={dragOver}
      >
        <DropInput
          type="file"
          name="spriteImg"
          onChange={handleChangeFile}
          accept="image/png,image/jpeg,image/gif"
        />
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

      <FormDiv>
        <div>
          <input
            type="range"
            id="spriteSteps"
            name="spriteSteps"
            min="1"
            max="30"
            value={steps}
            onChange={handleChangeSteps}
          />
          <label htmlFor="spriteSteps">ステップ数 : {steps}</label>
        </div>
        <div>
          <input
            type="range"
            id="spriteSteps"
            name="spriteSteps"
            min="1"
            max="10"
            step="0.1"
            value={seconds}
            onChange={handleChangeSeconds}
          />
          <label htmlFor="spriteSteps">秒数 : {seconds} sec</label>
        </div>
        <FormTable>
          <tbody>
            <tr>
              <th>横幅</th><td>{previewSize.width}</td>
            </tr>
            <tr>
              <th>高さ</th><td>{previewSize.height}</td>
            </tr>
            <tr>
              <th>背景移動距離（横）</th><td>{previewSize.backgroundWidth}</td>
            </tr>
            <tr>
              <th>背景移動距離（縦）</th><td>{previewSize.backgroundHeight}</td>
            </tr>
          </tbody>
        </FormTable>
      </FormDiv>
    </SpriteWrapperDiv>
  )
}


export default Sprite
