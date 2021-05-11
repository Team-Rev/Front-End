import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../../Container/Container'
import style from './Notice.module.css'
import axios from 'axios'

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
                url: `/board/post`,
            }).then(response => {
                var data = response.data;
                setNoice(data);
                console.log(notice);
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
    const [pos, setPos] = useState(0);
    const savedCallback = useRef();

  function callback() {
    var count = props.notice.length;
    
    if(pos === (count-1) *100) setPos(0);
    else setPos(pos + 100);
    console.log(`${count} and ${pos}`)
    // elem.style.top = `-${pos}%`;
  }

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function animate() {
      savedCallback.current();
    }

    let id = setInterval(animate, 2000);
    return () => clearInterval(id);
  });

    return(
        <div className={style.Slide}>
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
    return(
        <li >
            {props.notice.boardId}
            {props.notice.category}
            {props.notice.content}
            {props.notice.hits}
            {props.notice.postDate}
            {props.notice.status}
            {props.notice.title}
            {props.notice.userId}
        </li>
    );
}