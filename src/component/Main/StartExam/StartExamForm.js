import React, { useState, useEffect } from "react";
import style from "./StartExam.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import $ from 'jquery'

var  multipleChoiceIds= [];
export function StartExamForm(props) {

    const history = useHistory();
    var userId = 'yeong@naver.com'
    var submitList = [];

    var [question, setQuestion] = useState(null);
    var [num, setNum] = useState(0);

    const handleDecrese = () => {
      if(num == 0) alert('첫번째 페이지입니다')
      else setNum(num - 1)
    }

    const handleIncrese = () => {
      if(num == question.length-1) alert('마지막 페이지입니다')
      else setNum(num + 1)
    }
  
    const onChangeCheck = (e) => {
      const checked = e.target.checked;
      const value = e.target.value;
      // const a = value.split(",");     

      if (checked) {
        multipleChoiceIds.push({
          id : value
        })
         //console.log(multipleChoiceIds)
      }
      // 체크해제
      else {
        var uncheked = value
        // console.log(uncheked)
        var temp = []
        for(let i = 0; i < multipleChoiceIds.length; i++) {
          if(multipleChoiceIds[i].id != uncheked)
            temp.push(multipleChoiceIds[i])
        }
        multipleChoiceIds = temp
         console.log(multipleChoiceIds)
      }
    };


    var token = props.info.token
    console.log(token)

    var fixedstring = encodeURIComponent(escape(token));
    useEffect(() => {
        let completed = false;
        async function fetchData(){ 
            axios({
                method: 'get',
                url: '/problem/rangeQuestions?start=1&end=5',
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
        return () => {
          completed = true;
        };
    }, [fixedstring]);

        console.log(question)

        if(!question) return `NULL`;

        var count = 0;
        /* 정답개수 체크 */
        var listTag = [];
          for(let i = 0; i < question[num].choices.length; i++) {  //보기 길이 만큼
            if(question[num].choices[i].isCorrect === true)        // 정답이면 +1
              count++;
          }
          /* 보기 출력 */
          for(let j = 0; j < question[num].choices.length; j++) {
            var bogi = question[num].choices[j].choice 
            var id = question[num].choices[j].id
            var questionId = question[num].choices[j].questionId
            listTag.push(
              <label> 
                 <input type="checkbox" value={id} onClick={(e) => onChangeCheck(e)}/>
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
            <h2 style={{lineHeight : 1.5}} data-key={question[num].id}>{question[num].id} . {question[num].exam}</h2>
            <div className="container">
              <form>
                {listTag}
              </form>
            </div>
            <div className="btn-forms" style={{ marginTop: 30 }}>
              <Link to="#">
                <button className={style.btn1} onClick={handleDecrese.bind()}>이전</button>
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
                  <button className={style.btn3} onClick={handleIncrese.bind()}>다음</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
