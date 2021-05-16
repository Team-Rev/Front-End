import React from 'react';
import style from './Container.module.css'

export function Container(props){


    return(
        <div className="board">
            <div className={style.container}>
                <div className={style.inner}>
                    <props.content info={props.info}/>
                </div>
            </div>
        </div>
        
    );
}