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

    const [ token , setToken ] = useState("");
    var isLogin = false;
   useEffect(() => {
    axios({
        method: 'post',
        url: '/authenticate',
        data : {
            "username" : "user@naver.com",
            "password" : "xptmxm123"
        }
    }).then(res => {
        console.log(res.data.jwt);
        setToken(res.data.jwt);
    })
    .catch(error => console.log(error));
   }, []);

    return (
        <>
            <Login/>
            <Route exact path="/" render={() => <Main isLogin={isLogin}/>}></Route>
            <Route path="/login" render={() => <Login isLogin={isLogin}/>}></Route>
            <Route path="/learning" render={() => <Learning isLogin={isLogin}/>}></Route>
            <Route path="/notice" render={() => <Notice isLogin={isLogin}/>}></Route>
            <Route path="/question" render={() => <Question isLogin={isLogin}/>}></Route>
            <Route path="/learnrecord" render={() => <Learnrecord isLogin={isLogin} token={token}/>}></Route>
            <Route path="/vulnerable" render={() => <Vulnerable isLogin={isLogin}/>}></Route>
            <Route path="/pointrecord" render={() => <Pointrecord isLogin={isLogin}/>}></Route>
            <Route path="/createques" render={() => <Createques sLogin={isLogin}/>}></Route>
            <Route path="/writer" render={() => <Writer isLogin={isLogin}/>}></Route>
            <Route path="/solveques" render={() => <Solveques isLogin={isLogin}/>}></Route>
            <Route path="/startexam" render={() => <StartExam isLogin={isLogin} token={token}/>}></Route>
            
        </>
    );
};
