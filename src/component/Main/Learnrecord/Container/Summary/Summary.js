
import React, { useState, useEffect } from 'react';
import style from './Summary.module.css'
import jwt_decode from "jwt-decode";
import axios from 'axios';

const TotalSummary = (props) => {
    return(
        <li>
            <span className={style.info}>
                {props.info}
            </span>
            <span className={style.title}>
                {props.title}
            </span>
        </li>
    );
}

export function Summary(props){
    var decodedToken = jwt_decode(props.token);
    const [totalInfo, setTotalInfo] = useState(null);

    const [isCompleted, setIsCompleted] = useState(false);
    useEffect(() => {
        async function fetchData(){
            axios({
                method : 'get',
                url : `/problem/answer/total?id=${decodedToken.sub}`,
                headers: {
                    "Authorization" : `Bearer ${props.token}`,
                }
            }).then(res => {
                var data = res.data;
                setTotalInfo(data)
            });
        } 

        if(!isCompleted) fetchData();

        return () => {
            setIsCompleted(false);
        }
    })

    return(
        <div className={style.summary}>
            <ul>
                {totalInfo && <TotalSummary title="시험 횟수" info={totalInfo.examCount}/> }
                {totalInfo && <TotalSummary title="맞힌 문제 수" info={totalInfo.totalCorrectCount}/> }
                {totalInfo && <TotalSummary title="푼 문제 수" info={totalInfo.totalQuestionCount}/> } 
                {totalInfo && <TotalSummary title="평균 정답률" info={totalInfo.correctAverage+"%"}/> }
            </ul>
        </div>
    );
}
