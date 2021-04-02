import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { viewOneQuestion } from "../../store/question";
import Answer from "../Answer";

function Question() {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(viewOneQuestion(id))
    }, [dispatch, id])

    const question = useSelector((state) => state.question)

    let title;
    let body;


    if (question) {
        title = question[id].title;
        body = question[id].body;
    }


    return (
        <div>
            <h2>{title}</h2>
            <h4>{body}</h4>
            <Answer questionId={id} />
        </div>
    )
}

export default Question