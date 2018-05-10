import { ADD_TRANSACTIONS, GET_TRANSACTIONS_IN_RANGE, ADD_MONTHLY_TRANSACTIONS, UPDATE_MONTHLY_TRANSACTIONS,
    CLEAR_ACTION, ADD_MONTHLY_BALANCE_TRANSACTIONS, UPDATE_MONTHLY_BALANCE_TRANSACTIONS } from '../actions/actions';
var moment = require('moment');
moment().toDate();
var monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//the initial store (global app state)
let initialState = {
    allTransactions: [],
    transactionsInRange: [],
    monthlyTransactionsArray: [],
    monthlyBalanceTransactionsArray: [],
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

    let newState;

    switch (action.type) {
        case ADD_TRANSACTIONS:
            console.log('ADD_TRANSACTIONS Action');
            return { ...state, allTransactions: parseTransactionsFromTextFile(action.payload) };
        case GET_TRANSACTIONS_IN_RANGE:
            console.log('GET_TRANSACTIONS_IN_RANGE Action');
            newState = getTransactionsInRange(state.allTransactions, action.payload);
            return { ...state, transactionsInRange: newState.transactionsInRange, income: newState.inRangeIncome, spending: newState.inRangeSpending, net: newState.inRangeNet };
        case ADD_MONTHLY_TRANSACTIONS:
            console.log('ADD_MONTHLY_TRANSACTIONS Action');
            return { ...state, monthlyTransactionsArray: calculateMonthlyNetValues(action.payload, null)};
        case UPDATE_MONTHLY_TRANSACTIONS:
            console.log('UPDATE_MONTHLY_TRANSACTIONS Action');
            return { ...state, monthlyTransactionsArray: updateMonthlyNetValues(state.allTransactions, action.payload)};
        case CLEAR_ACTION:
            console.log('CLEAR_ACTION Action');
            return { ...state, monthlyTransactionsArray:[], monthlyBalanceTransactionsArray:[], allTransactions:[], transactionsInRange:[], income:null, spending:null, net:null};
        case ADD_MONTHLY_BALANCE_TRANSACTIONS:
            console.log('ADD_MONTHLY_BALANCE_TRANSACTIONS Action');
            return { ...state, monthlyBalanceTransactionsArray: calculateMonthlyBalance(action.payload, null)};
        case UPDATE_MONTHLY_BALANCE_TRANSACTIONS:
            console.log('UPDATE_MONTHLY_BALANCE_TRANSACTIONS Action');
            return { ...state, monthlyBalanceTransactionsArray: updateMonthlyBalance(state.allTransactions, action.payload)};
        default:
        return state;
    }
}



//SELECTORSSSS
//Just funcctions to manipulate the data before adding to the store (THESE DO ALL THE WORK basically)
//Move to separate folder if gets too busy
function parseTransactionsFromTextFile(file){

    var transactions = [];
    var balanceIndex = file.match(/Balance:.*\.[0-9]{2}/);
    var dateIndex = file.match(/Date:.*(?=\s)/);
    var descriptionIndex = file.match(/Description:.*\s/);
    var amountIndex = file.match(/Amount:.*\.[0-9]{2}/);

    while (dateIndex && descriptionIndex && amountIndex) {

        var transactionDate = moment(dateIndex[0], 'DD/MM/YYYY');
        transactionDate.isValid();
        var transactionDescription = descriptionIndex[0].slice(13);
        var transactionAmount = parseFloat(amountIndex[0].slice(8));
        var transactionBalance = parseFloat(balanceIndex[0].slice(9));

        file = file.slice(amountIndex.index + 1);

        let newTransaction = {
            date: transactionDate,
            dateString: transactionDate.format('DD/MM/YYYY'),
            description: transactionDescription,
            amount: transactionAmount,
            accumulative: 0,
            balance: transactionBalance
        }

        transactions.unshift(newTransaction);
        balanceIndex = file.match(/Balance:.*\.[0-9]{2}/);
        dateIndex = file.match(/Date:.*(?=\s)/);
        descriptionIndex = file.match(/Description:.*(?=\s)/);
        amountIndex = file.match(/Amount:.*\.[0-9]{2}/);
    }

    return transactions;
}

// selector for updating the transactions in a range
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

// selector for updating the monthly values in the date range
function updateMonthlyNetValues(transactions, rangeObject){

    var input = 0;
    var output = 0;
    var accumulative = 0;
    var transactionsInRange = [];
  
    transactions.map(transaction => {
        if (transaction.date.isBetween(rangeObject.startDate, rangeObject.endDate, null, '[]')) {
            transactionsInRange.push(transaction);
        }
    });

    return calculateMonthlyNetValues(null, transactionsInRange);
}

// selector for updating the monthly balance values in the date range
function updateMonthlyBalance(transactions, rangeObject){

    var input = 0;
    var output = 0;
    var accumulative = 0;
    var transactionsInRange = [];
  
    transactions.map(transaction => {
        if (transaction.date.isBetween(rangeObject.startDate, rangeObject.endDate, null, '[]')) {
            transactionsInRange.push(transaction);
        }
    });

    return calculateMonthlyBalance(null, transactionsInRange);
}

// selector for calculating the net monthly savings
function calculateMonthlyNetValues(file, transactions) {

    if(!transactions){
        transactions = parseTransactionsFromTextFile(file);
    }

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
            monthValues.push({ date: monthMap[prevMonth-1] + ' ' + prevYear, SavingsPerMonth: Math.round(total*100)/100 });
            total=element.amount;
        }

        prevMonth = currentMonth;
        prevYear = currentYear;
    });

    return reverseAndAddDifference(monthValues);
    // return monthValues;
}

function reverseAndAddDifference(monthValues){
    
    // monthValues.reverse();
    var prev = monthValues[0].SavingsPerMonth;
    var total = 0;
    var i=0;

    monthValues.forEach(function(element){
        // element.DifferenceSinceLastMonth = ((prev - element.SavingsPerMonth)/((element.SavingsPerMonth + prev)/2))*100 + '%';
        element.DifferenceSinceLastMonth = Math.round((element.SavingsPerMonth - prev)*100)/100;
        prev = element.SavingsPerMonth;
        if(i>1){
            total+=element.SavingsPerMonth;
        }
        i++
    });

    return monthValues;
    
    console.log(monthValues);
    console.log(total/(monthValues.length-2));
}

// monthly balance logic
function calculateMonthlyBalance(file, transactions) {

    if(!transactions){
        transactions = parseTransactionsFromTextFile(file);
    }

    var prevMonth = 0
    var currentYear = transactions[0].date.format('Y');
    var monthValues = [];
    var balance=0;
    var currentMonth=0;
    
    transactions.forEach(function(element, index){
        
        currentMonth = element.date.format('M');
        currentYear = element.date.format('Y');
        balance = element.balance;
        
        if(currentMonth!=prevMonth)
        {
            monthValues.push({date: monthMap[currentMonth-1] + ' ' + currentYear, balance: balance});
        }
        prevMonth=currentMonth;
    });

    return monthValues;
}