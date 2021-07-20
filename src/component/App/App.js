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
import { Sidebar } from '../Main/Sidebar/Sidebar'
import { TotalPage } from '../Main/TotalPage/TotalPage'
import { Join } from '../Main/Join/Join'
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../store/modules/userSlice';

export function App () {

    const dispatch = useDispatch()
    const id = useSelector(state => state.user.id)

    const [isLogin, setLogin] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [info, setInfo] = useState({
        token:"",
        nickname:""
    });

    const login =(info) => {
        setLogin(info.token.length > 0);
        setInfo(info);
        console.log(id)
    }
   
    const logout = () => {
        dispatch(userLogout())
        localStorage.clear()
        console.log(id)
    }

    const [userId, setUserId] = useState("")
    return ( 
        <>
            {isLoginOpen && <Login setLoginOpen={setLoginOpen} login={login} setUserId={setUserId}/>}
            <Sidebar 
                nickname={info.nickname} 
                setLoginOpen={setLoginOpen}
                isLogin={isLogin}
                logout={logout}
            />

            <Route exact path="/"
                render={() => 
                    <Main/>
                 }>
            </Route>
            
            <Route path="/learning" 
                render={() => 
                    <Learning/>
                }>
            </Route>

            <Route path="/notice" 
                render={() => 
                    <Notice/> // 공지사항은 토큰 필요 없음
                }>
            </Route>

            <Route path="/question"
                render={() => 
                    <Question
                        info={info}
                    />
                }>
            </Route>

            <Route path="/learnrecord" 
                render={() => 
                    <Learnrecord
                        info={info}
                    />
                }>
            </Route>

            <Route path="/vulnerable" 
                render={() => 
                    <Vulnerable/>
                }>
            </Route>

            <Route path="/pointrecord" 
                render={() => 
                    <Pointrecord 
                        info={info}
                    />
                }>
            </Route>

            <Route path="/createques" 
                render={() => 
                    <Createques />
                }>
            </Route>

            <Route path="/writer" 
                render={() => 
                    <Writer />
                }>
            </Route>
            <Route path="/solveques" 
                render={() => 
                    <Solveques/>
                }>
            </Route>
            <Route path="/startexam" 
                render={() => 
                    <StartExam info={info} userId={userId}/>
                }>
            </Route>
            <Route path="/totalpage" 
                render={() => 
                    <TotalPage/>
                }>
            </Route>
            <Route path="/join" 
                render={() => 
                    <Join/>
                }>
            </Route>
        </>
    );
};