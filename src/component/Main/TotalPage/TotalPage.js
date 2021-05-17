import React, { useState } from 'react';
import { TotalPageForm } from '../TotalPage/TotalPageForm' 
import { useLocation } from 'react-router'

export function TotalPage (props) {
    // const location = useLocation();
    // const userCell = this.props.location.state.userCell
    // console.log(userCell)
    return (
        <>
            <TotalPageForm token={props.token}/>
        </>
    );
};
