import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { viewAnswers } from "../../store/answer";
import AnswerButton from "./AnswerFormModal"

function AnswersList({ questionId }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewAnswers(questionId))
    })

    return (
        <>
            <div>Render?</div>
        </>
    )
}

export default AnswersList