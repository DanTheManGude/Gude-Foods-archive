import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { users } from './users.js';

//reducer current logged in user
const currentUser = (state = {'email': null, 'status': false}, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            var email = action.email;
            var status = users.includes(email);
            return {
                'email': email,
                'status': status
            }
        default:
            return state;
        }
}

//reducer for the banner
const initialMessage = <div>Welcome to Gude Foods. Featuring recipes of some pretty Gude foods.<br />Click on the Add to add a new Recipie or click on an existing one to edit it.</div>

const banners = (state = [{'message': initialMessage, 'type': 'alert-info'}], action) => {
    switch (action.type) {
        case 'ADD_BANNER':
            return state.concat({'message': action.message, 'type': action.kind});
        case 'REMOVE_BANNER':
            var newS = state;
            newS.splice(action.id, 1);
            return newS;
        default:
            return state;
    }
}

const recipes = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_RECIPES':
            return action.state;
        case 'EDIT_RECIPE':
            if (action.index === state.length){
                return state.concat(action.state);
            }
            var editS = state;
            editS.splice(action.index, 1, action.state);
            return editS;
        case 'DELETE_RECIPE':
            var delS = state;
            delS.splice(action.index, 1);
            return delS;
        default:
            return state;
    }
}

const editingRecipe = (state = null, action) => {
    switch (action.type) {
        case 'EDITING_RECIPE':
            return {recipe: action.state, index: action.index};
        default:
            return state;
    }
}

//main reducer
const appState = combineReducers({
    currentUser,
    banners,
    recipes,
    editingRecipe
});

//redux store
export const store = createStore(appState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//root render of the application
const render = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('root')
    );
};

//linking the store to rendering the application
store.subscribe(render);
render();

registerServiceWorker();
