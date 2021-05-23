import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import style from "./PageBar.module.css"

export const PageBar = (props) => {
    return (
        <div className={style.PageBar}>
            <button className={style.MoveLeft}>
                <FontAwesomeIcon icon={faChevronLeft}/> 이전
            </button>
            
            {renderMoveBtn(0)}
                
            <button className={style.MoveRight}>
                다음 <FontAwesomeIcon icon={faChevronRight} /> 
            </button>
        </div>
    );
}

function renderMoveBtn(page){
    var rows = [];

    for(let i = 1 ; i <= 10 ; i++){
        rows.push(<button key={i} className={style.PageMoveBtn}>
            {page*10+i}
        </button>)
    }
    return rows;
}