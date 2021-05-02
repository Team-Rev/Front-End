import React from 'react';
import { Route } from 'react-router-dom'
import { Login } from '../Main/Login/Login'
import { Learning } from '../Main/Learning/Learning'
import { Notice } from '../Main/Notice/Notice'
import { Question } from '../Main/Question//Question'
import { Learnrecord } from '../Main/Learnrecord/Learnrecord'
import { Vulnerable } from '../Main/Vulnerable/Vulnerable'
import { Pointrecord } from '../Main/Pointrecord/Pointrecord'
import { Createques } from '../Main/Createques/Createques'
import { Writer } from '../Main/Writer/Writer'
import { Main } from '../Main/Main'
import { Solveques } from '../Main/Solveques/Solveques'
import { StartExam } from '../Main/StartExam/StartExam'


export function App () {
    return (
        <>
            <Route exact path="/" component={Main}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/learning" component={Learning}></Route>
            <Route path="/notice" component={Notice}></Route>
            <Route path="/question" component={Question}></Route>
            <Route path="/learnrecord" component={Learnrecord}></Route>
            <Route path="/vulnerable" component={Vulnerable}></Route>
            <Route path="/pointrecord" component={Pointrecord}></Route>
            <Route path="/createques" component={Createques}></Route>
            <Route path="/writer" component={Writer}></Route>
            <Route path="/solveques" component={Solveques}></Route>
            <Route path="/startexam" component={StartExam}></Route>
        </>
    );
};
