import { ChangeEvent, useCallback, useState } from "react"
import styled, { keyframes } from "styled-components"


const SpriteWrapperDiv = styled.div`
  display: flex;
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
`

const PreviewDiv = styled.div`
  position: relative;
  width: 50%;
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  border: 1px solid #666;
  border-radius: 10px;
  padding: 20px;
`

const FormDiv = styled.div`
  width: 50%;
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

  return (
    <SpriteWrapperDiv>
      <PreviewDiv>
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
            type="file"
            name="spriteImg"
            onChange={handleChangeFile}
          />
        </div>
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
        </FormTable>
      </FormDiv>
    </SpriteWrapperDiv>
  )
}


export default Sprite
