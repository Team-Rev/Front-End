import React, { useState, useEffect } from 'react';
import {dateFormating } from "../../../../util/DateManager"
import style from "./AskBoard.module.css"

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

                
                Ask Board
            </div>
        </div>
    );
}