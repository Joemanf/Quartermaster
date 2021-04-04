import { useState } from "react";
import { Modal } from "../../context/Modal";
import AnswerForm from "./AnswerForm";

function AnswerButton({ questionId }) {

    const [showModal, setShowModal] = useState(false);

    return (
        <div className='answer-button-container'>
            <button className='answer-button' onClick={() => setShowModal(true)}>Answer this question</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AnswerForm setShowModal={setShowModal} questionId={questionId} />
                </Modal>
            )}
        </div>
    );
}


export default AnswerButton