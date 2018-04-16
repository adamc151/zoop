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

        transactions.push({ date: transactionDate, dateString: transactionDate.format('DD/YY/YYYY'), description: transactionDescription, amount: transactionAmount });

        dateIndex = data.match(/Date:.*(?=\s)/);
        descriptionIndex = data.match(/Description:.*(?=\s)/);
        amountIndex = data.match(/Amount:.*\.[0-9]{2}/);
    }

  return dispatch => {
    dispatch(addTransactions(transactions));
  }

}
