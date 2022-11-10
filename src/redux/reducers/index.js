import { combineReducers } from 'redux';
import score from './score';
import user from './userAndEmail';
import play from './play';

const rootReducer = combineReducers({ user, play, score });

export default rootReducer;
