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

// const removeQuestion = (question) => {
//     return {
//         type: REMOVE_QUESTION,
//         payload: question,
//     }
// }


// THUNKS

export const viewQuestions = () => async dispatch => {
    const res = await csrfFetch('/api/question');
    const data = await res.json();
    // console.log(`DATA QUESTIOOONNSSS`, data)
    dispatch(viewQuestion(data));
    return res;
}

export const viewOneQuestion = (questionId) => async dispatch => { // add to params
    const res = await csrfFetch(`/api/question/${questionId}`);
    const data = await res.json();
    // console.log(`DATA QUESTIOOONNSSS`, data)
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

const initialState = { question: null };

const questionReducer = (state = null, action) => {
    let newState;
    switch (action.type) {
        case ASK_QUESTION:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        case VIEW_QUESTION:
            const allQuestions = {}
            // console.log(`ACTION PAYLOAD`, action.payload)
            action.payload.forEach((question) => {
                allQuestions[question.id] = question
            })
            return {
                ...allQuestions,
                ...state,
            }
        case VIEW_A_QUESTION:
            const thisQuestion = {}
            // console.log(`ACTION PAYLOAD`, action.payload)
            thisQuestion[action.payload.id] = action.payload
            // action.payload.forEach((question) => {
            //     thisQuestion[question.id] = question
            // })
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