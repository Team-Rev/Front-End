import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './component/App/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/modules'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

const persistConfig = {
    key : 'root',
    storage
}

const persisted = persistReducer(persistConfig, rootReducer)
const store = createStore(persisted, compose(
  applyMiddleware(promiseMiddleware, ReduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
)

const persistor = persistStore(store)

// const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// const store = createStore(rootReducer, devTools);



function Contrainer(){
    return (
      <Provider store={store}>
       <PersistGate persistor={persistor}>  
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
        </PersistGate> 
      </Provider>
    );
}

console.log(store.getState())

ReactDOM.render(
  <Contrainer />,
  document.getElementById('body__container')  
);