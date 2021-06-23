import React, { useEffect, useState } from 'react';
import axios from 'axios'
import style from './TotalPage.module.css'
import {Graph} from '../Doughnut'
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

  export function TotalPageForm(props) {
    const handleInput = (e) => setShowing(e.target.getAttribute('data-key'))
  
    const TopBar = (props) => {
      return (
        <div className={style.maintab}>
          <ul>
            <li id="total" onClick={handleInput} className={style.p} data-key="totalpage">종합</li>
            <li id="correct" onClick={handleInput} className={style.p} data-key="answerpage">정답</li>
            <li id="uncorrect" onClick={handleInput} className={style.p} data-key="falsepage">오답</li>     
          </ul>           
        </div>
      );
    }

    const ColorInfo = (props) => {
      return(
          <div className={style.ColorInfo}>
              <ul>
                  <li>
                      <div className={style.ActualInfo}></div>
                      <div> Actual</div>
                  </li>
                  <li>
                      <div className={style.SelectInfo}></div>
                      <div> Your select</div>
                  </li>
              </ul>
          </div>
      );
  }

  const ColorInfoSub = (props) => {
    return(
      <div className={style.ColorInfo}>
        <ul>
          <li>
            <div className={style.RightInfo}></div>
            <div> Right</div>
          </li>
        </ul>
      </div>
    )
  }
  
    const FalseChk = (props) => {
      console.log(count)
      const reslen = props.reslen;
      const resultList = props.resultList
      const detail = props.detail
      const question = props.question

      console.log(question)

      var uncorrect = [] // 틀린 문제 details
      var uncorrectQues = [] // 틀린 문제 ques
      var correct = []
      var correctQues = []

      for(let i = 0; i < reslen; i++) {
          if(resultList.details[i].correct === false) {
            uncorrect.push(detail[i])
            uncorrectQues.push(question[detail[i].questionId-1])
          } else {
            correct.push(detail[i])
            correctQues.push(question[detail[i].questionId-1])
          }
      }

      const renderChoice = (choice, detailChoices, question) => {
        const detailChoice = detailChoices.find(function(detailChoice){
          return detailChoice.multipleChoiceId === choice.id;
        });
        if(detailChoice) return(<li className={style.Choice}>{choice.choice}</li>);    // 사용자가 선택한 답
        if(choice.isCorrect) return(<li className={style.Right}>{choice.choice}</li>); // 실제 답
        return (<li className={style.Normal}>{choice.choice}</li>);
      }

      const renderQuestion = (question) => {
        const details = detail.find(function (details){
          return details.questionId === question.id
        });
        return(
          <div>
            <div>
              {`${question.id}. ${question.exam}`}
            </div>
            <ol className={style.Choices}>
              {question.choices.map( choice =>(
                renderChoice(choice, details.choices, question)
              ))}
            </ol>
          </div>
        )
      }

       // 문제 순 대로 정렬
       var obj = [...uncorrectQues];
       obj.sort((a, b) => a.id - b.id);


      var index = 0;
      return (
        <div className={style.DetailBoard}>
           {!obj && <div>Select the record.</div>}
           {obj && obj.map(question => (
             renderQuestion(question, ++index)
           ))}
        </div>
      );
    }
  
    const CurrentChk = (props) => {
      const reslen = props.reslen;
      const resultList = props.resultList
      const detail = props.detail
      const question = props.question

      console.log(question)

      var uncorrect = [] // 틀린 문제 details
      var uncorrectQues = [] // 틀린 문제 ques
      var correct = []
      var correctQues = []

      for(let i = 0; i < reslen; i++) {
          if(resultList.details[i].correct === false) {
            uncorrect.push(detail[i])
            uncorrectQues.push(question[detail[i].questionId-1])
          } else {
            correct.push(detail[i])
            correctQues.push(question[detail[i].questionId-1])
          }
      }

      const renderChoice = (choice, detailChoices) => {
        const detailChoice = detailChoices.find(function(detailChoice){
          return detailChoice.multipleChoiceId === choice.id;
        });
        console.log({choice})
        if(detailChoice && choice.isCorrect) return(<li className={style.Match}>{choice.choice}</li>);
        return (<li className={style.Normal}>{choice.choice}</li>);
      }

      const renderQuestion = (question, index) => {
        // console.log(question)/
        const details = detail.find(function (details){
          return details.questionId === question.id
        });

        return(
          <div>
            <div>
              {`${question.id}. ${question.exam}`}
            </div>
            <ol className={style.Choices}>
              {question.choices.map( choice =>(
                renderChoice(choice, details.choices)
              ))}
            </ol>
          </div>
        )
      }

       // 문제 순 대로 정렬
       var obj = [...correctQues];
       obj.sort((a, b) => a.id - b.id);


      var index = 0;
      
      if(correctQues.length != 0){
      return (
        <div className={style.DetailBoard}>
           {!obj && <div>Select the record.</div>}
           {obj && obj.map(question => (
             renderQuestion(question, ++index)
           ))}
        </div>
      );
    } else{
      return(
      <div></div>
      )
    }
  }
  
    const TotalPage = (props) => {
      console.log(`ANSWER : ${props.ans}, WRONG : ${props.wrong}`)
      return (
           <div>
               <div style={{width : 250 , margin : "0 auto"}}> 
                  {<Graph correct={props.ans} uncorrect={props.wrong}/> }
               </div>
               <div className={style.total}>
                  <div className={style.total_box}>
                    <p>전체</p>
                    <p>{props.total}</p>
                  </div>
                  <div className={style.total_box}>
                    <p>정답</p>
                    <p style={{color : "#25bc6d"}}>{props.ans}</p>
                  </div>
                  <div className={style.total_box}>
                    <p>오답</p>
                    <p style={{color : "red"}}>{props.wrong}</p>
                  </div>
               </div>
               <div>
                  <p className={style.keyword}>POINT KEYWORDS</p>
               </div>
               <div>
                  <button className={style.btna}>Inter-VLAN-Routing</button>
                  <button className={style.btnb}>Security</button>
                  <button className={style.btna}>OSPF</button>
                  <button className={style.btnb}>Subnetting</button>
                  <button className={style.btna}>Threat</button>
                  <button className={style.btnb}>VLAN</button>
                  <button className={style.btna}>Routing</button>
                  <button className={style.btnb}>ACL</button>
                  <button className={style.btna}>VLSM</button>
                  <button className={style.btnb}>Spyware</button>
                  <button className={style.btna}>NAT</button>
                  <button className={style.btnb}>Protocol</button>
                  <button className={style.btna}>TCP-IP</button>
                  <button className={style.btnb}>Switch Device</button>
                  <button className={style.btna}>QoS Concepts</button>
                  <button className={style.btnb}>Traffic</button>
                  <button className={style.btna}>Troubleshooting</button>
               </div>
            </div>
      );
    }

    const [isCompleted, setIsCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [anscount, setAnscount] = useState("");
    const [resultList, setResultList] = useState([]);
    const [showing, setShowing] = useState("totalpage");
    var submitList = props.submitList
    var userId = props.userId
    var token = props.token
    var count = props.count
    var fixedstring = encodeURIComponent(escape(token));
  
    useEffect(() => {
      async function fetchData(){ 
          setIsLoading(true);
          axios({
              method: 'post',
              url: '/problem/submit',
              headers: {
                "Authorization" : `Bearer ${fixedstring}`,
              },
              data : {
                  'userId' : userId,
                  'submitList' : submitList
              }
          }).then(res => {
              var data = res.data;
              setResultList(data)
              setAnscount(data.correctCount)
              setIsLoading(false)
          });
        }

        if(!isCompleted) fetchData();
        
        return () => {
            setIsCompleted(true);
        }
    }, [fixedstring])
    console.log(userId)
    console.log(resultList)


    if(isLoading) return <div>loading...</div>

    return (
      <div className="board">
        <div className={style.container}>
          <div className={style.inner}>
            <TopBar/>
            {showing === "totalpage" && <TotalPage total={count} ans={anscount} wrong={count - anscount} />}

            {showing === "answerpage" && <ColorInfoSub/>}
            {showing === "answerpage" && <CurrentChk question={props.question} resultList={resultList} reslen={resultList.details.length} detail={resultList.details}/>}
            
            {showing === "falsepage" && <ColorInfo/>}
            {showing === "falsepage" && <FalseChk question={props.question} resultList={resultList} reslen={resultList.details.length} detail={resultList.details}/>}
          </div>  
        </div>  
      </div>
    );
    
  };



