import { useState, useEffect } from 'react';
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'
import logo from './img/logo.png'
import user from './img/user.png'
import learn from './img/learn.png'
import notice from './img/notice.png'
import ques from './img/ques.png'

export function Sidebar(props) {

    /*

    useEffect(() => {
        $('.side-tab, .side-tabm').hover(function() {
            $('.active').css('color', "#00251a");
        });
    });*/

    
    return (
        <div className="side-bar">
            <img src={logo} alt="로고이미지" className="logo" style={{width : 170, marginLeft : 10, position : 'absolute', }}/>
        <div className="link-login" style={{marginTop : 75}}>
                <img src={user}  alt="유저아이콘" style={{position : 'relative', left : 30, top : 10}}/>    
                <NavLink to="/login" className="side-tab" id="user">USER</NavLink>
        </div>
        <div className="side-container">    
                <img src={learn}  alt="학습아이콘"/> 
                <NavLink to="/learning" className="side-tab">학습하기</NavLink>
                <img src={notice}  alt="공지아이콘"/> 
                <NavLink to="/notice" className="side-tab">공지사항</NavLink>
                <img src={ques}  alt="질문아이콘"/>     
                <NavLink to="/question" className="side-tab">질문 게시판</NavLink>
         </div>
                <NavLink to="/learnrecord" className="side-tabm">학습 내역</NavLink>
                <NavLink to="/vulnerable" className="side-tabm">취약점</NavLink>
                <NavLink to="/pointrecord" className="side-tabm">포인트 내역</NavLink>
                <NavLink to="/createques" className="side-tabm">생성한 문제</NavLink>
                <NavLink to="/writer" className="side-tabm">작성한 글</NavLink>
        </div>
    );
}
