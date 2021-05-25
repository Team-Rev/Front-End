import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import style from "./PageBar.module.css"
import axios from 'axios';

export const PageBar = (props) => {
    return (
        <div className={style.PageBar}>
            <button className={style.MoveLeft} onClick={ () => {
                if(props.nowPage/10 > 0) props.setNowPage(props.nowPage-10)
            }}>
                <FontAwesomeIcon icon={faChevronLeft}/> 이전
            </button>
            
            {renderMoveBtn( props.nowPage, parseInt(props.pageCount/10), props.setPageAsk )}
                
            <button className={style.MoveRight} onClick={ () => {
                if(parseInt(props.pageCount/10) - Math.floor(props.nowPage)> 10) props.setNowPage(Math.floor(props.nowPage)+10)
            }}>
                다음 <FontAwesomeIcon icon={faChevronRight} /> 
            </button>
        </div>
    );
}

function renderMoveBtn(page, max, setPageAsk){
    console.log(max)
    var rows = [];
    let left = max - page;
    left = left >= 10 ? 10 : left+1
    console.log(`${page}, ${left}`)
    page = parseInt(page/10);

    for(let i = 1 ; i <= left ; i++){
        rows.push(<button key={page*10+i} className={style.PageMoveBtn} onClick={ () => {
            axios({
                method : "get",
                url : `/board/ask?page=${page*10 + i - 1}`
            }).then( res => {
                setPageAsk(res.data.asks.content)
                console.log(res.data.asks.content)
            })
        }}>
            {page*10+i}
        </button>)
    }
    return rows;
}
