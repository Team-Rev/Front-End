import React from 'react';

import { Container } from './Container/Container'
import { useSelector } from 'react-redux';

export function Learnrecord (props) {

    const token = useSelector(state => state.user.token)

    console.log(props.info);
    return (
        <>
            {token.length > 0 && <Container info={props.info}/>}
        </>
    );
};