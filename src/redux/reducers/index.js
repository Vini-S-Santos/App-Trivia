import { combineReducers } from 'redux';
import score from './score';
import user from './userAndEmail';

const rootReducer = combineReducers({ user, score });

export default rootReducer;
