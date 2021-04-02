import { useState } from "react";
import { Modal } from "../../context/Modal";
import AnswerForm from "./AnswerForm";

function AnswerButton({ questionId }) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Answer this question</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AnswerForm setShowModal={setShowModal} questionId={questionId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

// function QuestionFormModal() {
//     const [showModal, setShowModal] = useState(false);

//     return (
//         <>
//             <button onClick={() => setShowModal(true)}>Ask a Question</button>
//             {showModal && (
//                 <Modal onClose={() => setShowModal(false)}>
//                     <QuestionForm setShowModal={setShowModal} />
//                 </Modal>
//             )}
//         </>
//     );
// }

// export default QuestionFormModal;

export default AnswerButton