import React, { useState, useEffect } from 'react';
import {dateFormating } from "../../../../util/DateManager"
import style from "./AskBoard.module.css"
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import jwt from 'jwt-decode';

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
                <div className={style.CommentBox}>
                    <div className={style.CommentTop}>
                        <Comment />
                        <Comment />
                        <Comment />
                    </div>
                    {props.info.token.length > 0 && <CommentBottom 
                        info={props.info}
                        nowAsk={props.nowAsk}
                    />}
                    
                </div>
            </div>
        </div>
    );
}

const Comment = (props) => {
    const comment = {
        writer : "김태영",
        date : "2달전",
        comment : "김동영 트로트 레전드 ㅋㅋㅋ",
        recomment : 10,
        good : 5,
    }
    return(
        <div className={style.Comment}>
            <div>
                {comment.writer}
            </div>
            <div>
                {comment.comment}
            </div>
            <div>
                {comment.date} {comment.good} {comment.recomment}
            </div>
            <div>
                답글 더보기
            </div>
        </div>
    );
}

const CommentBottom = (props) => {

    const [areaValue, setAreaValue] = useState("");

    const handleTextArea = (e) => {
        setAreaValue(e.target.value);
    }

    return(
        <div className={style.CommentBottom}>
            <div className={style.CommentInputBox}>
                <TextareaAutosize 
                    className={style.CommentInput}
                    placeholder="Coments..."
                    value={areaValue}
                    onChange={ (e) => handleTextArea(e) }
                />
            </div>
            <div className={style.SubmitBox}>
                <button className={style.Submit}
                    onClick={ () => {
                        axios({
                            method : 'post',
                            url: `/board/comment`,
                            data : {
                                "userId" : jwt(props.info.token).sub,
                                "nickname" : props.info.nickname,
                                "comment" : areaValue,
                                "refAsk" : props.nowAsk.askId
                            },
                            headers : {
                                "Authorization" : `Bearer ${props.info.token}`,
                            }
                        }).then( res => {
                            setAreaValue("");
                            console.log(res.data);
                        });
                    }}>
                    제출
                </button>
            </div>
        </div>
    );
}