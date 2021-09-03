import React, { useState } from 'react';
import style from './Solveques.module.css'
import { Link } from 'react-router-dom'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

export function SolvequesForm() {

    var [quesnum, setQuesNum] = useState(0);

    // const handleOnClick = (e) => {

    // }

    return (
        <div className="board">
           <div className={style.container}> 
            <div className={style.inner}>
              <div className={style.maintab}>   
                <h1 className={style.h1}>나에게 맞는 문제를 <br/>추천해드립니다</h1>
                <p className={style.p}>인공지능이 수백개의 문제를 분석하여<br/>
                    나에게 맞는 문제를 추천합니다<br/>
                    개선사항에 대한 의견을 게시판에서 들려주세요.
                </p>
              <div className={style.btn}>
               {/* <input type="number" style={{width:150, textAlign:"center"}}></input>    */}
               <Link to="/startexam"><button className={style.test_btn}>추천 문제 풀기</button></Link>
               <Link to="/startexam"><button className={style.test_btn}>키워드 선택 풀기</button></Link>
              </div>  
                <p className={style.test_p}>아직 ONE PASS가 처음이시군요? 진단평가를 치뤄보세요.</p>
            </div>   
           </div> 
          </div>  
        </div>
    );
};
