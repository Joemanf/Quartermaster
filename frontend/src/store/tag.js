import { csrfFetch } from './csrf';

const LOAD = 'tag/load'
const ASSOCIATE_USERTAG = 'tag/associateUserTag';
const REMOVE_USERTAG = 'tag/removeUserTag';

// ACTIONS

const associateUserTag = (tag) => {
    return {
        type: ASSOCIATE_USERTAG,
        payload: tag,
    }
}

const load = list => {
    return {
        type: LOAD,
        list,
    }
};


// THUNKS

export const postUserTag = (userId, tagId) => async dispatch => {


    const res = await csrfFetch(`/api/tag/${tagId}`, {
        method: 'POST',
        body: JSON.stringify({
            // name,
            userId
        })
    })
    if (res.ok) {
        const data = await res.json();
        console.log(data) // This is where I was, go into the reducer
        // dispatch(associateUserTag(data.userTag));
        return res;
    }
    else return false;
}

export const deleteUserTag = (tagId, userId) => async dispatch => {
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

export const showAllTags = () => async dispatch => {
    const res = await csrfFetch(`/api/tag`);
    // console.log(`THIS IS DATA:`, data)
    if (res.ok) {
        const list = await res.json();
        console.log(`hit in showAllTags`)
        dispatch(load(list))
        return list;
    }
    else return false;
}


//REDUCER

const initialState = {};

const tagReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ASSOCIATE_USERTAG:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        case REMOVE_USERTAG:
            newState = Object.assign({}, state);
            newState.tag = null;
            return newState;
        case LOAD: {
            const allTags = {};
            action.list.forEach(tag => {
                allTags[tag.id] = tag;
            });
            return {
                ...allTags,
                ...state,
            };
        }
        default:
            return state;
    }
};

export default tagReducer; // Goes to store/index.js