import React, { useState } from 'react';
import style from './Modifyques.module.css'
import { Container } from '../../Container/Container'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

export function Modifyques(props) {
    return (
        <Container content={ModifyquesBoard}/>
    )
}

const ModifyquesBoard = (props) => {

    const location = useLocation();
    const history = useHistory();
    const content = location.state.content
    const [check, setCheck] = useState(location.state.chk)
    console.log(check + "   " + content)

    const [title, setTitle] = useState(content.title)
    const [writer, setWriter] = useState(content.nickname)
    const [contents, setContents] = useState(content.content)
    const id = useSelector(state => state.user.id)

    const handleInput = (e) => {
        var name = e.target.name
        switch(name) {
            case "title":
                setTitle(e.currentTarget.value);
                break;
            case "writer":
                setWriter(e.currentTarget.value);
                break;
            case "content":
                setContents(e.currentTarget.value);
                break;
            default:
                break;
        }
    }

    const handleChange = (e) => {
       e.preventDefault();
       if (check === "noticheck") {
        axios({
            method : 'patch',
            url : '/board/notice',
            data : {
                    "noticeId" : content.noticeId,
                    "title" : title,
                    "content" : contents 
            }
        }).then(res => {
            if (res.data === "OK") {
                history.push('/notice')
            } else {
                alert('수정오류')
            }
        })
       } else {
        axios({
            method : 'patch',
            url : '/board/ask',
            data : {
                    "askId" : content.askId,
                    "title" : title,
                    "content" : contents 
            }
        }).then(res => {
            if (res.data === "SUCCESS") {
                history.push('/question')
            } else {
                alert('수정오류')
            }
        })
       }
    }

    const handleRollback = (e) => {
        if (check === "noticecheck") {
            history.push('/notice')
        } else {
            history.push('/question')
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
                        <th scope="row"><label for="bWriter">제목</label></th>
                        <td class="writer"><input type="text" name="title" id="bWriter" value={title} onChange={handleInput}/></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="bTitle">작성자</label></th>
                        <td class="title"><input type="text" name="writer" id="bTitle" value={writer} onChange={handleInput} disabled/></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="bContent">내용</label></th>
                        <td class="content"><textarea name="content" id="bContent" value={contents} onChange={handleInput}></textarea></td>
                    </tr>
                    
                </tbody>
            </table>
            </form>
            <div className={style.Btns}>
                <button className={style.EnterBtn} onClick={handleChange}>수정하기</button>
                <button className={style.EnterBtn} onClick={handleRollback}>목록으로</button>
            </div>
          </div> 
        </div>
    </div>
    )
}

{/* <div className="form-group">
                        <label for="exampleFormControlInput1">제목</label>
                        <input type="text" name="title" value={title} onChange={handleInput}/>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">작성자</label>
                        <input type="text" name="writer" value={writer} onChange={handleInput} disabled/>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">내용</label>
                        <textarea name="content" value={contents} onChange={handleInput} rows="10"></textarea>
                    </div> */}