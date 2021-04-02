import AnswerFormModal from "./AnswerFormModal"
import AnswersList from "./AnswersList"

function Answer({ questionId }) {

    return (
        <>
            <AnswersList questionId={questionId} />
            <AnswerFormModal questionId={questionId} />
        </>
    )
}



export default Answer