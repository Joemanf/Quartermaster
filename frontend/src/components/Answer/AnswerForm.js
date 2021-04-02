// useEffect(() => {
//     dispatch(postAnswer(questionId));  // body, userId, questionId
// })

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { postAnswer } from "../../store/answer";

function AnswerForm({ questionId, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [body, setBody] = useState("");
    // useEffect(() => {
    //     dispatch(postAnswer());  // body, userId, questionId
    // })

    const userId = useSelector((state) => state.session.user?.id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`We did it`)
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
            // setTitle('');
            setBody('');
            // tagArr = [];
            setShowModal(false);
            history.push('/') // CHANGE THIS
        }
        else {
            console.log(success);
        }

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for='body'>Body</label>
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