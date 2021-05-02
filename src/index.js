import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './component/App/App'

function Contrainer(){
    return (
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>

    );
}

ReactDOM.render(
  <Contrainer />,
  document.getElementById('body__container')  
);