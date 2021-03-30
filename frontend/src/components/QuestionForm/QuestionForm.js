import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as questionActions from "../../store/question";
import * as tagActions from "../../store/tag";
import { showAllTags } from "../../store/tag";
import { useDispatch, useSelector } from "react-redux";


function QuestionForm({ setShowModal }) {
    const id = useParams()
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


    // console.log(`EVERY TAG:`, everyTag)
    // console.log(`TAGARR: `, tagArr)
    // setTag(tagArr);
    // console.log(`TAG`, tag)
    // const man = everyTag.map((tag) => tag.name)
    // console.log(man)

    // console.log(tags)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        // iterate through object, push into array keys with a value of true
        // console.log(tag)
        let tagIds = []
        for (const key in tag) {
            if (tag[key]) tagIds.push(key);
        }
        console.log(id)
        const success = await dispatch(questionActions.postQuestion({ title, body, tagIds, userId }));

        if (success) {
            setTitle('');
            setBody('');
            tagArr = [];
            setShowModal(false);
            history.push('/') // CHANGE THIS
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
            <label>
                Tags

                {tagArr.map((obj) => {
                // tag.push(obj)
                return (
                    <div key={`div_${obj.id}`}>
                        <input
                            type="checkbox"
                            id={`${obj.id}-genre-checkbox`}
                            // checked={checkboxInput}
                            key={obj.id}
                            name={obj.name}
                            onClick={e => {
                                const checkbox = document.getElementById(`${obj.id}-genre-checkbox`);
                                checkbox.checked ? checkboxInput = true : checkboxInput = false;
                                const id = obj.id;

                                setTag({ ...tag, [id]: checkboxInput });
                                // const tags = Object.keys(tag).find(key => tag[key] === true);
                            }}
                        />
                        <label htmlFor={obj.name}>{obj.name}</label>
                    </div>
                )
            })}
            </label>
            <button type="submit">Post</button>
        </form>
    );
}

export default QuestionForm;