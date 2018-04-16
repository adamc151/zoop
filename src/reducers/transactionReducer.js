import initialState from './initialState';
import {PARSE_FILE, ADD_TRANSACTIONS} from '../actions/actionTypes';

export default function transactions(state = initialState.transactions, action) {

  let newState;
  switch (action.type) {
    // case PARSE_FILE:
    //   console.log('FETCH_STUFF Action')
    //   return action;
    case PARSE_FILE:
      newState = action.transactions;
      console.log('PARSE_FILE Action')
      return newState;

      case ADD_TRANSACTIONS:
        newState = action.transactions;
        console.log('ADD_TRANSACTIONS Action')
        return newState;
    default:
      return state;
  }
}
