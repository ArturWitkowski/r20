var board = {
	name: 'Tablica Kanban',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};


$('.create-column').click(function() {
	var columnName = prompt('Wpisz nazwę kolumny');
	//board.createColumn(new Column(columnName)); 
	$.ajax({
		url: baseUrl + '/column',
		method: 'POST',
		data: { 
			name: columnName 
		},
		success: function(response){
			var column = new Column(Response.id, columnName);
			board.createColumn(column); 
		} 
	});
});
	
function initSortable() {
    $('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder',
      update: function(event, ui) {
      	var cardId = $(ui.item).attr('data-card-id'),
      		cardName = $(ui.item).find('.card-description').text(),
      		newColumnId = $(event.target).parent().attr('data-id');

      	$.ajax({
			url: baseUrl + '/card/' + cardId,
			method: 'PUT',
			data: {
				id: cardId,
				name: cardName,
				bootcamp_kanban_column_id: newColumnId
			},			
		}); 	
      }
    }).disableSelection();
  }


