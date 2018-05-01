import { ADD_TRANSACTIONS, GET_TRANSACTIONS_IN_RANGE } from '../actions/actions';
var moment = require('moment');
moment().toDate();

//the initial store (global app state)
let initialState = {
    allTransactions: [],
    transactionsInRange: [],
    income: null,
    spending: null,
    net: null
}


//example descriptions
//CARD PAYMENT TO THE PORTERHOUSE,10.20 GBP, RATE 1.00/GBP ON 30-03-2018
//CARD PAYMENT TO TESCO STORES 3458,0.99 GBP, RATE 1.00/GBP ON 03-04-2018
//CARD PAYMENT TO SAINSBURYS S/MKTS,8.15 GBP, RATE 1.00/GBP ON 03-04-2018
//STANDING ORDER VIA FASTER PAYMENT TO Adam Cooper REFERENCE HTB ISA
//BILL PAYMENT VIA FASTER PAYMENT TO OLIVER COX REFERENCE HOUSE

// TODO We need to somehow group repeated payments together.
//Add to pie chart like...£150 spent at TESCO, £50 spent at THE PORTERHOUSE, OTHER...etc

//if 'CARD PAYMENT TO' in description...add 'location' attribute to transaction object else location: null.
//do this in parseTransactionsFromTextFile function



//REDUCERRRR
//When an action is called...the reducer checks the action type then basically does all the work depending on which action
export default function transactions(state = initialState, action) {

  console.log('transactions', state);
  let newState;

  switch (action.type) {
      case ADD_TRANSACTIONS:
        console.log('ADD_TRANSACTIONS Action');
        return { ...state, allTransactions: parseTransactionsFromTextFile(action.payload) };
      case GET_TRANSACTIONS_IN_RANGE:
        console.log('GET_TRANSACTIONS_IN_RANGE Action');
        newState = getTransactionsInRange(state.allTransactions, action.payload);
        return { ...state, transactionsInRange: newState.transactionsInRange, income: newState.inRangeIncome, spending: newState.inRangeSpending, net: newState.inRangeNet };
    default:
      return state;
  }
}




//SELECTORSSSS
//Just funcctions to manipulate the data before adding to the store (THESE DO ALL THE WORK basically)
//Move to separate folder if gets too busy
function parseTransactionsFromTextFile(file){

  var transactions = [];
  var dateIndex = file.match(/Date:.*(?=\s)/);
  var descriptionIndex = file.match(/Description:.*\s/);
  var amountIndex = file.match(/Amount:.*\.[0-9]{2}/);

  while (dateIndex && descriptionIndex && amountIndex) {
      var transactionDate = moment(dateIndex[0], 'DD/MM/YYYY');
      transactionDate.isValid();
      var transactionDescription = descriptionIndex[0].slice(13);
      var transactionAmount = parseFloat(amountIndex[0].slice(8));

      file = file.slice(amountIndex.index + 1);

      let newTransaction = {
        date: transactionDate,
        dateString: transactionDate.format('DD/MM/YYYY'),
        description: transactionDescription,
        amount: transactionAmount,
        accumulative: 0
      }

      transactions.unshift(newTransaction);

      dateIndex = file.match(/Date:.*(?=\s)/);
      descriptionIndex = file.match(/Description:.*(?=\s)/);
      amountIndex = file.match(/Amount:.*\.[0-9]{2}/);
  }

  return transactions;
}





function getTransactionsInRange(transactions, rangeObject){

  var input = 0;
  var output = 0;
  var accumulative = 0;
  var transactionsInRange = [];

  transactions.map(transaction => {
      if (transaction.date.isBetween(rangeObject.startDate, rangeObject.endDate, null, '[]')) {
          transactionsInRange.push(transaction);
      }
  });

  transactionsInRange.map(transaction => {
    transaction.amount >= 0 ? input += transaction.amount : output += transaction.amount;
    transaction.accumulative = accumulative+=transaction.amount;
  });

  return { transactionsInRange: transactionsInRange, inRangeIncome: input, inRangeSpending: output, inRangeNet: input + output };
}
