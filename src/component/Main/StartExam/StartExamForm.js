import React, { useState, useEffect } from "react";
import style from "./StartExam.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import $ from 'jquery'


export function StartExamForm(props) {

    const history = useHistory();
    var userId = props.userId  // yeong@naver.com 사용자 ID
    var [check, setCheck] = useState(false)
    var [arr, setArr] = useState([
      {
        
      }
    ])
    var [submitList, setSubmitList] = useState({  //문제 ID와 선택한 보기가 들어가는 배열
        questionId : '',
        multiple : []
    })

    var [question, setQuestion] = useState(null);
    var [num, setNum] = useState(0);
    // 이전 버튼
    const handleDecrese = () => {
      if(num == 0) alert('첫번째 페이지입니다')
      else {
        setNum(num - 1)
      }
    }
    // 다음 버튼
    const handleIncrese = () => {
      if(num == question.length-1) alert('마지막 페이지입니다')
      else {
        setNum(num + 1)
        $('.checks').prop('checked', false);
      }
    }


    const onChangeCheck = (e) => {
      var temp = []
      const checked = e.target.checked
      const value = e.target.value
      const list = value.split(",");
      const [bogi, bogiid, questionId, count] = list
      
    if(checked) {
      setSubmitList((prevState) => ({
        ...prevState,
        questionId : questionId,
        ["multiple"] : [...prevState["multiple"].concat(bogiid)],
      }));
    }
    //   setSubmitList({
    //     ...submitList,
    //     [questionId] : questionId,
    //     [multiple] : bogiid,
    //   })
    // }
      // 체크해제
      else {
        setSubmitList((prevState) => ({
          ...prevState,
          questionId : questionId,
          ["multiple"] : [...prevState["multiple"].filter((element) => (element) !== bogiid)],
        }));
      }
    };
    console.log(submitList)

    var token = props.info.token
    //console.log(token)

    var fixedstring = encodeURIComponent(escape(token));
    useEffect(() => {
        let completed = false;
        async function fetchData(){ 
            axios({
                method: 'get',
                url: '/problem/rangeQuestions?start=1&end=10',
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

    console.log(props.info.token)


        if(!question) return `NULL`;

        var count = 0;
        /* 정답개수 체크 */
        var listTag = [];
          /* 보기 출력 */
          for(let j = 0; j < question[num].choices.length; j++) {  
            var bogi = question[num].choices[j].choice          
            var bogiid = question[num].choices[j].id
            var questionId = question[num].choices[j].questionId
            var choice = [bogi, bogiid, questionId, count]
            listTag.push(
              <label> 
                 <input type="checkbox" className="checks" value={choice} onClick={(e) => onChangeCheck(e)}/>
                 <span key={bogiid}> {bogi} </span>
              </label> 
            )
          }
          for(let i = 0; i < question[num].choices.length; i++) {  //보기 길이 만큼
            if(question[num].choices[i].isCorrect === true)        // 정답이면 +1
              count++
          }
       
        //   $("input:checkbox").on('click', function() {
        //     if($('input:checkbox:checked').length == 1) {
        //         $(":checkbox:not(:checked)").attr("disabled", "disabled");
        //     } else {
        //         $("input:checkbox").removeAttr("disabled");
        //     }
        // })
      // } else if(count == 2) {
      //   $("input:checkbox").on('click', function() {
      //     if($('input:checkbox:checked').length == 2) {
      //         $(":checkbox:not(:checked)").attr("disabled", "disabled");
      //     } else {
      //         $("input:checkbox").removeAttr("disabled");
      //     }
      // })

          

          // var url = "http://34.64.73.179:8760/problem/submit"

          // axios({
          //     method : 'post',
          //     url : url,
          //     data : {
          //         "userId" : userId,
          //         "submitList" : []
          //     }
          // })

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
                    history.push("/totalpage")}
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
