import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar'
import { Container } from './Container/Container'

export function Learnrecord (props) {
    console.log(props.info);
    return (
        <>
            <Sidebar isLogin={props.isLogin} nickname={props.info.nickname} setLoginOpen={props.setLoginOpen}/>
            {props.info.token.length > 0 && <Container info={props.info}/>}
        </>
    );
};
