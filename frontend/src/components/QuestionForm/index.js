import { useState } from 'react';
import { Modal } from '../../context/Modal';
import QuestionForm from './QuestionForm';

import './QuestionForm.css'

function QuestionFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Ask a Question</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <QuestionForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default QuestionFormModal;