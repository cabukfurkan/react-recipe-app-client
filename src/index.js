import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { legacy_createStore as createStore, combineReducers } from 'redux';
import changeRecipe from './store/reducer/recipeId'
import changeApiKey from './store/reducer/updateApi'
import { Provider } from 'react-redux';


//store
const rootReducer = combineReducers({
  recipeId_Data: changeRecipe,
  apiKey_Data: changeApiKey,
})

const store = createStore(rootReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
