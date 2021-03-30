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

export const postUserTag = ({ name, userId }) => async dispatch => {

    let sef = 'hey'
    const res = await csrfFetch(`/api/tag/${sef}`, { // <-- Has to be tag id
        method: 'POST',
        body: JSON.stringify({
            name,
            userId
        })
    })
    const data = await res.json();
    if (res.ok) {
        dispatch(associateUserTag(data.something)); // Figure out what "something" is
        return res;
    }
    else return false;
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
            newState.question = null;
            return newState;
        case LOAD: {
            // console.log(`Hit in load`)
            const allTags = {};
            action.list.forEach(tag => {
                allTags[tag.id] = tag;
            });
            // console.log({
            //     ...allTags,
            //     ...state,
            //     // list: sortList(action.list),
            // })
            return {
                ...allTags,
                ...state,
                // list: sortList(action.list),
            };
        }
        default:
            return state;
    }
};

export default tagReducer; // Goes to store/index.js