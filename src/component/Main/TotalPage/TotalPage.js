import React, { useState } from 'react';
import { TotalPageForm } from '../TotalPage/TotalPageForm' 

export function TotalPage (props) {

    return (
        <>
            <TotalPageForm token={props.token}/>
        </>
    );
};
