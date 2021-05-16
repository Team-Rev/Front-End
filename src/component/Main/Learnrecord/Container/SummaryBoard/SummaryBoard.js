import React, { useState, useEffect } from 'react';
import style from './SummaryBoard.module.css'
import $ from "jquery";
import axios from 'axios';
import { dateFormating } from '../../../../../util/DateManager'
import jwt_decode from "jwt-decode";

const MainBoard = (props) =>{

    var decodedToken = jwt_decode(props.token);
    const [mainSummaries, setMainSummaries] = useState(new Set())
    const [page, setPage] = useState(0);

    const [isCompleted, setIsCompleted] = useState(false);
    useEffect(() => {
        async function fetchData(){
            axios({
                method : 'get',
                url : `/problem/answer/summary?id=${decodedToken.sub}&page=${page}`,
                headers: {
                    "Authorization" : `Bearer ${props.token}`,
                }
            }).then(res => {
                var data = res.data;
                if(mainSummaries){
                    var newMainSummaryes = mainSummaries;
                    data.map( (e => (
                        newMainSummaryes.add(e)
                        )
                    ));
                    console.log(newMainSummaryes);
                    setMainSummaries(newMainSummaryes);
                    setIsCompleted(true);
                }else setMainSummaries(data);
                
            });
        } 

        if(!isCompleted) fetchData();

    })

    if(mainSummaries.size <= 0) return (
        <div className={style.MainBoard}>
            <div className={style.LoadingMainBoard}>
                Loading... 
            </div>
        </div>
    );
    var records = Array.from(mainSummaries);
    return(
        <div className={style.MainBoard}>
            {mainSummaries.size <= 0 && <div className={style.EmptyMain}>There's no record.</div>}
            <ul>
                { records.map( function(record){
                    return <SummaryCard record={record} key={record.answerMainId} loadQuestions={props.loadQuestions}/>
                })}    
            </ul>
        </div>
    );
};

const SummaryCard = (props =>{
    useEffect(()=>{
        $(`.${style.Card}`).click(function(){
            $(this).addClass(style.Active).siblings().removeClass(style.Active);
        });
        
    });
    const main = props.record;
    const dateStr = dateFormating(main.date);

    return(
        <li className={style.Card}  >
            <button onClick={(e) => props.loadQuestions(e)} data-key={main.answerMainId}>
                <div className={style.Category} data-key={main.answerMainId}>
                    <span className={style.Main} data-key={main.answerMainId}>{props.record.mainCategory}</span>
                    <span className={style.Sub} data-key={main.answerMainId}>{props.record.subCategory}</span>
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
    const renderChoice = (choice, selects) =>{
        const select = selects.find(function(select){
            return choice.id === select;
        });

        if(select && choice.isCorrect) return(<li className={style.Match}>{choice.choice}</li>);
        if(select) return(<li className={style.Choice}>{choice.choice}</li>);

        if(choice.isCorrect) return(<li className={style.Right}>{choice.choice}</li>);
        return (<li className={style.Normal}>{choice.choice}</li>);

    }

    const renderQuestion = (question, index) => {
        console.log(question);
        return(
            <div className={style.Question}>
                <div className={style.Exam}>{`${index}. ${question.question.exam}`}</div>
                <ol className={style.Choices}>
                    {question.question.choices.map( choice =>(
                        renderChoice(choice, question.choices)

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
    const loadQuestions = (e) => {

        var key = e.target.getAttribute('data-key');
        
        axios({
            method: 'get',
            url: `/problem/answer/detail?id=${key}`,

            headers: {
                "Authorization" : `Bearer ${props.token}`,
            }
        }).then( res => {
            var data = res.data;

            setQuestions(data);
        });

    }

    return(
        <div className={style.SummaryBoard}>
            <MainBoard 
                loadQuestions={loadQuestions}
                token={props.token}
            />
            <DetailBoard questions={questions}/>
        </div>
    );
}