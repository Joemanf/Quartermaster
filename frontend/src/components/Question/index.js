import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { viewOneQuestion } from "../../store/question";
import Answer from "../Answer";
import './Question.css';

function Question() {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(viewOneQuestion(id))
    }, [dispatch, id])

    const question = useSelector((state) => state.question)

    let title;
    let body; //Bug here => Redirect to the home page if someone asks a question


    if (question) {
        title = question[id].title;
        body = question[id].body;
    }


    return (
        <div className='question-container'>
            <div className='title-body'>
                <h2 className='question-title-page'>{title}</h2>
                <h4 className='question-body-page'>{body}</h4>
            </div>
            <div className='answer-container'>
                <Answer questionId={id} />
            </div>
        </div>
    )
}

export default Question