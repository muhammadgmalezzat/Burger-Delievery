import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter  } from 'react-router-dom'
import './index.module.css';
import App from './App';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore ,applyMiddleware,compose,combineReducers} from 'redux'; 
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import  auth  from './store/reducers/auth';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth:auth
})
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
    

);

