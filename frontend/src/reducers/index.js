import { combineReducers } from 'redux';
import leads from './leads';
import user from './user';

export default combineReducers({
    leads,
    user,
});