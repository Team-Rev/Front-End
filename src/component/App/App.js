import React, { useState } from 'react';
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

    const [isLogin, setLogin] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [info, setInfo] = useState({
        token:"",
        nickname:""
    });

    const login =(info) => {
        setLogin(info.token.length > 0);
        setInfo(info);
    }
   
    const logout = () => {
        setLogin(false);
        setInfo({
            token : "",
            nickname : ""
        });
    }
    return (
        <>
            {isLoginOpen && <Login setLoginOpen={setLoginOpen} login={login}/>}
            
            <Route exact path="/"
                render={() => 
                    <Main
                        isLogin={isLogin}
                        logout={logout}
                        info={info}
                        setLoginOpen={setLoginOpen}/>
                 }>
            </Route>
            
            <Route path="/learning" 
                render={() => 
                    <Learning 
                        isLogin={isLogin}
                        logout={logout}
                        info={info}
                        setLoginOpen={setLoginOpen}
                    />
                }>
            </Route>

            <Route path="/notice" 
                render={() => 
                    <Notice 
                        isLogin={isLogin}
                        info={info}
                        setLoginOpen={setLoginOpen}
                    />
                }>
            </Route>
            
            <Route path="/question" render={() => <Question isLogin={isLogin} info={info} setLoginOpen={setLoginOpen}/>}></Route>
            <Route path="/learnrecord" render={() => <Learnrecord isLogin={isLogin} info={info} setLoginOpen={setLoginOpen}/>}></Route>
            <Route path="/vulnerable" render={() => <Vulnerable isLogin={isLogin} info={info} setLoginOpen={setLoginOpen}/>}></Route>
            <Route path="/pointrecord" render={() => <Pointrecord isLogin={isLogin} info={info} setLoginOpen={setLoginOpen}/>}></Route>
            <Route path="/createques" render={() => <Createques sLogin={isLogin} info={info} setLoginOpen={setLoginOpen}/>}></Route>
            <Route path="/writer" render={() => <Writer isLogin={isLogin} info={info} setLoginOpen={setLoginOpen}/>}></Route>
            <Route path="/solveques" render={() => <Solveques isLogin={isLogin} info={info} setLoginOpen={setLoginOpen}/>}></Route>
            <Route path="/startexam" render={() => <StartExam isLogin={isLogin} info={info} setLoginOpen={setLoginOpen}/>}></Route>
            
        </>
    );
};
