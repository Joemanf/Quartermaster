import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewAnswers } from "../../store/answer";

function AnswersList({ questionId }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewAnswers(questionId))
    }, [dispatch, questionId])

    const answers = useSelector((state) => state.answer)
    const answersArr = [];


    for (const key in answers) {
        answersArr.push(answers[key])
    }

    console.log(answersArr)


    return (
        <>
            {answersArr.map(answer => {

                return (
                    <div className='each-answer'>
                        <p>{answer.body}</p>
                        <p>{answer.User?.username}</p>
                    </div>
                )
            })}
        </>
    )
}

export default AnswersList