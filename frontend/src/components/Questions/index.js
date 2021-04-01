import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { viewOneQuestion, viewQuestions } from "../../store/question"

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
                    to={`/api/question/${question.id}`}
                >
                    <div key={question.id}>
                        <h2>{question.title}</h2>
                        <h4>{question.body}</h4>
                    </div>
                </Link>
            ))}
            {/* <TagButtons everyTag={everyTag} userId={userId} /> */}
        </>
    )
}

export default Questions
