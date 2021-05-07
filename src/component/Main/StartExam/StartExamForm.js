import React, { useState, useEffect } from "react";
import style from "./StartExam.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'

export function StartExamForm(props) {
    const history = useHistory();
    
    var [question, setQuestion] = useState(null);
    var [num, setNum] = useState(0);

    var submitList = [
      {
        iscorrect
      }
    ]


    const onChangeCheck = (e) => {
      const checked = e.target.checked;
      const value = e.target.value;
      const count = e.target.name;

      const data = [
        {

        }
      ]

      if (checked) {
        console.log(e)
        console.log(value)
        console.log(count)
      }
      else {
        
      }
    };

    var token = props.token

    var fixedstring = encodeURIComponent(escape(token));
    useEffect(() => {
        let completed = false;
        async function fetchData(){ 
            axios({
                method: 'get',
                url: '/problem/rangeQuestions?start=1&end=20',
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
            });
        }
        fetchData();
    }, [fixedstring]);

    console.log(question)

    
    
        if(!question) return `NULL`;
        var count = 0;
        /* 보기 체크 */
        var listTag = [];
       /* var counts = [];*/
          for(let i = 0; i < question[num].choices.length; i++) {
            if(question[num].choices[i].isCorrect === true)
              count++;
              /*counts*/
          }

          for(let j = 0; j < question[num].choices.length; j++) {

            var choice = [question[num].choices[j].id, question[num].choices[j].isCorrect]
            
            var bogi = question[num].choices[j].choice
            var id = question[num].choices[j].id
            var iscorrect = question[num].choices[j].isCorrect
            listTag.push(
              <label> 
                 <input type="checkbox" value={choice} name={count}  onClick={(e) => onChangeCheck(e)}/>
                 <span key={id}> {bogi} </span>
              </label> 
            )
          }

  return (
    <div className="board">
      <div className={style.container}>
        <div className={style.inner}>
          <div className={style.maintab}>
            <p className={style.page}>{num + 1} / {question.length}  </p>
            <h2 data-key={question[num].id}>{question[num].id} . {question[num].exam}</h2>
            <div className="container">
              <form>
                {listTag}
              </form>
            </div>
            <div className="btn-forms" style={{ marginTop: 30 }}>
              <Link to="#">
                <button className={style.btn1} onClick={() => setNum(num - 1)}>이전</button>
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
                  <button className={style.btn3} onClick={() => setNum(num + 1)}>다음</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
