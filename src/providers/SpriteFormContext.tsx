import { Dispatch, createContext, ReactChild, useContext, useState } from "react"



const initialState = {
    steps: 1,
    setSteps: undefined,
    seconds: 1,
    setSeconds: undefined,
}

type contextType = {
    steps: number
    setSteps: Dispatch<React.SetStateAction<number>> | undefined
    seconds: number
    setSeconds: Dispatch<React.SetStateAction<number>> | undefined
}

export const SpriteFormContext = createContext<contextType>(initialState)

type PropsType = {
    children: ReactChild
}

export const SpriteFormContextProvider: React.FC<PropsType> = ({ children }) => {
    const [steps, setSteps] = useState(initialState.steps)
    const [seconds, setSeconds] = useState(initialState.seconds)

    const value = {
        steps,
        setSteps,
        seconds,
        setSeconds
    }

    return (
        <SpriteFormContext.Provider value={value}>
            {children}
        </SpriteFormContext.Provider>
    )
}
