//ACTION TYPES - used to label each action
export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
export const GET_TRANSACTIONS_IN_RANGE = 'GET_TRANSACTIONS_IN_RANGE';


//ACTIONSSSS - these basically label the input argument
//Then the reducers can be like ...if(action.type == ADD_TRANSACTIONS){ do this }...else if(action.type == GET_TRANSACTIONS_IN_RANGE){ do this instead }...etc
export function addTransactions(file) {
  return {type: ADD_TRANSACTIONS, payload: file};
}

export function getTransactionsInRange(startDate, endDate) {
  return {type: GET_TRANSACTIONS_IN_RANGE, payload: { startDate: startDate, endDate: endDate }};
}
