import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container } from '../../Container/Container'
import style from './Point.module.css'
import jwt_decode from "jwt-decode";

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

    var userId = jwt_decode(props.info.token).sub
    var token = props.info.token
    var fixedstring = encodeURIComponent(escape(token));
    console.log(userId, fixedstring)

    const [isCompleted, setIsCompleted] = useState(false)
        const [pointrecord, setPointRecord] = useState();

        useEffect(() => {
            async function fetchData(){
                axios({
                    method: 'get',
                    url: `/point/userRecord/${userId}?page=0&size=3`,
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

        console.log(pointrecord)

    const TopBar = (props) => {
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
        console.log(article)

        return (
            <ul>
                <li className={style.listTab}>
                   <div className={style.contentList}> 
                    <div className={style.date}>
                        <p>{article[0].date}</p>
                        <p>{article[0].reason}</p>
                    </div>
                    <div className={style.right_float}>  
                    <div className={style.point}>
                        <p>{article[0].point}포인트</p>
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
                <TopBar/>
                <div className={style.main_content}>
                    {check === "stackPoint" && <StackPoint article={pointrecord}/>}
                    {check === "usePoint" && <UsePoint/>}
                </div>
            </div>
        </div>
    )
}

