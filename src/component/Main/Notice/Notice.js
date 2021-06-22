import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../../Container/Container'
import style from './Notice.module.css'
import axios from 'axios'
import $ from "jquery";
import { dateFormating } from '../../../util/DateManager'
import {Board} from './NoticeBoard'

export function Notice (props) {
    return (
        <>
            <Container content={NoticeBoard} info={props.info}/>
        </>
    );
};

const NoticeBoard = () =>{


    var [nowPage, setNowPage] = useState(0);
    var [pageNotice, setPageNotice] = useState(null);

    var [notice, setNoice] = useState(null);
    var [completed, setCompleted ]= useState(false);
    useEffect(()=>{
        async function fetchData(){
            axios({
                method: 'get',
                url: `/board/notice-first?page=${nowPage}`,
            }).then(res => {
                var data = res.data;
                setNoice(data.pined);
                setPageNotice(data.page);
            });
        }
        if(!completed) fetchData();

        return () => {
            setCompleted(true);
        };
    });
    
    return(
        <div className={style.NoticeBoard}>
            {notice && <Slide 
                notice={notice} 
                nowPage={nowPage}
                setNowPage={setNowPage}
                pageNotice={pageNotice}
                setPageNotice={setPageNotice}
                
            />}
        </div>
    );
}

const Slide = (props) => {

    const [isContentOpend, setIsContentOpend] = useState(false);
    const [content, setContent] = useState(null);

    

    

    useEffect(()=>{
        $(`.${style.NoticeOpen}`).click(function(){
            $(`.${style.NoticeOpen}`).toggleClass(style.DownActive);
        });
    });

    

    useEffect( () => {
        let id = setInterval( () => { if(!isContentOpend) setContent(null) }, 500);
        return () => clearInterval(id)
    });
    return(
        <>
            <ContentBoard 
                content={content}
                isContentOpend={isContentOpend}
                setIsContentOpend={setIsContentOpend}
            />
            
            {!isContentOpend && <Board 
                notice ={props.notice}
                nowPage={props.nowPage}
                pageNotice={props.pageNotice}
                setNowPage={props.setNowPage}
                setPageNotice={props.setPageNotice}
                isContentOpend={isContentOpend}
                setIsContentOpend={setIsContentOpend}
                setContent={setContent}

            />}
        </>
    );
}

const ContentBoard = (props) => {
    
    const [contentHeight, setContentHeight] = useState(0);
    const content = props.content;

    useEffect(() => {
        props.isContentOpend ? setContentHeight(100) : setContentHeight(0);
    });

    return (
        <div className={style.ContentBoard} style={{
            "height" : `${contentHeight}vh`
        }}>
            <div className={style.Content} > 
                <button className={style.ContentClose} onClick={()=>{
                        props.setIsContentOpend(false)
                    }
                }>
                    닫기
                </button>

                <div className={style.ContetTitle}>
                    {content && content.title}
                </div>
                <ul className={style.ContentInfo}>
                    <li>
                        {content && content.nickname}
                    </li>
                    <li>
                        {content && dateFormating(content.postDate)}
                    </li>
                    <li>
                        {content && content.hits} HITS
                    </li>
                </ul>
                <div className={style.ContentDetail}>
                    {content && content.content}
                </div>
            </div>
        </div>
    );
}





