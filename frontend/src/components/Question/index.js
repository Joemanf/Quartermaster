import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { viewOneQuestion } from "../../store/question";
import Answer from "../Answer";

function Question() {
    const dispatch = useDispatch()
    const { id } = useParams()
    console.log(`id?`, id)

    useEffect(() => {
        dispatch(viewOneQuestion(id))
    }, [dispatch])

    const question = useSelector((state) => state.question)

    // console.log(`Question?`, question);

    let title;
    let body;


    if (question) {
        // console.log(`Question title?`, question[id])
        title = question[id].title;
        body = question[id].body;
    }

    console.log(`Body and Title?`, body, title);


    return (
        <>
            <h2>{title}</h2>
            <h4>{body}</h4>
            <Answer questionId={id} />
        </>
    )
}

export default Question