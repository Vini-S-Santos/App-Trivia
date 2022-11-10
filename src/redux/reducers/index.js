import { combineReducers } from 'redux';
import user from './userAndEmail';
import play from './play';

const rootReducer = combineReducers({ user, play });

export default rootReducer;
