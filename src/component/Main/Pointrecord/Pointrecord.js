import React from 'react';
import { Container } from '../../Container/Container'
import style from './Point.module.css'

export function Pointrecord (props) {
    return (
        <>
            <Container content={PointBoard} info={props.info}/>
        </>
    );
};

const PointBoard = (props) => {

    

    return (
        <div className={style.container}>
            <div className={style.contentbox}>
                <div className={style.top_menu}>
                   <div className={style.getpoint}> 
                      <p>적립 내역</p>
                   </div>
                   <div className={style.usepoint}> 
                      <p>사용 내역</p>
                   </div>
                </div>
                <div className={style.main_content}>
                    <ul>
                        <li className={style.listTab}>
                           <div className={style.contentList}> 
                            <div className={style.date}>
                                <p>2021-04-25 21:37</p>
                                <p>문제 생성</p>
                            </div>
                            <div className={style.right_float}>  
                            <div className={style.point}>
                                <p>100 포인트</p>
                            </div>
                          </div> 
                          </div>
                        </li>
                        <li className={style.listTab}>
                           <div className={style.contentList}> 
                            <div className={style.date}>
                                <p>2021-04-22 02:24</p>
                                <p>질문 답변</p>
                            </div>
                            <div className={style.right_float}>  
                            <div className={style.point}>
                                <p>50 포인트</p>
                            </div>
                          </div> 
                          </div>
                        </li>
                        <li className={style.listTab}>
                           <div className={style.contentList}> 
                            <div className={style.date}>
                                <p>2021-04-19 15:08</p>
                                <p>생성 문제 추천</p>
                            </div>
                            <div className={style.right_float}>  
                            <div className={style.point}>
                                <p>200 포인트</p>
                            </div>
                          </div> 
                          </div>
                        </li>
                        <li className={style.listTab}>
                           <div className={style.contentList}> 
                            <div className={style.date}>
                                <p>2021-04-12 00:27</p>
                                <p>게시판 글 등록</p>
                            </div>
                            <div className={style.right_float}>  
                            <div className={style.point}>
                                <p>70 포인트</p>
                            </div>
                          </div> 
                          </div>
                        </li>
                        <li className={style.listTab}>
                           <div className={style.contentList}> 
                            <div className={style.date}>
                                <p>2021-04-25 21:37</p>
                                <p>문제 생성</p>
                            </div>
                            <div className={style.right_float}>  
                            <div className={style.point}>
                                <p>100 포인트</p>
                            </div>
                          </div> 
                          </div>
                        </li>
                        <li className={style.listTab}>
                           <div className={style.contentList}> 
                            <div className={style.date}>
                                <p>2021-04-25 21:37</p>
                                <p>문제 생성</p>
                            </div>
                            <div className={style.right_float}>  
                            <div className={style.point}>
                                <p>100 포인트</p>
                            </div>
                          </div> 
                          </div>
                        </li>
                        <li className={style.listTab}>
                           <div className={style.contentList}> 
                            <div className={style.date}>
                                <p>2021-04-25 21:37</p>
                                <p>문제 생성</p>
                            </div>
                            <div className={style.right_float}>  
                            <div className={style.point}>
                                <p>100 포인트</p>
                            </div>
                          </div> 
                          </div>
                        </li>
                        <li className={style.listTab}>
                           <div className={style.contentList}> 
                            <div className={style.date}>
                                <p>2021-04-25 21:37</p>
                                <p>문제 생성</p>
                            </div>
                            <div className={style.right_float}>  
                            <div className={style.point}>
                                <p>100 포인트</p>
                            </div>
                          </div> 
                          </div>
                        </li>
                    </ul>
                </div>  
            </div>   
        </div>
    )
}

