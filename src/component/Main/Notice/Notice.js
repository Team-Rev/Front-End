import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../../Container/Container'
import style from './Notice.module.css'
import axios from 'axios'
import { dateCal, dateFormating } from '../../../util/DateManager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import $ from "jquery";

export function Notice (props) {
    return (
        <>
            <Container content={NoticeBoard} info={props.info}/>
        </>
    );
};

const NoticeBoard = () =>{

    var [notice, setNoice] = useState(null);

    var [nowPage, setNowPage] = useState(0);
    var [pageNotice, setPageNotice] = useState(null);

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
    const [isNoticeOpend, setIsNoticeOpend] = useState(false);
    const [noticeHeight, setNoticeHeight] = useState(60)

    const [isContentOpend, setIsContentOpend] = useState(false);
    const [contentHeight, setcontentHeight] = useState(0)
    const [pos, setPos] = useState(0);
    const savedCallback = useRef();

    const [content, setContent] = useState(null);

    function callback() {
        var count = props.notice.length;
        
        if(isNoticeOpend) setPos(0);
        else if(pos === (count-1) *100) setPos(0);
        else setPos(pos + 100);
    }

    useEffect(() => {
        isNoticeOpend ? setNoticeHeight(props.notice.length*60) : setNoticeHeight(60);
        isContentOpend ? setcontentHeight(100) : setcontentHeight(0);
        savedCallback.current = callback;
    });

    useEffect(()=>{
        $(`.${style.NoticeOpen}`).click(function(){
            $(`.${style.NoticeOpen}`).toggleClass(style.DownActive);
        });
    });

    useEffect(() => {
        
        function animate() {
        savedCallback.current();
        }

        let id = setInterval(animate, 4000);
        return () => clearInterval(id);
    });

    useEffect( () => {
        let id = setInterval( () => { if(!isContentOpend) setContent(null) }, 500);
        return () => clearInterval(id)
    });
    return(
        <>

            <div className={style.ContentBoard} style={{
                "height" : `${contentHeight}vh`
            }}>
                <div className={style.Content} > 
                    <button className={style.ContentClose} onClick={()=>{
                            setIsContentOpend(false)
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

            <div className={style.Slide} style={{
                "height" : `${noticeHeight}px`
            }}>
                <button className={style.NoticeOpen} 
                    onClick={() => {
                        setIsNoticeOpend(!isNoticeOpend);
                        setPos(0);
                    }
                }>
                </button>
                <ul className={style.Animate} style={{
                    "top": `-${pos}%`,
                }}>
                    {props.notice.map(e => (
                        <NoticeCard 
                            key={e.noticeId}
                            notice={e}
                            isContentOpend={isContentOpend}
                            setIsContentOpend={setIsContentOpend}
                            setContent={setContent}    
                        />
                    ))}
                </ul>
            </div>

            <div className={style.Notice}>
                <ul>
                    {props.pageNotice && props.pageNotice.notices.map(e => (
                        <NoticeCard 
                            key={e.noticeId}
                            notice={e}
                            isContentOpend={isContentOpend}
                            setIsContentOpend={setIsContentOpend}
                            setContent={setContent}    
                        />
                    ))}
                </ul>
            </div>
            
            <div className={style.PageMoveContainer}>
                <button className={style.PageMoveToLeft} 
                    
                    onClick={() => {
                        if(props.nowPage/10 > 0) props.setNowPage(props.nowPage-10)
                    }
                }>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                
                { props.pageNotice && renderMoveBtn(props.nowPage, parseInt(props.pageNotice.pageCount/10), props.setPageNotice )}

                <button className={style.PageMoveToRight} 
                    onClick={() => {
                        if(parseInt(props.pageNotice.pageCount/10) - Math.floor(props.nowPage)> 10) props.setNowPage(props.nowPage+10)
                    }
                }>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </>
    );
}

const renderMoveBtn = (page, max, setPageNotice) =>{
    console.log(max)
    var rows = [];
    let left = max - page;
    left = left >= 10 ? 10 : left+1
    console.log(`${page}, ${left}`)
    page = parseInt(page/10);

    for(let i = 1 ; i <= left ; i++){
        rows.push(<button key={page*10+i}className={style.PageMoveBtn} onClick={ () => {
            axios({
                method : "get",
                url : `/board/notice?page=${page*10 + i - 1}`
            }).then( res => {
                let data = res.data;
                console.log(data);
                setPageNotice(data);
            })
        }}>
            {page*10+i}
        </button>)
    }
    return rows;
}

const NoticeCard = (props) =>{
    const fetchNotice = () => {
        var nowNotice = props.notice;
        axios({
            method: 'get',
            url: `/board/notice-content?id=${props.notice.noticeId}`,
        }).then(res => {
            var data = res.data;
            nowNotice.content = data;
            nowNotice.hits = nowNotice.hits+1;
            props.setContent(nowNotice);
        });
    }


    var dateInfo = dateCal(props.notice.postDate);
    return(
        <li>
            <div className={style.DateInfo}>{dateInfo}</div>
            <div className={style.TitleWrapper}>
                <button className={style.Title} 
                    onClick={() => {
                        props.setIsContentOpend(!props.isContentOpend)
                        if(!props.isContentOpend) fetchNotice();
                        else props.setContent(null);
                    }}
                >
                    {props.notice.title}
                </button>
            </div>
            <div className={style.Author}>{props.notice.nickname}</div>
            <div className={style.HitsWrapper}>
                <span className={style.Hits}>{props.notice.hits}</span>
                <FontAwesomeIcon icon={faEye} />
            </div>
        </li>
    );
}

