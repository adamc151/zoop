//ACTION TYPES - used to label each action
export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';


//ACTIONSSSS - these basically label the input argument
//Then the reducers can be like ...if(action1){ do this }...else if(action2){ do this instead }...etc
export function addTransactions(file) {
  return {type: ADD_TRANSACTIONS, payload: file};
}
