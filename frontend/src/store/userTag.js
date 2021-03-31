import { csrfFetch } from './csrf';

const SHOW_USERTAGS = 'tag/showUserTags';
const ASSOCIATE_USERTAG = 'tag/associateUserTag';
const REMOVE_USERTAG = 'tag/removeUserTag';

// ACTIONS

const associateUserTag = (tag) => {
    return {
        type: ASSOCIATE_USERTAG,
        payload: tag,
    }
}

const showUserTags = (tag) => {
    return {
        type: SHOW_USERTAGS,
        payload: tag,
    }
}


// THUNKS

export const getUserTags = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/tag/usertags`, {
        method: 'POST',
        body: JSON.stringify({
            userId
        }),
        headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
        const list = await res.json();
        console.log(`list:`, list);
        dispatch(showUserTags(list))
        return list;
    }
    else return false;
}

export const postUserTag = (userId, tagId) => async dispatch => {


    const res = await csrfFetch(`/api/tag/${tagId}`, {
        method: 'POST',
        body: JSON.stringify({
            userId
        })
    })
    if (res.ok) {
        const data = await res.json();
        // console.log(data)
        // dispatch(associateUserTag(data.userTag));
        return res;
    }
    else return false;
}

export const deleteUserTag = (userId, tagId) => async dispatch => {
    const res = await csrfFetch(`/api/tag/${tagId}`, { // Change route
        method: "DELETE",
        body: JSON.stringify({
            tagId,
            userId
        }),
        headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
        const data = await res.json();
    }
}


//REDUCER

const initialState = {};

const userTagReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ASSOCIATE_USERTAG:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        case SHOW_USERTAGS:
            const allUserTags = {};
            console.log(`ACTION PAYLOAD`, action.payload)
            action.payload.forEach(tag => {
                // console.log(tag)
                allUserTags[tag.tagId] = tag;
            });
            return {
                ...allUserTags,
                ...state,
            };
        case REMOVE_USERTAG:
            newState = Object.assign({}, state);
            newState.tag = null;
            return newState;
        // case LOAD:
        //     const allTags = {};
        //     action.list.forEach(tag => {
        //         allTags[tag.id] = tag;
        //     });
        //     return {
        //         ...allTags,
        //         ...state,
        //     };

        default:
            return state;
    }
};

export default userTagReducer; // Goes to store/index.js