import { csrfFetch } from './csrf';

const ASK_QUESTION = 'question/askQuestion';
const REMOVE_QUESTION = 'question/removeQuestion';

// ACTIONS

const askQuestion = (question) => {
    return {
        type: ASK_QUESTION,
        payload: question,
    }
}

// const removeQuestion = (question) => {
//     return {
//         type: REMOVE_QUESTION,
//         payload: question,
//     }
// }

// THUNKS

export const viewQuestion = () => async dispatch => {
    const res = await csrfFetch('/api/question');
    const data = await res.json();
    dispatch(askQuestion(data.question));
    return res;
}

export const postQuestion = ({ title, body, userId }) => async dispatch => {

    const res = await csrfFetch('/api/question', {
        method: 'POST',
        body: JSON.stringify({
            title,
            body,
            userId
        })
    })
    const data = await res.json();
    if (res.ok) {
        dispatch(askQuestion(data.question));
        return res;
    }
    else return false;
}

//REDUCER

const initialState = { question: null };

const questionReducer = (state = null, action) => {
    let newState;
    switch (action.type) {
        case ASK_QUESTION:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        case REMOVE_QUESTION:
            newState = Object.assign({}, state);
            newState.question = null;
            return newState;
        default:
            return state;
    }
};

export default questionReducer; // Goes to store/index.js