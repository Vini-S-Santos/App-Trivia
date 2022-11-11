import { combineReducers } from 'redux';
import player from './player';
import user from './userAndEmail';

const rootReducer = combineReducers({ user, player });

export default rootReducer;
