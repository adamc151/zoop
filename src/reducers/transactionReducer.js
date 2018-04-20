import { ADD_TRANSACTIONS } from '../actions/fileReadActions';
var moment = require('moment');
moment().toDate();

//the initial store (global app state)
let initialState = {
    transactionsArray: []
}


//REDUCERRRR
//When an action is called...the reducer checks the action type then basically does all the work depending on which action
export default function transactions(state = initialState, action) {

  console.log('transactions', state);
  let newState;

  switch (action.type) {
      case ADD_TRANSACTIONS:
        console.log('ADD_TRANSACTIONS Action')
        newState  = { ...state, transactionsArray: parseTransactionsFromTextFile(action.payload)};
        console.log('newState', newState);
        return { ...state, transactionsArray: parseTransactionsFromTextFile(action.payload)};
    default:
      return state;
  }
}




//SELECTORSSSS
//Just funcctions to manipulate the data before adding to the store (DO ALL THE WORK basically)
//Move to separate folder if gets too busy
function parseTransactionsFromTextFile(file){

  var transactions = [];
  var accumulative = 0;
  var dateIndex = file.match(/Date:.*(?=\s)/);
  var descriptionIndex = file.match(/Description:.*\s/);
  var amountIndex = file.match(/Amount:.*\.[0-9]{2}/);

  while (dateIndex && descriptionIndex && amountIndex) {
      var transactionDate = moment(dateIndex[0], 'DD/MM/YYYY');
      transactionDate.isValid();
      var transactionDescription = descriptionIndex[0].slice(13);
      var transactionAmount = parseFloat(amountIndex[0].slice(8));

      file = file.slice(amountIndex.index + 1);
      transactions.unshift({ date: transactionDate, dateString: transactionDate.format('DD/MM/YYYY'), description: transactionDescription, amount: transactionAmount, accumulative: 0 });

      dateIndex = file.match(/Date:.*(?=\s)/);
      descriptionIndex = file.match(/Description:.*(?=\s)/);
      amountIndex = file.match(/Amount:.*\.[0-9]{2}/);
  }

  transactions.map(transaction => {
    transaction.accumulative = accumulative+=transaction.amount;
  });

  return transactions;
}
