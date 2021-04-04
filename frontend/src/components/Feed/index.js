import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { showAllTags } from '../../store/tag'
import Questions from '../Questions'


function Feed({ userId }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showAllTags())
    }, [dispatch])

    return (
        <>
            <Questions userId={userId} />
        </>
    )
}

export default Feed
