import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Container.module.css'
import {Summary} from './Summary/Summary'
import {SummaryBoard} from './SummaryBoard/SummaryBoard'
//34.64.73.179

// const containerStyle = {
//     background : "red",
//     borderRadius: "10px",
//     maxWidth: "1000px",
//     height: "500px",
// };

export function Container(props){

    var [records, setRecords] = useState(null);

    var token = props.token;
    var fixedstring = encodeURIComponent(escape(token));

    // 상단에 보여줄 내용

    var [entireSummary, setEnrieSummary] = useState(null);

    const total = (result) => {
        var newEntireSummary = {
            totalCount : 0,
            correctCount : 0,
            examCount : result.length,
            correctRatioAvg : 0
        }
        for(let i = 0 ; i < result.length ; i++){
            let now = result[i].answerMain;
            newEntireSummary.correctCount = newEntireSummary.correctCount + now.correctCount;
            newEntireSummary.totalCount = newEntireSummary.totalCount + now.totalCount;
        }
        newEntireSummary.correctRatioAvg = newEntireSummary.correctCount / newEntireSummary.totalCount;
        return newEntireSummary;
    };
    useEffect( () => {
        let completed = false;
        async function fetchData(){
            axios({
                method: 'get',
                url: `/problem/answer/result?id=user@naver.com`,
                headers: {
                    "Authorization" : `Bearer ${fixedstring}`,
                }
            }).then(response => {
                var data = response.data;
                setRecords(data);
                setEnrieSummary(total(data));
            });
        }
        if(props.token.length <= 0) return() => {
            completed = false;
        }

        if(!completed) fetchData();

        return () => {
            completed = true;
        };
    }, [props.token, fixedstring]);

    
    if(!entireSummary) return `NULL`;

    return(
        <div className="board">
            <div className={style.container}>
                <div className={style.inner}>
                    <Summary entireSummary={entireSummary}/>
                    <SummaryBoard records={records} token={fixedstring}/>
                </div>
            </div>
        </div>
        
    );
}