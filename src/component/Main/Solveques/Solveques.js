import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar'
import { SolvequesForm } from '../Solveques/SolvequesForm' 

export function Solveques (props) {
    return (
        <>
            <Sidebar isLogin={props.isLogin} setLoginOpen={props.setLoginOpen}/>
            <SolvequesForm/>
        </>
    );
};
