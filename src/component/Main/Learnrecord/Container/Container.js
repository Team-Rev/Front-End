import React, { useState } from 'react';
import style from './Container.module.css'
import {Summary} from './Summary/Summary'
import {SummaryBoard} from './SummaryBoard/SummaryBoard'
//34.64.73.179


export function Container(props){

    var token = props.info.token;
    var fixedstring = encodeURIComponent(escape(token));
    const [total, setTotal] = useState(0);

    return(
        <div className="board">
            <div className={style.container}>
                <div className={style.inner}>
                    <Summary 
                        token={fixedstring}
                        setTotal={setTotal}
                    />
                    <SummaryBoard 
                        token={fixedstring}
                        total={total}
                    />
                </div>
            </div>
        </div>
        
    );
}