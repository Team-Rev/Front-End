import React, { useState } from 'react';
import style from './FindIdPw.module.css'
import { Container } from '../../Container/Container'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { useHistory } from 'react-router';


export function Findidpw(props) {
    return (
        <Container content={FindBoard}/>
    )
}

const FindBoard = () => {
    return (
        <div>
            <FindForm/>
        </div>
    )
}

const FindForm = (props) => {
    const handleInputkey = (e) => setPageShow(e.target.getAttribute('data-key'))
    const [pageshow, setPageShow] = useState();
    const history = useHistory();

    const [bgIdColor, setBgIdColor] = useState();
    const [bgPwColor, setBgPwColor] = useState();

    const [userId, setUserId] = useState(); // 비밀번호 변경에 사용되는 전역 id

    const IdStyles = {
        color : `${bgIdColor}`,
    };

    const PwStyles = {
        color : `${bgPwColor}`,
    }

    // 아이디 찾기 페이지
    const IdPage = (props) => {

    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [findid, setFindId] = useState(null);

    const handleInput = (e) => {
        var name = e.target.name
        switch(name){
            case "username":
                setUsername(e.currentTarget.value);
                break;
            case "phone":
                setPhone(e.currentTarget.value);
                break;    
            default:
                break;
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios({
            method : 'post',
            url : '/auth/findId',
            data : {
                "name" : username,
                "phone" : phone,
            }
        }).then(res => {
            if (res.data == "USER NOT FOUND") {
                alert('가입된 아이디가 없습니다')
                history.push('/')
            } else {
                setFindId(res.data);
            }
        }).catch(error => console.log(error))
    }


        return (
                <div className={style.containerbox}>
                    <p>아이디 찾기</p>
                    <p>아이디는 가입시 입력하신 이메일을 통해 찾을 수 있습니다.</p>
                       <div className={style.FindForm}> 
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleInput} 
                            placeholder="이름"
                         />
                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={handleInput} 
                            placeholder="전화번호"
                         />
                    </div>
                    <div>
                        <button onClick={onSubmitHandler} className={style.findBtn}>찾기</button>
                    </div>
                    {findid !== null && ( <div><p>아이디는 {findid}입니다.</p></div> )}
                </div>
        )
    }

    
   // 비밀번호 찾기 페이지
    const PwPage = (props) => {

    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");

    const handleInput = (e) => {
        var name = e.target.name
        switch(name){
            case "username":
                setUsername(e.currentTarget.value);
                break;
            case "id":
                setId(e.currentTarget.value);
                break;
            case "phone":
                setPhone(e.currentTarget.value);
                break;    
            default:
                break;
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios({
            method : 'post',
            url : '/auth/findPw',
            data : {
                "name" : username,
                "userId" : id,
                "phone" : phone,
            }
        }).then(res => {
            console.log(res.data)
            if (res.data === "OK") {
                setPageShow("pwupdate");
                setUserId(id);
            } else {
                alert('일치하는 정보가 없습니다.')
                history.push('/')
            }
        }).catch(error => console.log(error))
    }
    
        return (
            <div className={style.containerbox}>
                <p>비밀번호 찾기</p>
                <p>비밀번호는 이름, 가입한 아이디, 이메일을 통해 찾으실 수 있습니다.</p>
                  <div className={style.FindForm}>
                        <input
                            onChange={(e) => handleInput(e)}
                            name="username"
                            type="text"
                            value={username}
                            placeholder="이름"/>    
                        <input
                            onChange={(e) => handleInput(e)}
                            name="id"
                            type="text"
                            value={id}
                            placeholder="아이디"/>
                        <input 
                            onChange={(e) => handleInput(e)}
                            name="phone"
                            type="text"
                            value={phone} 
                            placeholder="전화번호"
                         />
                    <div>
                      <button onClick={onSubmitHandler} className={style.findBtn}>찾기</button>
                    </div>
                    {/* {findpw !== null ? ( <div><p>비밀번호는 12345!입니다.</p></div> ) : alert('비밀번호가 없습니다.')} */}
                </div>
            </div>
        )
    }

    const PwUpdate = (props) => {
        const id = props.id;
        const [password, setPassword] = useState();
        const [repassword, setRePassword] = useState();
        const [pMessage, setPMessage] = useState();

        const handleConfirmPassword = (e) => {
            setPassword(e.target.value)
            
            if (e.target.value !== repassword) {
                setPMessage("비밀번호가 일치하지 않습니다.")
            } 
            else if (e.target.value === '') {
                setPMessage('')
            }
            else if (e.target.value === repassword) {
                setPMessage("비밀번호가 일치합니다.")
            }
        }

        const handleConfirmrePassword = (e) => {
            setRePassword(e.target.value)

            if (e.target.value !== password) {
                setPMessage("비밀번호가 일치하지 않습니다.")
            }
            else if (e.target.value === '') {
                setPMessage('')
            }
            else if (e.target.value === password) {
                setPMessage("비밀번호가 일치합니다.")
            }
        }

        const onSubmitHandler = (e) => {
            e.preventDefault();
            axios({
                method : 'patch',
                url : '/auth/updatePw',
                data : {
                    "userId" : userId,
                    "newPassword" : password 
                }
            }).then(res => {
                if (res.data === "UPDATE SUCCESS") {
                    alert('비밀번호 변경에 성공하였습니다.')
                    history.push('/')
                }
                else {
                    alert('비밀번호 변경에 실패하였습니다.')
                    history.push('/')
                }
            }).catch(error => console.log(error))
        }

        return (
        <div className={style.containerbox}> 
            <div className={style.FindForm}>
                <input
                    name="password"
                    type="password"
                    placeholder="새 비밀번호"
                    value={password}
                    onChange={handleConfirmPassword}
                />
                <input
                    name="rePassword"
                    type="password"
                    placeholder="비밀번호 재입력"
                    value={repassword}
                    onChange={handleConfirmrePassword}
                />    
            </div>
            <p>{pMessage}</p>
            <button onClick={onSubmitHandler} className={style.findpwBtn}>비밀번호 업데이트</button>
        </div>
        )
    }

    return (
        <div className={style.container}>
            <div className={style.contentbox}>
                <div className={style.maintab}>
                  <ul>
                    <li style={IdStyles} 
                        onMouseDown={() => setBgIdColor("#25bc6d")}
                        onMouseOut={() => setBgPwColor("")}
                        onClick={handleInputkey} className={style.p} 
                        data-key="findidpage">
                        아이디 찾기
                    </li>

                    <li style={PwStyles} 
                        onMouseDown={() => setBgPwColor("#25bc6d")}
                        onMouseOut={() => setBgIdColor("")}
                        onClick={handleInputkey} className={style.p} 
                        data-key="findpwpage">
                        비밀번호 찾기
                    </li>
                  </ul>
            </div>
            {pageshow === "findidpage" && <IdPage/>}
            {pageshow === "findpwpage" && <PwPage/>}
            {pageshow === "pwupdate" && <PwUpdate/>}
           </div>
        </div>
    )
}