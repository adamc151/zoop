import * as types from './actionTypes';
var moment = require('moment');
moment().toDate();

export function receiveStuff(json) {
  return {type: types.PARSE_FILE, stuff: json};
}

export function addTransactions(newtransactions) {
  return {type: types.ADD_TRANSACTIONS, transactions: newtransactions};
}


export function parseFile(data) {

    var transactions = [];
    var accumulative = 0;
    var dateIndex = data.match(/Date:.*(?=\s)/);
    //var descriptionIndex = data.match(/Description:.*(?=\s)/);
    var descriptionIndex = data.match(/Description:.*\s/);
    var amountIndex = data.match(/Amount:.*\.[0-9]{2}/);

    while (dateIndex && descriptionIndex && amountIndex) {
        var transactionDate = moment(dateIndex[0], 'DD/MM/YYYY');
        transactionDate.isValid();
        var transactionDescription = descriptionIndex[0].slice(13);
        var transactionAmount = parseFloat(amountIndex[0].slice(8));

        data = data.slice(amountIndex.index + 1);
        transactions.unshift({ date: transactionDate, dateString: transactionDate.format('DD/MM/YYYY'), description: transactionDescription, amount: transactionAmount, accumulative: 0 });

        dateIndex = data.match(/Date:.*(?=\s)/);
        descriptionIndex = data.match(/Description:.*(?=\s)/);
        amountIndex = data.match(/Amount:.*\.[0-9]{2}/);
    }

    transactions.map(transaction => {
      transaction.accumulative = accumulative+=transaction.amount;
    });

  return dispatch => {
    dispatch(addTransactions(transactions));
  }

}
