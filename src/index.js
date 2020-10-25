import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)
const app = (
    <Provider store={store}>
        <App/>
    </Provider>
)

ReactDOM.render(app,document.getElementById('root'))

serviceWorker.unregister();
