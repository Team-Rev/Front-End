import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar'
import { StartExamForm } from '../StartExam/StartExamForm' 

export function StartExam (props) {

    return (
        <>
            <Sidebar/>
            <StartExamForm token={props.token}/>
        </>
    );
};
