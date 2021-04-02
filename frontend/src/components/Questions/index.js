import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { viewOneQuestion, viewQuestions } from "../../store/question"
import Answer from "../Answer"

function Questions({ userId }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(viewQuestions())
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(viewOneQuestion())
    // }, [dispatch])

    const everyQuestion = useSelector((state) => state.question)

    let questionArr = [];

    for (const key in everyQuestion) {
        questionArr.push(everyQuestion[key]);
    }

    return (
        <>
            {questionArr.map(question => (
                <Link
                    key={question.id}
                    to={`/api/question/${question.id}`}
                >
                    <div >
                        <h2>{question.title}</h2>
                        <h4>{question.body}</h4>
                    </div>
                </Link>
            ))}
        </>
    )
}

export default Questions
