import {useState, createContext} from 'react'
export const CardContext = createContext([])

export const CardContextProvider = ({children}) => {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [cards, setCards] = useState([])
    const [editIndex, setEditIndex] = useState(-1)
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])

    const values = {
        question, setQuestion,
        answer, setAnswer,
        cards, setCards,
        editIndex, setEditIndex,
        questions,setQuestions,
        answers, setAnswers
        
    }
    return (
        <CardContext.Provider value={values}>
            {children}
        </CardContext.Provider>
    )
}