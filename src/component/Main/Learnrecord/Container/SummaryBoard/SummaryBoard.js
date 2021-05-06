import React from 'react';
import style from './SummaryBoard.module.css'

const MainBoard = (props) =>{
    return(
        <div className={style.MainBoard}>
            <ul>
                { props.records.map( function(record){
                    return <SummaryCard record={record} key={record.answerMain.answerMainId} />
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
    const main = props.record.answerMain;
    const date = new Date(main.date);
    const dateStr = dateFormating(date);
    return(
        <li className={style.Card} >
            <div className={style.Category}>
                <span className={style.Main} >{props.record.categoryMain}</span>
                <span className={style.Sub} >{props.record.categorySub}</span>
            </div>
            <div className={style.Info}>
                <span className={style.Correct}>{`${main.correctCount}`}</span>
                <span className={style.Total}>{` / ${main.totalCount}`}</span>
                 
                <span className={style.Date}>{dateStr}</span>
            </div>
            <div className={style.Icon}>
            </div>
        </li>
    );
});
const DetailBoard = (props) =>{
    return(
        <div className={style.DetailBoard}>
            hello
        </div>
    );
};

export function SummaryBoard(props){
    return(
        <div className={style.SummaryBoard}>
            <MainBoard records={props.records} />
            <DetailBoard />
        </div>
    );
}