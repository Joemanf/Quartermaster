import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TagButtons from '../TagButtons/index'
import {
    showAllTags,
} from '../../store/tag'
import Questions from '../Questions'

function Feed() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showAllTags())
    }, [dispatch])


    const everyTag = useSelector((state) => Object.values(state.tag));
    const userId = useSelector((state) => state.session.user?.id)

    return (
        <>
            <TagButtons everyTag={everyTag} userId={userId} />
            <Questions userId={userId} />
        </>
    )
}

export default Feed
