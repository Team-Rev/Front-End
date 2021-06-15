import React, { useState, useEffect } from 'react';
import {dateFormating } from "../../../../util/DateManager"
import style from "./AskBoard.module.css"
import TextareaAutosize from 'react-textarea-autosize';

export const AskBoard = (props) => {
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        props.isAskOpened ? setContentHeight(100) : setContentHeight(0);
        
    });

    
    return (
        <div className={style.AskBoard} style={{
            "height" : `${contentHeight}vh`
        }}>
            <div className={style.Ask} > 
                <button className={style.AskClose} onClick={()=>{
                        props.setIsAskOpened(false)
                    }
                }>
                    닫기
                </button>
                <div className={style.ContentBox}>
                    {/* {props.nowAsk && props.nowAsk.askId}<br/> */}
                    {/* {props.nowAsk && props.nowAsk.userId}<br/> */}
                    {props.nowAsk && props.nowAsk.title}<br/>
                    {props.nowAsk && props.nowAsk.nickname}<br/>
                    {props.nowAsk && props.nowAsk.hits}<br/>
                    {props.nowAsk && dateFormating(props.nowAsk.postDate)}<br/>
                    {props.nowAsk && props.nowAsk.recommend}<br/>
                    {props.nowAsk && props.nowAsk.content}<br/>
                    {props.nowAsk && props.nowAsk.comments}<br/>
                </div>
                <div className={style.ComentBox}>
                    <div className={style.CommentTop}>
                        <Coment />
                        <Coment />
                        <Coment />
                    </div>
                    <div className={style.CommentBottom}>
                        <div className={style.ComentInputBox}>
                            <TextareaAutosize 
                                className={style.ComentInput}
                                placeholder="Coments..."
                            />
                        </div>
                        <div className={style.SubmitBox}>
                            <button className={style.Submit}>
                                제출
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Coment = (props) => {
    const coment = {
        writer : "김태영",
        date : "2달전",
        coment : "김동영 트로트 레전드 ㅋㅋㅋ",
        recoment : 10,
        good : 5,
    }
    return(
        <div className={style.Coment}>
            <div>
                {coment.writer}
            </div>
            <div>
                {coment.coment}
            </div>
            <div>
                {coment.date} {coment.good} {coment.recoment}
            </div>
            <div>
                답글 더보기
            </div>
        </div>
    );
}