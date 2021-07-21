import React, { useState } from 'react';
import { TotalPageForm } from '../TotalPage/TotalPageForm' 
import { useLocation } from 'react-router'

export function TotalPage (props) {
    const location = useLocation();
    const submitList = location.state.submitList
    // const userId = location.state.userId
    // const token = location.state.token
    const count = location.state.count
    const question = location.state.question
    return (
        <>
            <TotalPageForm token={props.token} submitList={submitList} count={count} question={question}/>
        </>
    );
};
