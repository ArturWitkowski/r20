// OGÓLNA FUNKCJA

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = { 'X-Client-Id': 1545, 'X-Auth-Token': 'f62449b062d6a1198c08ef400a082ea2' };

$.ajaxSetup({
	headers: myHeaders 
});

$.ajax({ url: baseUrl + '/board',
		method: 'GET',
		success: function(response) {
			setupColumns(response.columns); 
		} 
	   
});

function setupColumns(columns) {
	columns.forEach(
		function (column) {
			var col = new Column(column.id, column.name);
			board.createColumn(col); 
			 setupCards(col, column.cards);
		}); 
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
		var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
		col.createCard(card);
	});
}



