import React from 'react';
import { Container } from '../../Container/Container';
import style from './MyPage.module.css'
import { useSelector } from 'react-redux';

export function MyPage (props) {
    return (
        <>
            <Container content={MyPageBoard} info={props.info}/>
        </>
    );
};

const MyPageBoard = (props) => {

    var nickname = useSelector(state => state.user.nickname)

    return (
        <div className={style.container}>
            <div className={style.contentbox}>  
                <p style={{textAlign : 'center'}}>{nickname}님의 마이페이지</p><br/><hr/>
                <div className={style.listbox}>
                    <ul>
                        <li>
                            <p>수강중인 강좌</p>
                            <p>
                                <span>0</span>
                                <span>건</span>
                            </p>
                            <span>현재 수강 건수</span>
                        </li>
                        <li>
                            <p>수강중인 강좌</p>
                            <p>
                                <span>0</span>
                                <span>건</span>
                            </p>
                            <span>현재 수강 건수</span>
                        </li>
                        <li>
                            <p>수강중인 강좌</p>
                            <p>
                                <span>0</span>
                                <span>건</span>
                            </p>
                            <span>현재 수강 건수</span>
                        </li>
                        <li>
                            <p>나의 누적 포인트</p>
                            <p>
                                <span>0</span>
                                <span>건</span>
                            </p>
                            <span>현재 수강 건수</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}