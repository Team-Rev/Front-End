import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container } from '../../Container/Container'
import style from './Point.module.css'
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';

export function Pointrecord (props) {
    return (
        <>
            <Container content={PointBoard} info={props.info}/>
        </>
    );
};

const PointBoard = (props) => {

    var [check, setCheck] = useState("");
    var [nowPage, setNowPage] = useState(0);
    var [pagePoint, setPagePoint] = useState(null);
    var [stackpoint, setStackPoint] = useState();

    var token = useSelector(state => state.user.token)
    var userId = useSelector(state => state.user.id)
    var nickname = useSelector(state => state.user.nickname)

    var fixedstring = encodeURIComponent(escape(token));
    console.log(userId, fixedstring)

    const [isCompleted, setIsCompleted] = useState(false)
        const [pointrecord, setPointRecord] = useState();

        useEffect(() => {
            async function fetchData(){
                axios({
                    method: 'get',
                    url: `/point/userRecord/${userId}?page=0&size=10`,
                    headers: {
                        "Authorization" : `Bearer ${fixedstring}`
                    }
                }).then(res => {
                    var article = res.data;
                    setPointRecord(article)
                });
            }
            if(!isCompleted) fetchData();

            return () => {
                setIsCompleted(true);
            }
        }, [fixedstring])

        useEffect(() => {
            async function fetchPoint(){
                axios({
                    method: 'get',
                    url: `/auth/userPoint?username=${userId}`,
                    headers: {
                        "Authorization" : `Bearer ${fixedstring}`
                    }
                }).then(res => {
                    var point = res.data;
                    setStackPoint(point)
                });
            }
            if(!isCompleted) fetchPoint();

            return () => {
                setIsCompleted(true);
            }
        }, [fixedstring])


        console.log(pointrecord)
        console.log(stackpoint)

    const TopBar = () => {
        return (
            <div className={style.top_menu}>
                <div className={style.getpoint}> 
                    <p onClick={handleInput} data-key="stackPoint">적립 내역</p>
                </div>
                <div className={style.usepoint}> 
                    <p onClick={handleInput} data-key="usePoint">사용 내역</p>
                </div>
            </div>
        )  
    }

    const StackPoint = (props) => {

        const article = props.article
        const ReasonList = article.map((menu, index) => (<p className={style.pointdate} key={index}>{menu.date}<br/>{menu.reason}</p>));
        const PointList = article.map((menu, index) => (<p className={style.point} key={index}>{menu.point}포인트</p>));


        return (
            <ul>
                <li className={style.listTab}>
                   <div className={style.contentList}> 
                    <div className={style.date}>
                        <ul>
                            {ReasonList}
                        </ul>
                    </div>
                    <div className={style.right_float}>  
                    <div className={style.point}>
                        {PointList}
                    </div>
                  </div> 
                  </div>
                </li>
            </ul>
        )  
    }

    const UsePoint = (props) => {
        return (
            <ul>
                <li className={style.listTab}>
                   <div className={style.contentList}> 
                    <div className={style.date}>
                        <p>2021-04-25 21:37</p>
                        <p>문제 생성</p>
                    </div>
                    <div className={style.right_float}>  
                    <div className={style.point}>
                        <p style={{color : "red"}}>-100 포인트</p>
                    </div>
                  </div> 
                  </div>
                </li>
            </ul>
        )
    }

    const handleInput = (e) => {
        setCheck(e.target.getAttribute('data-key'))
    }

    return (
        <div className={style.container}>
            <div className={style.contentbox}>
                <div className={style.pointbox}>
                    <p>
                        <span>{nickname}</span>
                        <span>님의 누적포인트는</span>
                        <span> {stackpoint}</span>
                        <span> 입니다.</span>
                    </p> 
                </div>
                <TopBar/>
                <div className={style.main_content}>
                    {check === "stackPoint" && <StackPoint article={pointrecord}/>}
                    {check === "usePoint" && <UsePoint/>}
                </div>
            </div>
        </div>
    )
}

