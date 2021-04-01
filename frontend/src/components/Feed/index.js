import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TagButtons from '../TagButtons/index'
import {
    getUserTags,
    postUserTag,
    deleteUserTag,
    showAllTags,
} from '../../store/tag'
import Questions from '../Questions'

function Feed() {
    // const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showAllTags())
    }, [dispatch])

    // const userId = useSelector(state => state.session.user.id);

    const everyTag = useSelector((state) => Object.values(state.tag));
    const userId = useSelector((state) => state.session.user?.id)

    // console.log(`EVERY USER TAG`, everyTag, 'userId', userId)

    // const tagFollows = {};

    return (
        <>
            <TagButtons everyTag={everyTag} userId={userId} />
            <Questions userId={userId} />
        </>
    )
}

export default Feed
