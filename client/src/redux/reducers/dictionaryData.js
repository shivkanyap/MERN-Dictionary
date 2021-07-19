import { FETCH_ALL, POST_DATA, SEARCH_WORD } from '../actions/types';

const initialState = {
  allData: [],
};
const dictionaryData = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        allData: action.allData,
      };
    case POST_DATA:
      return {
        ...state,

        allData: [...state.allData, action.addedWord],
      };
    case SEARCH_WORD:
      return {
        ...state,
        allData: action.allData,
      };
    default:
      return state;
  }
};
export default dictionaryData;
