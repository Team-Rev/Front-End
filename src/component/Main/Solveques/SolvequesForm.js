import React from 'react';
import './Solveques.css'
import { Link } from 'react-router-dom'

export function SolvequesForm() {
    return (
        <div className="board">
           <div className="board-float"> 
            <div className="main">
                <h1>나에게 맞는 문제를 <br/>추천해드립니다</h1>
                <p>인공지능이 수백개의 문제를 분석하여<br/>
                    나에게 맞는 문제를 추천합니다.<br/>
                    개선사항에 대한 의견을 게시판에서 들<br/>려주세요.
                </p>
            </div>
            <div className="test">
               <Link to="/startexam"><button className="test-btn">추천문제풀기</button></Link>
               <Link to="/startexam"><button className="test-btn">키워드선택풀기</button></Link>
                <p>아직 ONE PASS가 처음이시군요? 진단평가를 치뤄보세요.</p>
            </div>
          </div>  
        </div>
    );
};
