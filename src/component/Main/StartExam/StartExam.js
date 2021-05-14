import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar'
import { StartExamForm } from '../StartExam/StartExamForm' 

export function StartExam (props) {
    return (
        <>
            <StartExamForm info={props.info} userId={props.userId}/>
        </>
    );
};