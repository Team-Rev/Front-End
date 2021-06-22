
import style from './ContentCard.module.css'

export const ContentCard = (props) => {
    return(
        <div className={style.ContentCard}>
            <div className={style.ContentTitle}>
                {props.title}
            </div>
            <div className={style.ContentDetail}>
                {props.content}
            </div>
        </div>
    );
}