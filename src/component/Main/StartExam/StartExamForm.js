import React, { useState, useEffect } from "react";
import style from "./StartExam.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'

export function StartExamForm(props) {
    const history = useHistory();

    var [question, setQuestion] = useState(null);

    var token = props.token
    var fixedstring = encodeURIComponent(escape(token));
    useEffect( () => {
        let completed = false;
        async function fetchData(){
            axios({
                method: 'get',
                url: '/problem/question/1',
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                  "Authorization" : `Bearer ${fixedstring}`,
                  withCredentials: true,
                  mode: 'no-cors',
                }
            }).then(response => {
                var data = response.data;
                if(!completed) setQuestion(data)
                console.log(data)
            });
        }
        fetchData();
        return () => {
            completed = true;
          };
    }, [fixedstring]);
    
    
        if(!question) return `NULL`;
    
   
  return (
    <div className="board">
      <div className={style.container}>
        <div className={style.inner}>
          <div className={style.maintab}>
            <p className={style.page}>1/20</p>
            <h2> 
              {question.id} . {question.exam}
            </h2>
            <div className="container">
              <form>
                <label>
                  <input type="radio" name="radio" />
                  <span>1. DoS attack</span>
                </label>
                <label>
                  <input type="radio" name="radio" />
                  <span>2. spyware</span>
                </label>
                <label>
                  <input type="radio" name="radio" />
                  <span>3. identity theft</span>
                </label>
                <label>
                  <input type="radio" name="radio" />
                  <span>4. zero-day attack</span>
                </label>
              </form>
            </div>
            <div className="btn-forms" style={{ marginTop: 30 }}>
              <Link to="#">
                <button className={style.btn1}>이전</button>
              </Link>
              <div className="bottom-btn right" style={{ float: "right" }}>
                <Link to="#">
                  <button
                    onClick={(e) =>
                      window.confirm("정말 제출하시겠습니까?") &&
                      history.push("/totalpage")
                    }
                    className={style.btn2}
                    id="sub"
                  >
                    제출
                  </button>
                </Link>
                <Link to="#">
                  <button className={style.btn3}>다음</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
