import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAnswer } from "../../store/answer";

function AnswerForm({ questionId, setShowModal }) {
    const dispatch = useDispatch();

    const [body, setBody] = useState("");

    const userId = useSelector((state) => state.session.user?.id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);

        // iterate through object, push into array keys with a value of true
        // console.log(tag)
        // let tagIds = []
        // for (const key in tag) {
        //     if (tag[key]) tagIds.push(key);
        // }
        // console.log(id)
        const success = await dispatch(postAnswer({ body, userId, questionId }));

        if (success) {
            setBody('');
            setShowModal(false);
        }
        else {
            console.log(success);
        }

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='body'>Body</label>
                    <textarea
                        name='body'
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AnswerForm