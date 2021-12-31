import { ChangeEvent, useContext, useState } from "react"
import styled from "styled-components"
import { ColorFormContext } from "../../providers/ColorFormContext"
import InputField from "../InputField"
import Preview from "./Preview"


const FormDiv = styled.div`
`

const InputFieldWrapperDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    font-size:1.3em;
    margin-bottom: 20px;
    input {
        font-size: inherit;
    }
    & > div {
        display: flex;
        align-items: center;
        margin: 10px;
        & > span {
            margin:0 0.2em;
        }
    }
`
const Form: React.FC = () => {
    const { hex, setHex } = useContext(ColorFormContext)
    const [ratio, setRatio] = useState(100);

    if (!setHex) throw new Error()

    const handleChangeHex = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setHex(value);
    }

    const handleChangeRatio = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setRatio(parseInt(value));
    }

    return (
        <FormDiv>
            <InputFieldWrapperDiv>
                <div>
                    <span>#</span>
                    <InputField name="hex" type="text" onChange={handleChangeHex} value={hex} maxLength={6} />
                </div>
                {/* <div>
                    <InputField name="ratio" type="number" onChange={handleChangeRatio} value={ratio} maxLength={3} max={100} />
                    <span>%</span>
                </div> */}
            </InputFieldWrapperDiv>
            <Preview hex={hex} height={100} />
        </FormDiv>
    )
}

export default Form