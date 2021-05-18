import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../Container/Container'
import style from './Question.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export function Question (props) {
    return (
        <Container content={QuestionBoard}/>
    );
};

const QuestionBoard = () =>{
    return(
        <>
            <TopOfQuestion/>
            <FrequentlyAskedQuestions/>
            <TotalQuestion/>

        </>
    );
}

function TopOfQuestion(props){
    return(
        <div className={style.Top__Container}>
            <div className={style.TopSlider}>
                <div className={style.ContentCard}>
                    <div className={style.ContentTitle}>
                        오늘의 TIP
                    </div>
                    <div className={style.ContentDetail}>
                        혹시 아시나요? 내가 만든 문제를 다른 사용자가 풀면 포인트를 얻을 수 있어요!
                    </div>
                </div>
                <div className={style.ContentCard}>
                    <div className={style.ContentTitle}>
                        질문하기
                    </div>
                    <div className={style.ContentDetail}>
                        공부하다 잘 모르는 문제가 나왔으면 질문을 올려보세요.
                    </div>
                </div>
                <div className={style.ContentCard}>
                    <div className={style.ContentTitle}>
                        문의하기
                    </div>
                    <div className={style.ContentDetail}>
                        서비스를 이용하는데 불편한 점이 있다면 들려주세요.
                    </div>
                </div>
                <div className={style.ContentCard}>
                    <div className={style.ContentTitle}>
                        문의내역
                    </div>
                    <div className={style.ContentDetail}>
                        보내주신 문의에 대한 답변이 도착했어요.
                    </div>
                </div>
            </div>
        </div>
    );
}

const FrequentCard = (props) => {
    const article = props.article;
    return(
        <li className={style.FrequentContent}>
            <div className={style.FrequentTitle}>{article.title}</div>
            <div className={style.FrequentDetail}>{article.detail}</div>
            <div className={style.FrequentInfo}>
                <span className={style.FrequentHits} >{article.hits} Hits</span>
                <span className={style.FrequentComments} >{article.comments} Comments</span>
            </div>

        </li>
    );
};

function FrequentlyAskedQuestions(props){

    const article = {
        title : `동영이 컬러링 왜저럼?`,
        detail : `동영이한테 전화 했는데 컬러링 트로트 나오던데, 컬러링 왜 저따구임 ㅋㅋㅋ`,
        hits : 0,
        comments : 0,
    }
    return(
        <div className={style.FrequentlyBoard}>
            <div className={style.Frequently}>
                <div className={style.FrequentMain}>
                    많이 본 질문
                </div>
                <div className={style.FrequentContentBoard}>
                    <ul>
                        <FrequentCard
                            article={article}
                        />
                        <FrequentCard
                            article={article}
                        />
                        <FrequentCard
                            article={article}
                        />
                    </ul>
                    <ul>
                        <FrequentCard
                            article={article}
                        />
                        <FrequentCard
                            article={article}
                        />
                        <FrequentCard
                            article={article}
                        />
                    </ul>
                </div>
            </div>
        </div>
        
    );
}


const TotalCard = (props) =>{
    const article = props.article;
    return(
        <li>
            <div className={style.TotalTitle}>{article.title}</div>
            <div className={style.TotalDetail}>{article.detail}</div>
            <div className={style.TotalInfo}>
                <span className={style.TotalComments} >{article.comments} Comments</span>
                <span className={style.TotalDate} >{article.date}</span>
            </div>
        </li>
    );
}

function renderMoveBtn(page){
    var rows = [];

    for(let i = 1 ; i <= 10 ; i++){
        rows.push(<button key={i} className={style.PageMoveBtn}>
            {page*10+i}
        </button>)
    }
    return rows;
}
function TotalQuestion(props){
    const article = {
        title : `동영이 컬러링 왜저럼?`,
        detail : `동영이한테 전화 했는데 컬러링 트로트 나오던데, 컬러링 왜 저따구임 ㅋㅋㅋ`,
        comments : 0,
        date : "3분전"
    }
    return(
        <div className={style.TotalBoard}>
            <div className={style.TotalBoardMain}>
                    전체 질문
            </div>
            <div className={style.Total__Container}>
                <ul>
                    <TotalCard article={article}/>
                    <TotalCard article={article}/>
                    <TotalCard article={article}/>
                    <TotalCard article={article}/>
                    <TotalCard article={article}/>
                    <TotalCard article={article}/>
                    <TotalCard article={article}/>
                    <TotalCard article={article}/>
                </ul>
            </div>
            <div className={style.PageBar}>
                <button className={style.MoveLeft}>
                    <FontAwesomeIcon icon={faChevronLeft}/> 이전
                </button>
                
                {renderMoveBtn(0)}
                 
                <button className={style.MoveRight}>
                    다음 <FontAwesomeIcon icon={faChevronRight} /> 
                </button>
            </div>
        </div>
    );
}