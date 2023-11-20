import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import AdminReducer from '../reducers/adminReducer';
import LabelsReducer from '../reducers/labelsReducer';

const rootReducer = combineReducers({
    admin: AdminReducer,
    label: LabelsReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;