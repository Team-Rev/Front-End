import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../../Container/Container'
import style from './Notice.module.css'
import axios from 'axios'
import { dateCal } from '../../../util/DateManager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
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

    var [completed, setCompleted ]= useState(false);
    useEffect(()=>{
        async function fetchNotices(){
            axios({
                method: 'get',
                url: `/board/post-main`,
            }).then(response => {
                var data = response.data;
                setNoice(data);
            });
        }
        if(!completed) fetchNotices();

        return () => {
            setCompleted(true);
        };
    });
    return(
        <div className={style.NoticeBoard}>
            {notice && <Slide notice={notice} />}
        </div>
    );
}
const Slide = (props) => {
    const [isNoticeOpend, setIsNoticeOpend] = useState(false);
    const [noticeHeight, setNoticeHeight] = useState(60)
    const [pos, setPos] = useState(0);
    const savedCallback = useRef();

    function callback() {
        var count = props.notice.length;
        
        if(isNoticeOpend) setPos(0);
        else if(pos === (count-1) *100) setPos(0);
        else setPos(pos + 100);
    }

    useEffect(() => {
        isNoticeOpend ? setNoticeHeight(props.notice.length*60) : setNoticeHeight(60);
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

    return(
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
                    <NoticeCard key={e.boardId} notice={e}/>
                ))}
            </ul>
        </div>
    );
}


const NoticeCard = (props) =>{

    var dateInfo = dateCal(props.notice.postDate);
    return(
        <li>
            <div className={style.DateInfo}>{dateInfo}</div>
            <div className={style.TitleWrapper}>
                <button className={style.Title}>
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