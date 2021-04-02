import React, { useEffect } from 'react'
import { postUserTag, deleteUserTag, showAllUserTags } from '../../store/tag'
import { useDispatch } from 'react-redux'
// import db from '../../../../backend/db/models/index.js'

const TagButtons = ({ everyTag, userId }) => {
    const dispatch = useDispatch();

    let tags = [];
    everyTag.map(tag => {
        if (tag.id) {
            tags.push(tag)
        }
    })

    // useEffect(() => {
    //     // dispatch(showAllUserTags(userId))
    //     // console.log(`HAHAHAHAHHAHAHHA`)
    //     tags.forEach(tag => {
    //         // return dispatch(postUserTag(undefined, tag.id))
    //     })
    // }, [dispatch])





    // useEffect(() => {

    // }, [dispatch])

    const userTags = everyTag[everyTag.length - 1]

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
            {tags?.map((tag) => (
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
