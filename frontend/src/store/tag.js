import { csrfFetch } from './csrf';

const LOAD = 'tag/load';
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



// THUNKS
export const showAllTags = () => async (dispatch) => {
    const res = await csrfFetch(`/api/tag`)
    if (res.ok) {
        const list = await res.json()
        dispatch(load(list))
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
        const { userTag } = await res.json()
        dispatch(associateUserTag(userTag))
        return res
    } else return false
}

export const deleteUserTag = (userId, tagId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tag/${tagId}`, {
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
            newState = Object.assign({}, state)
            newState[action.tag.tagId].userId = action.tag.userId;
            return newState

        case REMOVE_USERTAG:
            newState = Object.assign({}, state)
            delete newState[action.tagId].userId
            return newState
        default:
            return state
    }
}

export default tagReducer // Goes to store/index.js
