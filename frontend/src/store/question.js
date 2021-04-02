import { csrfFetch } from './csrf';

const ASK_QUESTION = 'question/askQuestion';
const VIEW_QUESTION = 'question/viewQuestion'
const VIEW_A_QUESTION = 'question/viewSingleQuestion'
const REMOVE_QUESTION = 'question/removeQuestion';

// ACTIONS

const askQuestion = (question) => {
    return {
        type: ASK_QUESTION,
        payload: question,
    }
}

const viewQuestion = (question) => {
    return {
        type: VIEW_QUESTION,
        payload: question,
    }
}

const viewSingleQuestion = (question) => {
    return {
        type: VIEW_A_QUESTION,
        payload: question
    }
}

// THUNKS

export const viewQuestions = () => async dispatch => {
    const res = await csrfFetch('/api/question');
    const data = await res.json();
    // Tags comes back as an array of objects
    // console.log(`VIEW QUESTIONS DATA:`, data)
    dispatch(viewQuestion(data)); // This expects an array of objects
    return res;
}

export const viewOneQuestion = (questionId) => async dispatch => { // add to params
    const res = await csrfFetch(`/api/question/${questionId}`);
    const data = await res.json();
    dispatch(viewSingleQuestion(data));
    return res;
}

export const postQuestion = ({ title, body, tagIds, userId }) => async dispatch => {

    const res = await csrfFetch('/api/question', {
        method: 'POST',
        body: JSON.stringify({
            title,
            body,
            tagIds,
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

const questionReducer = (state = null, action) => {
    let newState;
    switch (action.type) {
        case ASK_QUESTION:
            const postedQuestion = {};
            postedQuestion[action.payload.id] = action.payload
            return {
                ...postedQuestion,
                ...state
            };

        case VIEW_QUESTION:
            const allQuestions = {}
            // console.log(`Here's the payload!!!!!!!!`, action.payload)
            action.payload.forEach((question) => {
                allQuestions[question.id] = question
            })
            return {
                ...allQuestions,
                ...state,
            }

        case VIEW_A_QUESTION:
            const thisQuestion = {}
            thisQuestion[action.payload.id] = action.payload
            return {
                ...thisQuestion
            }

        case REMOVE_QUESTION:
            newState = Object.assign({}, state);
            newState.question = null;
            return newState;
        default:
            return state;
    }
};

export default questionReducer; // Goes to store/index.js