import React, { useState, useEffect } from 'react';
import {dateFormating, dateCal } from "../../../../util/DateManager"
import style from "./AskBoard.module.css"
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import jwt from 'jwt-decode';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export const AskBoard = (props) => {
    const [contentHeight, setContentHeight] = useState(0);
    const [comments , setComments] = useState(new Set())
    const [commentPage, setCommentsPage] = useState(0);
    const history = useHistory();

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


    const handleDelete = (e) => {
        e.preventDefault();
        axios({
            method : 'DELETE',
            url : `/board/ask?askId=${props.nowAsk.askId}`
        }).then(res => {
            if (res.data === "SUCCESS") {
                window.location.reload();
            } else {
                alert('삭제 중 문제발생')
            }
        }).catch(error => console.log(error)) 
    }

    const [queschk, setQuesChk] = useState("quescheck")
    const content = props.nowAsk;

    const handleModify = (e) => {
        history.push({
            pathname : "/modifyques",
            state : {
                content : content,
                chk : props.nowAsk
            }
        })
    }
    
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
                    {props.nowAsk && <p className={style.title}>{props.nowAsk.title}</p>}<br/> 
                    <ul className={style.MainBox}>
                        <li>{props.nowAsk && <p>{props.nowAsk.nickname}</p>}</li>
                        <li>{props.nowAsk && <p>{dateFormating(props.nowAsk.postDate)}</p>}</li>
                        <li>{props.nowAsk && <p>{props.nowAsk.hits} HITS</p>}</li>
                    </ul>  
                    {props.nowAsk && <p>{props.nowAsk.content}</p>}<br/>
                    <button className={style.AskBtn} onClick={handleDelete}>삭제</button>
                    <button className={style.AskBtn} onClick={handleModify}>수정</button>
                </div>
                <CommentBox
                    commentsArr={commentsArr}
                    fetchMoreData={fetchMoreData}
                    hasMore={hasMore}
                    // info={props.info}
                    nowAsk={props.nowAsk}
                    initComment={initComment}
                />
            </div>
        </div>
    );
}

const CommentBox = (props) => {
    
    const token = useSelector(state => state.user.token)

    return (
        <div className={style.CommentBox}>
            <div id="comment_scroll" className={style.CommentTop}>
                <InfiniteScroll
                dataLength={props.commentsArr.length}
                next={props.fetchMoreData}
                hasMore={props.hasMore}
                loader={<p></p>}
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
            {token.length > 0 && <CommentBottom 
                // info={props.info}
                nowAsk={props.nowAsk}
                initComment={props.initComment}
            />}
            
        </div>
    );
}

const Comment = (props) => {

    var comment = props.comment;
    console.log(comment)
    const history = useHistory()
    const id = useSelector(state => state.user.id)

    const DeleteComment = (e) => {
        e.preventDefault();
        if (comment.userId === id) {
            axios({
                method : 'DELETE',
                url : `/board/comment?commentId=${comment.commentId}&refAsk=${comment.refAsk}`
            }).then(res => {
                if (res.data === "OK") {
                    alert('댓글 삭제가 완료되었습니다.')
                    window.location.reload()
                } else {
                    alert('댓글 삭제가 되지않았습니다.')
                    window.location.reload()
                }
            }).catch(error => console.log(error))
        } else {
            alert('본인이 작성한 댓글만 삭제가능합니다.')
        }
    }

    return(
        <div className={style.Comment}>
            <div className={style.CommentHeader}>
                <span className={style.Nickname}>
                    {comment.nickname}
                </span>
                <span className={style.Date}>
                    {dateCal(comment.postDate)}
                </span>
            </div>
            <div className={style.CommentText}>
                {comment.comment}
            </div>
            <div className={style.Recomment}>
                <button className={style.DeleteBtn} onClick={DeleteComment}>X</button>
            </div>
        </div>
    );
}

const CommentBottom = (props) => {

    const token = useSelector(state => state.user.token)
    const nickname = useSelector(state => state.user.nickname)

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
                                "userId" : jwt(token).sub,
                                "nickname" : nickname,
                                "comment" : areaValue,
                                "refAsk" : props.nowAsk.askId
                            },
                            headers : {
                                "Authorization" : `Bearer ${token}`,
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