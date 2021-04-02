import { csrfFetch } from './csrf';

const VIEW_ANSWERS = 'answer/viewAnswer';
const POST_AN_ANSWER = 'answer/postAnAnswer';

// ACTIONS

const viewAnswer = (answer) => {
    return {
        type: VIEW_ANSWERS,
        payload: answer,
    }
}

const postAnAnswer = (answer) => {
    return {
        type: POST_AN_ANSWER,
        payload: answer,
    }
}


// THUNKS

export const viewAnswers = (questionId) => async dispatch => {
    const res = await csrfFetch(`/api/answer/${questionId}`);
    const data = await res.json();
    // console.log(`DATA QUESTIOOONNSSS`, data)
    dispatch(viewAnswer(data));
    return res;
}

export const postAnswer = ({ body, userId, questionId }) => async dispatch => {
    const res = await csrfFetch(`/api/answer`, {
        method: 'POST',
        body: JSON.stringify({
            body,
            userId,
            questionId,
        })
    });
    const data = await res.json();
    // console.log(`DATA QUESTIOOONNSSS`, data)
    dispatch(postAnAnswer(data.answer));
    return res;
}


//REDUCER

const initialState = { answer: null };

const answerReducer = (state = null, action) => {
    let newState;
    switch (action.type) {
        case VIEW_ANSWERS:
            const allAnswers = {}
            console.log(`ACTION PAYLOAD ANSWERS`, action.payload)
            action.payload.forEach((answer) => {
                allAnswers[answer.id] = answer
            });
            return {
                ...allAnswers,
                ...state,
            }
        case POST_AN_ANSWER:
            const answer = {}
            // console.log(`ACTION PAYLOAD ANSWERS`, action.payload)
            answer[action.payload.id] = action.payload
            return {
                answer,
                ...state,
            }
        default:
            return state;
    }
};

export default answerReducer; // Goes to store/index.js