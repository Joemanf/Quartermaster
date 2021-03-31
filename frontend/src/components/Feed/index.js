import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAllTags } from "../../store/tag";
import { getUserTags, postUserTag, deleteUserTag } from "../../store/userTag";

function Feed() {
    // const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showAllTags());
    }, [dispatch])

    const userId = useSelector(state => state.session.user.id);

    const everyTag = useSelector(state => state.tag);

    let tagsArr = [];
    for (const key in everyTag) {
        tagsArr.push(everyTag[key])
    }

    const everyUserTag = useSelector(state => state.userTag)

    console.log(`EVERY USER TAG`, everyUserTag)

    useEffect(() => {
        dispatch(getUserTags(userId))
    }, [dispatch])

    // const tagFollows = {};

    return (
        <>
            <div>
                {tagsArr.map(tag => {

                    return (
                        <>
                            <button
                                id={`tag_button_${tag.id}`}
                                value={tag.id}
                                onClick={(e) => {
                                    dispatch(postUserTag(userId, e.target.value))
                                }}
                                key={tag.id}
                            >{tag.name}</button>
                            < button key={`delete_${tag.id}`} onClick={e => dispatch(deleteUserTag(userId, tag.id))}>{`Unfollow ${tag.name}`}</button>
                        </>
                    )
                })}
            </div>
        </>
    );
}

export default Feed;