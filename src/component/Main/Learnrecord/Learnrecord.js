import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar'
import { Container } from './Container/Container'

export function Learnrecord (props) {
    return (
        <>
            <Sidebar isLogin={props.isLogin}/>
            {props.token.length > 0 && <Container token={props.token}/>}
        </>
    );
};
