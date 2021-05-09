import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar'
import { Container } from './Container/Container'

export function Learnrecord (props) {
    console.log(props.info);
    return (
        <>
            {props.info.token.length > 0 && <Container info={props.info}/>}
        </>
    );
};