import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar'
import { Container } from '../../Container/Container'
import { useHistory, useLocation } from 'react-router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import style from './Writer.module.css'
import axios from 'axios';

export function Writer (props) {
    return (
        <>
            <Container content={WriterBoard} info={props.info}/>
        </>
    );
};

const WriterBoard = (props) => {

    const [title, setTitle] = useState()
    const [writer, setWriter] = useState()
    const [content, setContent] = useState()
    const id = useSelector(state => state.user.id)
    const nickname = useSelector(state => state.user.nickname)

    const location = useLocation();
    const chk = location.state.chk
    const history = useHistory()

    const [postchk, setPostchk] = useState(chk);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (chk === "noticheck") {
        axios({
            method : 'post',
            url : '/board/notice',
            data : {
                "userId" : id,
                "title": title,
                "content": content
            }
        }).then(res => {
            history.push('/notice')
        }).catch(error => console.log(error))
      } else if (chk === "quescheck") {
        axios({
            method : 'post',
            url : '/board/ask',
            data : {
                "userId" : id,
                "nickname" : nickname,
                "title": title,
                "content": content
            }
        }).then(res => {
            history.push('/question')
        }).catch(error => console.log(error))
      }
    } 

    const backBtn = (e) => {
        if (chk === "noticheck") {
            history.push('/notice')
        } else {
            history.push('/question')
        }
    }

    const handleInput = (e) => {
        var name = e.target.name
        switch(name) {
            case "title":
                setTitle(e.currentTarget.value);
                break;
            case "content":
                setContent(e.currentTarget.value);
                break;
            default:
                break;
        }
    }

    return (
        <div className={style.container}>
            <div className={style.contentbox}>
               <div className={style.writerbox}> 
               <form>
               <table className={style.boardWrite}>   
                <tbody>
                    <tr>
                        <th scope="row"><label for="bWriter">작성자</label></th>
                        <td class="writer"><input type="text" name="bWriter" id="bWriter"/></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="bTitle">제목</label></th>
                        <td class="title"><input type="text" name="bTitle" id="bTitle"/></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="bContent">내용</label></th>
                        <td class="content"><textarea name="bContent" id="bContent"></textarea></td>
                    </tr>
                </tbody>
            <div className={style.btnSet}>
                <button className={style.EnterBtn} onClick={handleSubmit}>등록하기</button>
                <button className={style.EnterBtn} onClick={backBtn}>목록으로</button>
            </div>
            </table> 
            </form>
            </div> 
        </div>
    </div>
    )
}
