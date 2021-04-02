import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewAnswers } from "../../store/answer";
import AnswerButton from "./AnswerFormModal"

function AnswersList({ questionId }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewAnswers(questionId))
    }, [dispatch])

    const answers = useSelector((state) => state.answer)
    const answersArr = [];

    for (const key in answers) {
        answersArr.push(answers[key])
    }

    console.log(answersArr)

    return (
        <>
            {answersArr.map(answer => (
                <p>{answer.body}</p>

            ))}
        </>
    )
}

export default AnswersList