import { postUserTag, deleteUserTag } from '../../store/tag'
import { useDispatch } from 'react-redux'

import "./tag-button.css";

const TagButtons = ({ everyTag, userId }) => {
    const dispatch = useDispatch();

    let tags = [];
    everyTag.forEach(tag => {
        if (tag.id) {
            tags.push(tag)
        }
    })

    const handleTag = async (e) => {
        if (e.target.value === 'follow') {
            dispatch(postUserTag(userId, e.target.id))
        } else {
            await dispatch(deleteUserTag(userId, e.target.id))
            e.target.value = 'follow'
        }
    }
    return (
        <div className='tag-button__outer'>
            <h3>Tags</h3>
            {tags?.map((tag) => (
                <div className='tag-button__inner'>
                    <button
                        onClick={handleTag}
                        id={tag.id}
                        value={tag.userId ? 'un-follow' : 'follow'}
                        key={`user-tags-${tag.id}`}
                        name='follow-button'
                    >
                        {tag.userId ? tag.name : `Follow-${tag.name}`}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default TagButtons
