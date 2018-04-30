import { ADD_MONTHLY_TRANSACTIONS } from '../actions/fileReadActions';
var moment = require('moment');
moment().toDate();

//the initial store (global app state)
let initialState = {
  monthlyTransactionsArray: []
}


//REDUCERRRR
//When an action is called...the reducer checks the action type then basically does all the work depending on which action
export default function monthlyTransactions(state = initialState, action) {

  console.log('transactions', state);
  let newState;

  switch (action.type) {
      case ADD_MONTHLY_TRANSACTIONS:
        console.log('ADD_MONTHLY_TRANSACTIONS Action')
        newState  = { ...state, monthlyTransactionsArray: parseTransactionsFromTextFile(action.payload)};
        console.log('newState', newState);
        return { ...state, monthlyTransactionsArray: parseTransactionsFromTextFile(action.payload)};
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

  return calculate(transactions);
}

var monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function calculate(transactions) {

    var currentMonth = transactions[0].date.format('M');
    var prevMonth = transactions[0].date.format('M');
    var currentYear = transactions[0].date.format('Y');
    var prevYear = transactions[0].date.format('Y');
    var monthValues = [];
    var total=0;

    transactions.forEach(function(element){
        
        currentMonth = element.date.format('M');
        currentYear = element.date.format('Y');
        
        if(currentMonth == prevMonth && element!=transactions[transactions.length-1]){
            total+=element.amount;
        }
        else{
            monthValues.push({ date: monthMap[prevMonth-1] + ' ' + prevYear, net: Math.round(total*100)/100 /*element.date.format('DD/MM/YYYY') , month: prevMonth, year: prevYear*/});
            total=element.amount;
        }

        prevMonth = currentMonth;
        prevYear = currentYear;
    });

    // return reverseAndAddDifference(monthValues);
    return monthValues;
}

function reverseAndAddDifference(monthValues){
    
    monthValues.reverse();
    var prev = monthValues[0].net;
    var total = 0;
    var i=0;

    monthValues.forEach(function(element){
        // element.diff = ((prev - element.net)/((element.net + prev)/2))*100 + '%';
        element.diff = Math.round((element.net - prev)*100)/100;
        prev = element.net;
        if(i>1){
            total+=element.net;
        }
        i++
    });

    return monthValues;
    
    console.log(monthValues);
    console.log(total/(monthValues.length-2));
}