import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Container } from '../../Container/Container'
import axios from 'axios';

export function Join(props) {
    return(
        <Container content={JoinBoard}/>
    )
}

const JoinBoard = () => {
    return(
        <div>
           <JoinForm/>
        </div>
    )
}

const JoinForm = (props) => {
    let history = useHistory();
    const [userId , setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [nickname, setNickname] = useState("")
    const [DOB, setDOB] = useState("")
    const [phone, setPhone] = useState("")
    const [detailAddress, setDetailAddress] = useState("")
    const [address, setAddress] = useState("")
    const [postNumber, setPostNumber] = useState("")

    const onIdHandler = (e) => {
        setUserId(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onUsernameHandler = (e) => {
        setName(e.currentTarget.value)
    }

    const onNickHandler = (e) => {
        setNickname(e.currentTarget.value)
    }

    const onDateHandler = (e) => {
        setDOB(e.currentTarget.value)
    }

    const onPhoneHandler = (e) => {
        setPhone(e.currentTarget.value)
    }

    const onDetailAddHandler = (e) => {
        setDetailAddress(e.currentTarget.value)
    }

    const onAddHandler = (e) => {
        setAddress(e.currentTarget.value)
    }

    const onPostnumHandler = (e) => {
        setPostNumber(e.currentTarget.value)
    }
    

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios({
            method : 'post',
            url : '/signup',
            data: {
                "detailAddress" : detailAddress,
                "nickname" : nickname,
                "DOB" : DOB,
                "userId" : userId,
                "name" : name,
                "password" : password,
                "phone" : phone,
                "address" : address,
                "postNumber" : postNumber
            }
    }).then(res => {
        console.log(res)
        console.log('체크')
        if(res.data == "SUCCESS") {
            history.push("/login")
        }
    })
    .catch(error => console.log(error))
}

            // // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
            // axios.defaults.headers.common['Authorization'] = `Bearer ${ACCESS_TOKEN}`; 
            // axios.defaults.headers.common['Authorization'] = `Bearer ${REFRESH_TOKEN}`;      


        return (
            <div>
             <form onSubmit={onSubmitHandler}>
                <input type="email"  name={userId} class="text-field" placeholder="아이디" onChange={onIdHandler}></input>
                <input type="password" name={password} class="text-field" placeholder="비밀번호" onChange={onPasswordHandler}></input>
                <input type="text" name={name} class="text-field" placeholder="이름" onChange={onUsernameHandler}></input>
                <input type="text"  name={nickname} class="text-field" placeholder="닉네임" onChange={onNickHandler}></input>
                <input type="text" name={DOB} class="text-field" placeholder="출생년일(yyyy-MM-dd)" onChange={onDateHandler}></input>
                <input type="text" name={phone} class="text-field" placeholder="폰번호" onChange={onPhoneHandler}></input>
                <input type="text" name={detailAddress} class="text-field" placeholder="상세주소" onChange={onDetailAddHandler}></input>
                <input type="text" name={address} class="text-field" placeholder="거주주소" onChange={onAddHandler}></input>
                <input type="text" name={postNumber} class="text-field" placeholder="우편번호" onChange={onPostnumHandler}></input>
                <br/>
                <input type="submit" value="회원가입" class="submit-btn"></input>
             </form>
{/* 
                <div className="links">
                    <a href="#2">로그인</a>
                    <br></br>
                    <hr className="hr1"></hr>
                <a href="#">아이디, 비밀번호 찾기</a>
                </div> */}
            </div>
    )
}