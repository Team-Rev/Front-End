import React from 'react'
import style from './Login.module.css'
import logo from './img/logo.png'
export function Login(props) {

   return (
        <div className={style.container}>
            <div className={style.form}>
                <div className={style.logoBox}>
                <img src={logo} alt="로고이미지" className={style.logo} />
                <span>One Pass 로그인</span>
                </div>

                <div className={style.loginForm}>
                    <form>
                        <input
                            name="id"
                            type="text"
                            placeholder="아이디" />
                        <input
                            name="pw"
                            type="password"
                            placeholder="비밀번호"/>
                        <button className={style.loginBtn}>로그인</button>
                    </form>
                </div>

                <div className={style.info}>
                    <div className={style.findIdPw}>
                        <span>
                            아이디/비밀번호를 잊어버리셨나요?
                        </span>
                        <button>아이디/비밀번호 찾기</button>
                    </div>
                    <div className={style.signIn}>
                        <span>
                            아직도 One Pass를 모르시나요?
                        </span>
                        <button>회원가입</button>
                    </div>
                </div>

            </div>
        </div>
    );
   }
