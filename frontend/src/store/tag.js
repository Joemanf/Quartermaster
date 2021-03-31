import { csrfFetch } from './csrf';

const LOAD = 'tag/load';

// ACTIONS

const load = list => {
    return {
        type: LOAD,
        list,
    }
};



// THUNKS

export const showAllTags = () => async dispatch => {
    const res = await csrfFetch(`/api/tag`);
    if (res.ok) {
        const list = await res.json();
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
        case LOAD:
            const allTags = {};
            action.list.forEach(tag => {
                allTags[tag.id] = tag;
            });
            return {
                ...allTags,
                ...state,
            };

        default:
            return state;
    }
};

export default tagReducer; // Goes to store/index.js