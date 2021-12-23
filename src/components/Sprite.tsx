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
  border: 2px dashed #666;
  border-radius: 10px;
  padding: 20px;
  background-color: ${props => props.isDragOver ? "#b7e4c7" : "#fff"};
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
  width: 100%;
  text-align: left;
  td,th {
    border: 1px solid #cacaca;
    padding: 10px 20px;
  }
  th {
    width: 50%;
    font-weight: normal;
  }
  td {
    text-align: right;
  }
`
const FormLabel = styled.label`
  display: block;
  margin-bottom: 20px;
  padding-left: 1em;
  border-left: 5px solid #52b788;
  font-weight: bold;
`

const RangeInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  background-color: #95d5b2;
  height: 14px;
  width: 100%;
  border-radius: 10px;
  border: solid 3px #dff1ff;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #52b788;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  }
  &::-moz-range-thumb {
    background: #52b788;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
    border: none;
  }
  &::-moz-focus-outer {
    border: 0;
  }
  &:active::-webkit-slider-thumb {
    box-shadow: 0px 5px 10px -2px rgba(0, 0, 0, 0.3);
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

const GuidanceDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

  const handleDrop = (e: DragEvent) => {
    setDragOver(false)
    e.stopPropagation()
  }

  const handleDragLeave = (e: DragEvent) => {
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

      <FormDiv>
        <div>
          <FormLabel
            htmlFor="spriteSteps"
          >
          アニメーションのステップ数
          </FormLabel>
          <RangeInput
            type="range"
            id="spriteSteps"
            name="spriteSteps"
            min="1"
            max="50"
            value={steps}
            onChange={handleChangeSteps}
          />
        </div>
        <div>
        <FormLabel
            htmlFor="spriteSteps"
          >
          アニメーションが完了するまでの時間
          </FormLabel>
          <RangeInput
            type="range"
            id="spriteSeconds"
            name="spriteSeconds"
            min="1"
            max="10"
            step="0.1"
            value={seconds}
            onChange={handleChangeSeconds}
          />
        </div>
        <FormTable>
          <tbody>
            <tr>
              <th>ステップ数</th><td>{steps}</td>
            </tr>
            <tr>
              <th>秒数</th><td>{seconds} sec</td>
            </tr>
            <tr>
              <th>横幅</th><td>{previewSize.width} px</td>
            </tr>
            <tr>
              <th>高さ</th><td>{previewSize.height} px</td>
            </tr>
            <tr>
              <th>背景移動距離（横）</th><td>{previewSize.backgroundWidth} px</td>
            </tr>
            <tr>
              <th>背景移動距離（縦）</th><td>{previewSize.backgroundHeight} px</td>
            </tr>
          </tbody>
        </FormTable>
      </FormDiv>
    </SpriteWrapperDiv>
  )
}


export default Sprite
