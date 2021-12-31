import Form from "../components/Color/Form";
import Title from "../components/Title";
import { ColorFormContextProvider } from "../providers/ColorFormContext";

const ColorPage = () => {
    return (
        <ColorFormContextProvider>
            <>
                <Title title="Hex to RGB Color"></Title>
                <Form></Form>
            </>
        </ColorFormContextProvider>
    )
}

export default ColorPage