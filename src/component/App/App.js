import React, { useState, useEffect } from 'react';
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
import axios from 'axios'

export function App () {

   const [ token , setToken ] = useState(null);


   useEffect(() => {
    const data = {
        username : "yeong@naver.com",
        password : "yeong"
    }
 
    let url = '/authenticate'
    
    axios.post(url, data)
         .then(Accessdata => {
             setToken(Accessdata.data);
         })
         .catch(error => console.log("Data가 없습니다."));
   }, []);

    return (
        <>
            <Route exact path="/" render={() => <Main/>}></Route>
            <Route path="/login" render={() => <Login/>}></Route>
            <Route path="/learning" render={() => <Learning/>}></Route>
            <Route path="/notice" render={() => <Notice/>}></Route>
            <Route path="/question" render={() => <Question/>}></Route>
            <Route path="/learnrecord" render={() => <Learnrecord/>}></Route>
            <Route path="/vulnerable" render={() => <Vulnerable/>}></Route>
            <Route path="/pointrecord" render={() => <Pointrecord/>}></Route>
            <Route path="/createques" render={() => <Createques/>}></Route>
            <Route path="/writer" render={() => <Writer/>}></Route>
            <Route path="/solveques" render={() => <Solveques/>}></Route>
            <Route path="/startexam" render={() => <StartExam education={token}/>}></Route>
        </>
    );
};
