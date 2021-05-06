import React, { useState, useEffect } from 'react';
import style from './SummaryBoard.module.css'
import $ from "jquery";
import axios from 'axios';

const MainBoard = (props) =>{
    return(
        <div className={style.MainBoard}>
            <ul>
                { props.records.map( function(record){
                    return <SummaryCard record={record} key={record.answerMain.answerMainId} loadQuestions={props.loadQuestions}/>
                })}    
            </ul>
        </div>
    );
};

const dateFormating = (date)=>{
    var result = `${date.getFullYear()}-`;
    if(date.getMonth() < 10) result = `${result}0${date.getMonth()}-`
    else result = `${result}${date.getMonth()}-`
    
    if(date.getDate() < 10) result = `${result}0${date.getDate()} `
    else result = `${result}${date.getDate()} `

    if(date.getHours() < 10) result = `${result}0${date.getHours()}:`
    else result = `${result}${date.getHours()}:`

    if(date.getMinutes() < 10) result = `${result}0${date.getMinutes()}`
    else result = `${result}${date.getMinutes()}`
    
    return result;
}

const SummaryCard = (props =>{
    useEffect(()=>{
        $(`.${style.Card}`).click(function(){
            $(this).addClass(style.Active).siblings().removeClass(style.Active);
        });
        
    });
    const main = props.record.answerMain;
    const date = new Date(main.date);
    const dateStr = dateFormating(date);
    return(
        <li className={style.Card}  >
            <button onClick={(e) => props.loadQuestions(e)} data-key={main.answerMainId}>
                <div className={style.Category} data-key={main.answerMainId}>
                    <span className={style.Main} data-key={main.answerMainId}>{props.record.categoryMain}</span>
                    <span className={style.Sub} data-key={main.answerMainId}>{props.record.categorySub}</span>
                </div>
                <div className={style.Info} data-key={main.answerMainId}>
                    <span className={style.Correct} data-key={main.answerMainId}>{`${main.correctCount}`}</span>
                    <span className={style.Total} data-key={main.answerMainId}>{` / ${main.totalCount}`}</span>
                    
                    <span className={style.Date} data-key={main.answerMainId}>{dateStr}</span>
                </div>
                <div className={style.Icon} data-key={main.answerMainId}>
                </div>
            </button>
        </li>
    );
});

const DetailBoard = (props) =>{
    
    const renderQuestion = (question) => {
        return(
            <>
                <div>{question.exam}</div>
                {question.choices.map( choice =>(
                    <div>{choice.choice}</div>
                ))}
                <br/>
            </>
        );
    };
    if(props.questions) console.log(props.questions[0])
    
    return(
        <div className={style.DetailBoard}>
            {props.questions && props.questions.map( question => (
                renderQuestion(question)
            ))}
        </div>
    );
};

export function SummaryBoard(props){
    var [questions , setQuestions] = useState(null);
    var records = props.records;
    const loadQuestions = (e) => {
        
        var key = e.target.getAttribute('data-key');
        var record = records.find( function(record){
            return record.answerMain.answerMainId.toString() === key;
        });
        record = record.answerMain;
        console.log(record.details);
        
        var url = `/problem/selectQuestions?ids=${record.details[0].questionId}`;
        
        for(let i = 1 ; i < record.details.length ; i++){
            url = `${url},${record.details[i].questionId}`;
        }

        axios({
            method: 'get',
            url: url,
            headers: {
                "Authorization" : `Bearer ${props.token}`,
            }
        }).then( res => {
            console.log(res.data);
            setQuestions(res.data);
        });

    }

    return(
        <div className={style.SummaryBoard}>
            <MainBoard records={props.records} loadQuestions={loadQuestions}/>
            <DetailBoard questions={questions}/>
        </div>
    );
}