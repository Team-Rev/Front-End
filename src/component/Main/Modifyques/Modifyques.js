import React, { useState } from 'react';
import style from './Modifyques.module.css'
import { Container } from '../../Container/Container'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router';

export function Modifyques(props) {
    return (
        <Container content={ModifyquesBoard}/>
    )
}

const ModifyquesBoard = (props) => {

    const location = useLocation();
    const history = useHistory();
    const content = location.state.content
    console.log(content)
    const [title, setTitle] = useState(content.title)
    const [writer, setWriter] = useState(content.nickname)
    const [contents, setContents] = useState(content.content)

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
    //    e.preventDefault();
    //    axios({
    //        method : 'patch',
    //        url : '/board/ask',
    //        data : {
    //             "askId":"",
    //             "title":"",
    //             "content":""
    //        }
    //    })
    }

    return (
        <div className={style.container}>
        <div className={style.contentbox}>
           <div className={style.writerbox}> 
            <form>
            <div className="form-group">
                <label for="exampleFormControlInput1">제목</label>
                <input type="text" name="title" value={title} onChange={handleInput}/>
            </div>
            <div className="form-group">
                <label for="exampleFormControlInput1">작성자</label>
                <input type="text" name="writer" value={writer} onChange={handleInput}/>
             </div>
             <div className="form-group">
                <label for="exampleFormControlTextarea1">내용</label>
                <textarea name="content" value={contents} onChange={handleInput} rows="10"></textarea>
            </div>
            <button className={style.EnterBtn} onClick={handleChange}>수정하기</button>
            </form>
          </div> 
        </div>
    </div>
    )
}