
import { combineReducers } from 'redux';
import dictionaryData from './dictionaryData'


const rootReducer = combineReducers({
    dictionaryData: dictionaryData
});

export default rootReducer;