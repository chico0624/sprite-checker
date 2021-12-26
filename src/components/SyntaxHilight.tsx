import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

type PropsType = {
    code: string
    language: string
}

const SyntaxHilight: React.FC<PropsType> = ({ code, language }) => {

    return (
        <SyntaxHighlighter language={language} style={okaidia}>
            {code}
        </SyntaxHighlighter>
    )
}



export default SyntaxHilight