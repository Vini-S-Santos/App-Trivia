import { combineReducers } from 'redux';
import user from './userAndEmail';

const rootReducer = combineReducers({ user, score });

export default rootReducer;
