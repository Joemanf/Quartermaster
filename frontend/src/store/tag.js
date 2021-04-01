import { csrfFetch } from './csrf';

const LOAD = 'tag/load';
const SHOW_USERTAGS = 'tag/showUserTags'
const ASSOCIATE_USERTAG = 'tag/associateUserTag'
const REMOVE_USERTAG = 'tag/removeUserTag'

// ACTIONS

const load = (list) => {
    return {
        type: LOAD,
        list,
    }
}

const removeTag = (userId, tagId) => {
    return {
        type: REMOVE_USERTAG,
        userId,
        tagId,
    }
}

const associateUserTag = (tag) => {
    return {
        type: ASSOCIATE_USERTAG,
        tag,
    }
}

const showUserTags = (tag) => {
    return {
        type: SHOW_USERTAGS,
        payload: tag,
    }
}



// THUNKS
export const showAllTags = () => async (dispatch) => {
    const res = await csrfFetch(`/api/tag`)
    if (res.ok) {
        const list = await res.json()
        console.log(`'''''''''''''''''''''''''`, list)
        dispatch(load(list))
        return list
    } else return false
}

export const showAllUserTags = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tag/grab-user-tag`, {
        method: 'POST',
        body: JSON.stringify({
            userId,
        }),
    });
    console.log(`USER TAGS RES`, res)
    if (res.ok) {
        const list = await res.json()
        console.log(`------------------`, list)
        dispatch(showUserTags(list))
        return list
    } else return false
}

export const postUserTag = (userId, tagId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tag/userTags`, {
        method: 'POST',
        body: JSON.stringify({
            userId,
            tagId,
        }),
    })
    if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch(associateUserTag(data.userTag))
        return res
    } else return false
}

export const deleteUserTag = (userId, tagId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tag/${tagId}`, {
        // Change route
        method: 'DELETE',
        body: JSON.stringify({
            tagId,
            userId,
        }),
        headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
        const { userId } = await res.json()
        dispatch(removeTag(userId, tagId))
    }
}


//REDUCER

const initialState = {}

const tagReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD:
            const allTags = {}
            action.list.forEach((tag) => {
                allTags[tag.id] = tag
            })
            return { // And look around here
                ...allTags,
                ...state,
            }
        case ASSOCIATE_USERTAG:
            newState = Object.assign({}, state) // Look here
            newState[action.tag.tagId].userId = action.tag.userId
            return newState

        case SHOW_USERTAGS:
            const allUserTags = {}
            allUserTags.userTags = {}
            // console.log(`ACTION PAYLOAD`, action.payload)
            action.payload.forEach((tag) => {
                // console.log(tag)
                allUserTags.userTags[tag.tagId] = tag
            })
            return {
                ...allUserTags,
                ...state,
            }
        case REMOVE_USERTAG:
            newState = Object.assign({}, state)
            delete newState[action.tagId].userId
            return newState
        default:
            return state
    }
}

export default tagReducer // Goes to store/index.js
