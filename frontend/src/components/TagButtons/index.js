import React from 'react'
import { postUserTag, deleteUserTag } from '../../store/tag'
import { useDispatch } from 'react-redux'

const TagButtons = ({ everyTag, userId }) => {
    const dispatch = useDispatch()

    const handleTag = async (e) => {
        if (e.target.value === 'follow') {
            dispatch(postUserTag(userId, e.target.id))
        } else {
            await dispatch(deleteUserTag(userId, e.target.id))
            e.target.value = 'follow'
        }
    }
    return (
        <>
            {everyTag?.map((tag) => (
                <button
                    onClick={handleTag}
                    id={tag.id}
                    value={tag.userId ? 'un-follow' : 'follow'}
                    key={`user-tags-${tag.id}`}
                    name='follow-button'
                >
                    {tag.userId ? tag.name : `Follow-${tag.name}`}
                </button>
            ))}
        </>
    )
}

export default TagButtons
