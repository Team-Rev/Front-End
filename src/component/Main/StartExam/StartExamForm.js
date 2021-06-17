import React, { useState, useEffect, Children } from "react";
import style from "./StartExam.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import $ from 'jquery'


export function StartExamForm(props) {

    const history = useHistory();
    var userId = props.userId  // yeong@naver.com 사용자 ID
    var [arr, setArr] = useState([
      
    ])
    var [data, setData] = useState([

    ])
    var [question, setQuestion] = useState(null);
    var [num, setNum] = useState(0);

    // 이전 버튼
    const handleDecrese = () => { 
      if(num == 0) alert('첫번째 페이지입니다')
      else {
        setNum(num - 1)
        if(data[num-1] != null) {
          $('.checks').prop('checked', false);
          var choiceIdlist = []
          // if(arr[num-1].questionId == num-1){
            choiceIdlist = data[num-1].multipleChoiceIds //문제 id가 들어감 ex) 256, 3
          // }else {
            
          // }
          for(let i = 0; i < choiceIdlist.length; i++){
            $(document).ready(function() {
              $("input:checkbox[id=" + choiceIdlist[i] + "]").prop("checked", true);
          })
        }
        }
    }
  }
    // 다음 버튼
    const handleIncrese = () => {
      if(num == question.length-1) alert('마지막 페이지입니다')
      else {
        setNum(num + 1)
        var choiceIdlist = []
        var prevIdlist = []
        choiceIdlist = data[num+1]
        prevIdlist = data[num]
        console.log(choiceIdlist)
        console.log(prevIdlist)
        if(choiceIdlist){
          // for(let j = 0; j < prevIdlist.multiple.length; j++){
          //   $(document).ready(function() {
          //     console.log(prevIdlist.multiple[j])
          //     $("input:checkbox[id=" + prevIdlist.multiple[j] + "]").prop("checked", false);
          //     console.log("체크 풀었다")
          //   })
          // }
          $('.checks').prop('checked', false);
          for(let i = 0; i < choiceIdlist.multipleChoiceIds.length; i++){
            $(document).ready(function() {
              $("input:checkbox[id=" + choiceIdlist.multipleChoiceIds[i] + "]").prop("checked", true);
              console.log("체크 했다")
            })
          }
        } else{
          $('.checks').prop('checked', false);
        }
      }
    }
    
    const onChangeCheck = (e) => {
      const checked = e.target.checked
      const value = e.target.value
      const list = value.split(",");
      const [bogi, choiceId, questionId, count] = list
      
    if(checked){
      var prevState = data;
      console.log(prevState)
      
      let submit = prevState.find( (prevSubmit) => {
        return prevSubmit.questionId === questionId;
      });
      console.log(submit)
      
      if(submit){
        console.log("submit 성공")
        let index = prevState.indexOf(submit);
        console.log(index)
        submit.multipleChoiceIds.push(choiceId);
        prevState[index] = submit;
      }else{
        console.log("submit 실패")
        submit = {
          questionId : questionId,
          multipleChoiceIds : [choiceId]
        }
        prevState.push(submit);
      }
      setData(prevState);
    }
      // 체크해제
      else {
        let prevState = data;
        
        let submit = prevState.find( (prevSubmit) => {
          return prevSubmit.questionId === questionId;
        });
        console.log(submit)
        
        if(submit){
          let index = prevState.indexOf(submit);
          console.log(index)
          let multiple = submit.multipleChoiceIds.find( (multiple) => {
            console.log(choiceId)
            return multiple === choiceId;
          });
          console.log(multiple)
          if(multiple){
            let index = submit.multipleChoiceIds.indexOf(multiple);
            submit.multipleChoiceIds.splice(index);
          }
          prevState[index] = submit;
        }
        setData(prevState);
      }
    };
    console.log(arr)

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
                  "Authorization" : `Bearer ${fixedstring}`,
                }
            }).then(response => {
                var data = response.data;
                if(!completed) {
                  setQuestion(data)
                  var temp = []
                  for(let i = 0; i < data.length; i++){
                    let success = {
                      questionId : String(data[i].id),
                      multipleChoiceIds : []
                    }
                    temp.push(success)
                  }
                  setData(temp)
                }
            });
        }
        fetchData();
        return () => {
          completed = true;
        };
    }, [fixedstring]);    
        console.log(question)

        


        if(!question) return `NULL`;  

        console.log(question[0].id)
        console.log(question.length)
        
        console.log(data)

        var count = 0;
        /* 정답개수 체크 */
        var listTag = [];
          /* 보기 출력 */
          for(let j = 0; j < question[num].choices.length; j++) {  
            var bogi = question[num].choices[j].choice          
            var choiceid = question[num].choices[j].id
            var questionId = question[num].choices[j].questionId
            var choice = [bogi, choiceid, questionId, count]
            listTag.push(
              <label> 
                 <input type="checkbox" id={choiceid} className="checks" value={choice} onClick={(e) => onChangeCheck(e)}/>
                 <span key={choiceid}> {bogi} </span>
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
                <Link to={{pathname : '/totalpage', state : 
                    {   submitList : data, 
                        userId : userId, 
                        token : token,
                        count : question.length,
                        question : question
                    }}}>
                  <button>제출</button>
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
