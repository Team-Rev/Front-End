import React, { useState, useEffect } from 'react';
import style from './SummaryBoard.module.css'
import $ from "jquery";
import axios from 'axios';

const MainBoard = (props) =>{
    return(
        <div className={style.MainBoard}>
            {props.records.length <= 0 && <div className={style.EmptyMain}>There's no record.</div>}
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
    if(date.getMonth() < 10) result = `${result}0${date.getMonth()+1}-`
    else result = `${result}${date.getMonth()+1}-`
    
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

const ColorInfo = (props) => {
    return(
        <div className={style.ColorInfo}>
            <ul>
                <li>
                    <div className={style.RightInfo}></div>
                    <div> Correct</div>
                </li>
                <li>
                    <div className={style.ActualInfo}></div>
                    <div> Actual</div>
                </li>
                <li>
                    <div className={style.SelectInfo}></div>
                    <div> Your select</div>
                </li>
            </ul>
        </div>
    );
}

const DetailBoard = (props) =>{
    if(props.questions) var details = props.questions.answerMain.details;
    const renderChoice = (choice, detailChoices) =>{
        const detailChoice = detailChoices.find(function(detailChoice){
            return detailChoice.multipleChoiceId === choice.id;
        });
        if(detailChoice && choice.isCorrect) return(<li className={style.Match}>{choice.choice}</li>);
        if(detailChoice) return(<li className={style.Choice}>{choice.choice}</li>);
        if(choice.isCorrect) return(<li className={style.Right}>{choice.choice}</li>);
        return (<li className={style.Normal}>{choice.choice}</li>);

    }

    const renderQuestion = (question, index) => {
        console.log(question)
        const detail = details.find(function (detail){
            return detail.questionId === question.id;
        });
        return(
            <div className={style.Question}>
                <div className={style.Exam}>{`${index}. ${question.exam}`}</div>
                <ol className={style.Choices}>
                    {question.choices.map( choice =>(
                        renderChoice(choice, detail.choices)
                    ))}
                </ol>
            </div>
        );
    };
    var index = 0;
    return(
        <div className={style.DetailBoard}>
            <ColorInfo/>
            {!props.questions && <div className={style.Loading}>Select the record.</div>}
            {props.questions && props.questions.map( question => (
                renderQuestion(question, ++index)
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
            var data = res.data;
            data.answerMain = record;
            setQuestions(data);
        });

    }

    return(
        <div className={style.SummaryBoard}>
            <MainBoard records={props.records} loadQuestions={loadQuestions}/>
            <DetailBoard questions={questions}/>
        </div>
    );
}