import { combineReducers } from 'redux';
import user from './userAndEmail';
import player from './player';

const rootReducer = combineReducers({ user, player });

export default rootReducer;
