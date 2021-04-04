import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { viewQuestions } from "../../store/question"

import './questions.css';

function Questions({ userId }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(viewQuestions())
    }, [dispatch, userId])

    const everyQuestion = useSelector((state) => state.question)

    let questionArr = [];

    for (const key in everyQuestion) {
        questionArr.push(everyQuestion[key]);
    }

    return (
        <div className='all-questions'>
            <h3>Questions</h3>
            {questionArr.map(question => (
                <Link
                    key={question.id}
                    to={`/api/question/${question.id}`}
                >
                    <div className='questions-contents'>
                        <h2>{question.title}</h2>
                        <h4>{question.body}</h4>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Questions
