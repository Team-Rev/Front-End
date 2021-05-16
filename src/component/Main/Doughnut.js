import React from 'react';
import {Doughnut} from 'react-chartjs-2';
const data = {
  labels: [
    '정답',
    '오답',
  ],
  datasets: [{
    data: [15, 5],
    backgroundColor: [
        '#25bc6d',
        '#f44336',
    ],
    hoverBackgroundColor: [
        '#25bc6d',
        '#f44336',
    ]
  }]
};
function App() {
  return (
    <div>
        <Doughnut data={data} />
    </div>
  );
}
export default App;