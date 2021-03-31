import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUserTag, showAllTags, deleteUserTag } from "../../store/tag";

function Feed() {
    // const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showAllTags());
    }, [dispatch])

    // useEffect(() => {

    // }, [dispatch])

    const userId = useSelector(state => state.session.user.id);

    const everyTag = useSelector(state => state.tag);

    let tagsArr = [];
    for (const key in everyTag) {
        tagsArr.push(everyTag[key])
    }

    return (
        <>
            <div>
                {tagsArr.map(tag => (
                    <button
                        id={`tag_button_${tag.id}`}
                        value={tag.id}
                        onClick={(e) => {
                            // const button = document.getElementById(`tag_button_${tag.id}`);
                            // console.log(button)
                            dispatch(postUserTag(userId, e.target.value))
                        }}
                        key={tag.id}
                    >{tag.name}</button>
                ))}
                <button onClick={e => dispatch(deleteUserTag(1, userId))}>Hit Delete</button>
            </div>
        </>
    );
}

export default Feed;