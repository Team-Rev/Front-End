import React, { useState, useEffect } from 'react';
import {Doughnut} from 'react-chartjs-2';

export function Graph(props) {

  const [isFetch, setIsFetch] = useState(false);
  const [data, setData] = useState(null);
  useEffect( () => {
    if(!isFetch && props.correct >= 0 && props.uncorrect >= 0){
      console.log("UPDATE DATA")
      setData({
        labels: [
          '정답',
          '오답',
        ],
        datasets: [{
          data: [props.correct, props.uncorrect],
          backgroundColor: [
              '#25bc6d',
              '#f44336',
          ],
          hoverBackgroundColor: [
              '#25bc6d',
              '#f44336',
          ]
        }]
      })
      console.log(data)
      setIsFetch(true)
    }
    
  });
  if(!isFetch) return null;

  return (
    <Doughnut data={data} />
  );
}