import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as questionActions from "../../store/question";
import { useDispatch, useSelector } from "react-redux";


function QuestionForm({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("")
    const [errors, setErrors] = useState([]);

    const userId = useSelector(state => state.session.user.id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const success = await dispatch(questionActions.postQuestion({ title, body, userId }));
        if (success) {
            setTitle('');
            setBody('');
            setShowModal(false);
            history.push('/') // CHANGE THIS
        }
        else {
            console.log(success);
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                Title
        <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                Body
        <textarea
                    name="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Post</button>
        </form>
    );
}

export default QuestionForm;