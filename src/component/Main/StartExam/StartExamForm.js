import React from 'react';
import style from './StartExam.module.css'
import styles from './StartExam.module.css'
import { Link, useHistory } from 'react-router-dom'

export function StartExamForm() {

    const history = useHistory();

    
    return (
        <div className="board">
          <div className="board-float">  
            <div className={style.main}>  
                <h2>
                1. During a routine inspection, a <br/>
                technician discovered that software<br/>
                that was installed on a computer was<br/> 
                secretly collecting data about<br/>
                websites that were visited by users of<br/>
                the computer. Which type of threat is<br/>
                affecting this computer?
                </h2>
            <div class="container">
                <form>
                <label>
                    <input type="radio" name="radio"/>
                    <span>1. DoS attack</span>
                </label>
                <label>
                    <input type="radio" name="radio"/>
                    <span>2. spyware</span>
                </label>
                <label>
                    <input type="radio" name="radio"/>
                    <span>3. identity theft</span>
                </label>
                <label>
                    <input type="radio" name="radio"/>
                    <span>4. zero-day attack</span>
                </label>
                </form>
            </div>
          <div className="btn-forms" style={{marginTop : 30}}>  
                <Link to="#"><button className={styles.btn1} style={{}}>이전</button></Link>
            <div className="bottom-btn right" style={{ float : 'right'}}>
                <Link to="#">
                    <button  
                    onClick={e => window.confirm("정말 제출하시겠습니까?") 
                    && history.push('/')}
                    className={styles.btn2} id="sub">제출</button></Link>
                <Link to="#"><button className={styles.btn3}>다음</button></Link>
            </div>
          </div>   
         </div>
        </div> 
    </div>
    );
};
