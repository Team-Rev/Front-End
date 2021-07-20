import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './component/App/App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './store/modules'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);



function Contrainer(){
    return (
      <Provider store={store}>  
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
      </Provider>
    );
}

console.log(store.getState())

ReactDOM.render(
  <Contrainer />,
  document.getElementById('body__container')  
);