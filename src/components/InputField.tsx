import styled from "styled-components"

type PropsType = JSX.IntrinsicElements['input'] & { label?: string }


const InputFieldDiv = styled.div`
    input {
        padding: 5px;
        letter-spacing: 0.1em;
    }
`

const InputField: React.FC<PropsType> = ({ label, ...inputType }) => {
    return (
        <InputFieldDiv>
            <label>
                <span>{label}</span>
                <input {...inputType}/>
            </label>
        </InputFieldDiv>
    )
}

export default InputField