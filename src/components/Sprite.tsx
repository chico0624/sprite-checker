import { ChangeEvent, DragEvent, useCallback, useState } from "react"
import styled, { keyframes } from "styled-components"
import Preview from "./Preview"


const SpriteWrapperDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
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
    console.log("発火")
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
      <Preview
        preview={preview}
        previewSize={previewSize}
        steps={steps}
        seconds={seconds}
        handleChangeFile={handleChangeFile}
      ></Preview>
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
