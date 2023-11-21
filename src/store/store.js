import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import AdminReducer from '../reducers/adminReducer';
import LabelsReducer from '../reducers/labelsReducer';
import LabelsSortReducer from '../reducers/labelsSortReducer';

const rootReducer = combineReducers({
    admin: AdminReducer,
    label: LabelsReducer,
    sort: LabelsSortReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;