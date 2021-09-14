import React, { useState, useEffect, useRef } from 'react';
import style from './Notice.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { dateCal } from '../../../util/DateManager'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router';
import axios from 'axios'

export const Board = (props) => {
    const [isNoticeOpend, setIsNoticeOpend] = useState(false);
    const [noticeHeight, setNoticeHeight] = useState(60)
    const [pos, setPos] = useState(0);
    const savedCallback = useRef();
    const history = useHistory();

    const handleOnClick = (e) => {
        if (id !== "admin1@gmail.com") {
            alert('관리자만 접근이 가능합니다.')
        } else {
           history.push('/writer')
        }
    }

    var id = useSelector(state => state.user.id)
    console.log(id)

    function callback() {
        var count = props.notice.length;
        
        if(isNoticeOpend) setPos(0);
        else if(pos === (count-1) *100) setPos(0);
        else setPos(pos + 100);
    }

    useEffect(() => {
        
        function animate() {
        savedCallback.current();
        }

        let id = setInterval(animate, 4000);
        return () => clearInterval(id);
    });

    useEffect(() => {
        isNoticeOpend ? setNoticeHeight(props.notice.length*60) : setNoticeHeight(60);
        
        savedCallback.current = callback;
    });

    return(
        <>
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
                    {props.notice && props.notice.map(e => (
                        <NoticeCard 
                            key={e.noticeId}
                            notice={e}
                            isContentOpend={props.isContentOpend}
                            setIsContentOpend={props.setIsContentOpend}
                            setContent={props.setContent}    
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
                            isContentOpend={props.isContentOpend}
                            setIsContentOpend={props.setIsContentOpend}
                            setContent={props.setContent}    
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
                        if(parseInt(props.pageNotice.pageCount/10) - Math.floor(props.nowPage)> 10) props.setNowPage(Math.floor(props.nowPage)+10)
                    }
                }>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
                {id === "admin1@gmail.com" ? <button onClick={handleOnClick}>작성</button> : null}
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
        rows.push(<button key={page*10+i} className={style.PageMoveBtn} onClick={ () => {
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
