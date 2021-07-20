import React from 'react';
import { StartExamForm } from '../StartExam/StartExamForm' 
import { useDispatch, useSelector } from 'react-redux';

export function StartExam (props) {

    const id = useSelector(state => state.user.id)
    console.log(id)

    return (
        <>
            <StartExamForm info={props.info} userId={props.userId}/>
        </>
    );
};