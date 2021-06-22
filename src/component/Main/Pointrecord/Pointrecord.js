import React from 'react';
import { Container } from '../../Container/Container'

export function Pointrecord (props) {
    return (
        <>
            <Container content={PointBoard} info={props.info}/>
        </>
    );
};

function PointBoard(props){
    return(
        <div>point</div>
    );
}

