import { ChangeEvent, useContext } from "react"
import styled from "styled-components"
import { ColorFormContext } from "../../providers/ColorFormContext"
import InputField from "../InputField"
import Preview from "./Preview"


const FormDiv = styled.div`

`

const InputFieldWrapperDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:1.3em;
    margin-bottom: 20px;
    & > span {
        margin-right:0.2em;
    }
    input {
        font-size: inherit;
    }
`
const Form: React.FC = () => {
    const { hex, setHex } = useContext(ColorFormContext)

    if (!setHex) throw new Error()

    const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setHex(value);
    }

    return (
        <FormDiv>
            <InputFieldWrapperDiv>
                <span>#</span>
                <InputField name="hex" type="text" onChange={handleHexChange} value={hex} maxLength={6} />
            </InputFieldWrapperDiv>
            <Preview hex={hex} width={1000} height={100} />
        </FormDiv>
    )
}

export default Form