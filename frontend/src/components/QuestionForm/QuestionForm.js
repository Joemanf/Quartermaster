import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as questionActions from "../../store/question";
import { showAllTags } from "../../store/tag";
import { useDispatch, useSelector } from "react-redux";


function QuestionForm({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tag, setTag] = useState({});
    const [errors, setErrors] = useState([]);

    const userId = useSelector(state => state.session.user.id);

    useEffect(() => {
        dispatch(showAllTags());
    }, [dispatch])

    //Grabbing all the tags
    const everyTag = useSelector(state => state.tag);
    let tagArr = [];
    for (const tagNum in everyTag) {
        tagArr.push(everyTag[tagNum]);
    }

    const everyQuestion = useSelector((state) => state.question)

    let questionArr = [];

    for (const key in everyQuestion) {
        questionArr.push(everyQuestion[key]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        // iterate through object, push into array keys with a value of true
        let tagIds = []
        for (const key in tag) {
            if (tag[key]) tagIds.push(key);
        }
        const success = await dispatch(questionActions.postQuestion({ title, body, tagIds, userId }));

        if (success) {
            setTitle('');
            setBody('');
            tagArr = [];
            const newQuestionArr = questionArr;
            questionArr = [];
            setShowModal(false);
            history.push(`/api/question/${newQuestionArr.length + 1}`) // CHANGE THIS TO /question/:id
        }
        else {
            console.log(success);
        }

    };

    let checkboxInput = false;

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <div className='question-title'>
                <label>
                    Title
            </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className='question-body'>
                <label>
                    Body
            </label>
                <textarea
                    name="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
            </div>
            <div className='question-tags'>
                <label>
                    Tags
            </label>
                <div className='tags-content'>
                    {tagArr.map((obj) => {
                        return (
                            <div key={`div_${obj.id}`}>
                                <input
                                    type="checkbox"
                                    id={`${obj.id}-genre-checkbox`}
                                    key={obj.id}
                                    name={obj.name}
                                    onClick={e => {
                                        const checkbox = document.getElementById(`${obj.id}-genre-checkbox`);
                                        checkbox.checked ? checkboxInput = true : checkboxInput = false;
                                        const id = obj.id;

                                        setTag({ ...tag, [id]: checkboxInput });
                                    }}
                                />
                                <label htmlFor={obj.name}>{obj.name}</label>
                            </div>
                        )
                    })}
                </div>
            </div>

            <button type="submit">Post</button>
        </form>
    );
}

export default QuestionForm;