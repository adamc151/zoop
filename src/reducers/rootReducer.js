import {combineReducers} from 'redux';
import transactions from './transactionReducer';
import monthlyTransactions from './monthlyTransactionReducer';

///When number of reducers increases this basically groups them all together
//So they're all checked when any action is called
const rootReducer = combineReducers({
  transactions,
  monthlyTransactions
});

export default rootReducer;
