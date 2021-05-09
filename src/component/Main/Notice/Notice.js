import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar'

export function Notice (props) {
    return (
        <>
            <Sidebar isLogin={props.isLogin} setLoginOpen={props.setLoginOpen}/>
        </>
    );
};
