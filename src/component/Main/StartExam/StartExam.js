import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar'
import { StartExamForm } from '../StartExam/StartExamForm' 

export function StartExam (props) {
    return (
        <>
            <Sidebar isLogin={props.isLogin} setLoginOpen={props.setLoginOpen}/>
            <StartExamForm info={props.info}/>

        </>
    );
};