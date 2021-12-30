import { createContext, Dispatch, ReactChild, useState } from "react"

const initialState = {
    hex: "000000",
    setHex: undefined,
    rgb: {r:0, g:0, b:0},
    setRgb: undefined,
}

type rgbType = {r:number, g:number, b:number}

type contextType = {
    hex: string
    setHex: Dispatch<React.SetStateAction<string>> | undefined
    rgb: rgbType
    setRgb: Dispatch<React.SetStateAction<rgbType>> | undefined
}

export const ColorFormContext = createContext<contextType>(initialState)

type PropsType = {
    children: ReactChild
}

export const ColorFormContextProvider:React.FC<PropsType> = ({children}) => {

    const [hex, setHex] = useState("000000");
    const [rgb, setRgb] = useState({
        r: 0,
        g: 0,
        b: 0,
    })

    const value = {
        hex,
        setHex,
        rgb,
        setRgb,
    }

    return (
        <ColorFormContext.Provider value={value}>
            {children}
        </ColorFormContext.Provider>
    )


}