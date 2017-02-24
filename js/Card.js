// KLASA KANBAN CARD
function Card(id, name, column) {
	var self = this;
	
	this.id = id;
	this.name = name;
	this.element = createCard();
	this.column = column;

	function createCard() {
		var card = $('<li class="card"></li>');
		card.attr('data-card-id', self.id);
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});
		
		cardDescription.dblclick(function(){
			var newDesc = prompt("Podaj nowy opis dla karty");
			
			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'PUT',
				data: {
					id: self.id,
					name: newDesc,
					bootcamp_kanban_column_id: self.column
				},
				success: function(response){
					cardDescription.text(newDesc); 
				} 
			}); 
		});
		
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription)
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(){
				self.element.remove(); 
			}
		});
	}
	//function setupCard(col, cardId) { cards.forEach(function (card) { var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id); col.createCard(card); }) }
}