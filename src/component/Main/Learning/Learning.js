import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar'
import { LearningForm } from '../Learning/LearningForm' 

export function Learning(props) {
    return (
        <>
            <Sidebar isLogin={props.isLogin} setLoginOpen={props.setLoginOpen}/>
            <LearningForm/>
        </>
    );
};
