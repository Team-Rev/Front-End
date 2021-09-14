import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar'
import { Container } from '../../Container/Container'
import { useHistory } from 'react-router';
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

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method : 'post',
            url : '/board/post',
            data : {
                "userId" : id,
                "title": title,
                "content": content
            }
        }).then(res => {
            history.push('/notice')
        }).catch(error => console.log(error))
    }

    const backBtn = (e) => {
        history.push('/notice')
    }

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
                    <textarea name="content" value={content} onChange={handleInput} rows="10"></textarea>
                </div>
                <button className={style.EnterBtn} onClick={handleSubmit}>등록하기</button>
                <button className={style.EnterBtn} onClick={backBtn}>목록으로</button>
                </form>
              </div> 
            </div>
        </div>
    )
}
