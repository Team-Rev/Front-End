import React, { useState, useEffect } from 'react';
import {dateFormating, dateCal } from "../../../../util/DateManager"
import style from "./AskBoard.module.css"
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import jwt from 'jwt-decode';
import InfiniteScroll from 'react-infinite-scroll-component';

export const AskBoard = (props) => {
    const [contentHeight, setContentHeight] = useState(0);
    const [comments , setComments] = useState(new Set())
    const [commentPage, setCommentsPage] = useState(0);

    const [isCompleted, setIsCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        props.isAskOpened ? setContentHeight(100) : setContentHeight(0);
        
    });

    const initComment = () => {
        setComments(new Set());
        setCommentsPage(0);
        setIsCompleted(false);
        setIsLoading(false);
        setHasMore(true);
    }
    const fetchMoreData = () => {
        if(!isLoading && props.nowAsk){
            setIsLoading(true);
            axios({
                method : 'get',
                url : `/board/comment?askId=${props.nowAsk.askId}&page=${commentPage+1}`,
                // headers: {
                //     "Authorization" : `Bearer ${props.info.token}`,
                // }
            }).then(res => {
                var data = res.data;
                if(comments){
                    var newComments = comments;
                    data.map( (e => (
                        newComments.add(e)
                        )
                    ));
                    console.log(newComments);
                    setComments(newComments);
                    setIsLoading(false);
                }else setComments(data);
            });

            if(commentPage+1 === parseInt( props.nowAsk.comments/10 )) setHasMore(false);
            setCommentsPage(commentPage+1);
        }
    };
    
    useEffect(() => {
        async function fetchData(){
            axios({
                method : 'get',
                url : `/board/comment?askId=${props.nowAsk.askId}&page=0`,
                // headers: {
                //     "Authorization" : `Bearer ${props.info.token}`,
                // }
            }).then(res => {
                var data = res.data;
                if(comments){
                    var newComments = comments;
                    data.map( (e => (
                        newComments.add(e)
                        )
                    ));
                    console.log(newComments);
                    setComments(newComments);
                    setIsCompleted(true);
                }else setComments(data);
                
            });
        } 

        if(!isCompleted && props.nowAsk) fetchData();
    });

    var commentsArr = Array.from(comments);
    return (
        <div className={style.AskBoard} style={{
            "height" : `${contentHeight}vh`
        }}>
            <div className={style.Ask} > 
                <button className={style.AskClose} onClick={()=>{
                        props.setIsAskOpened(false)
                        props.setNowAsk(null);
                        initComment();
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
                <CommentBox
                    commentsArr={commentsArr}
                    fetchMoreData={fetchMoreData}
                    hasMore={hasMore}
                    info={props.info}
                    nowAsk={props.nowAsk}
                    initComment={initComment}
                />
            </div>
        </div>
    );
}

const CommentBox = (props) => {
    return (
        <div className={style.CommentBox}>
            <div id="comment_scroll" className={style.CommentTop}>
                <InfiniteScroll
                dataLength={props.commentsArr.length}
                next={props.fetchMoreData}
                hasMore={props.hasMore}
                loader={ <h4>loading...</h4> }
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                scrollableTarget="comment_scroll"
                >
                    { props.commentsArr.map( function(comment){
                        return <Comment comment={comment} />
                    })}    

                </InfiniteScroll>
            </div>
            {props.info.token.length > 0 && <CommentBottom 
                info={props.info}
                nowAsk={props.nowAsk}
                initComment={props.initComment}
            />}
            
        </div>
    );
}

const Comment = (props) => {
    var comment = props.comment;
    return(
        <div className={style.Comment}>
            <div>
                {comment.nickname}
            </div>
            <div>
                {comment.comment}
            </div>
            <div>
                {dateCal(comment.postDate)} {comment.good} {comment.reComment}
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
                        if(areaValue.length <= 0) {
                            alert("댓글을 입력하세요");
                            return;
                        }
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
                            props.initComment();
                            console.log(res.data);
                        });
                    }}>
                    제출
                </button>
            </div>
        </div>
    );
}