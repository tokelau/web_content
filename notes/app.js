(function() {

	var toJSON = function(message, picked, selected) {
		var obj = { 
			message: message, 
			picked: picked, 
			selected:selected
		}
		return JSON.stringify(obj);
	}

	var getFromStorage = function() {
		// sessionStorage.setItem(key, value);
		var result = [];
		for(var i = 0; i < sessionStorage.length; i++) {
			result.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i)))["message"]);
		}
		return result;
	}

	var getPicked = function(message) {
		for(var i = 0; i < sessionStorage.length; i++) {
			if (message == JSON.parse(sessionStorage.getItem(sessionStorage.key(i)))["message"]) {
				return JSON.parse(sessionStorage.getItem(sessionStorage.key(i)))["picked"];
			}
		}
	}

	var getSelected = function(message) {
		for(var i = 0; i < sessionStorage.length; i++) {
			if (message == JSON.parse(sessionStorage.getItem(sessionStorage.key(i)))["message"]) {
				return JSON.parse(sessionStorage.getItem(sessionStorage.key(i)))["selected"];
			}
		}
	}

	var sessionRemove = function(message) {
		for(var i = 0; i < sessionStorage.length; i++) {
			if (message == JSON.parse(sessionStorage.getItem(sessionStorage.key(i)))["message"]) {
				sessionStorage.removeItem(sessionStorage.key(i));
			}
		}
	}

	var app = new Vue({
	el: '#app',
	data: {
		message: '',
		addShown: false,
		editShown: false,
		tableShown: true,
		list: getFromStorage(),
		editText: '',
		index: 0,
		checkedItems: [],
		picked: 'remOff',
		selected: 'im'
	},
	methods: {
	editShow: function () {
		this.addShown = true,
		this.editShown = false,
		this.tableShown = true,
		this.picked = getPicked(this.message) ? getPicked(this.message):'remOff',
		this.selected = getSelected(this.message) ? getSelected(this.message):'im'
	},
	addItem: function () {
		this.addShown = false,
	  	this.list.push(this.message),
	  	sessionStorage.setItem(this.list.indexOf(this.message), 
	  		toJSON(this.message, this.picked, this.selected)),
		console.log(sessionStorage.getItem(this.list.indexOf(this.message)))
	},
	delItem: function(item) {
		sessionRemove(this.message),
		this.list.splice(this.list.indexOf(item), 1)
	},
	delItems: function() {
		for(i = 0; i < this.checkedItems.length; i++) {
			this.checkedItems[i] = this.list[this.checkedItems[i]]
			// console.log(this.checkedItems[i])
		}
		while (this.checkedItems.length) {
			sessionRemove(this.checkedItems[0]),
			this.list.splice(this.list.indexOf(this.checkedItems[0]), 1),
			this.checkedItems.splice(0, 1)
		}
	},
	editItem: function(item) {
		this.addShown = false,
		this.tableShown = false,
		this.editShown = true,
		this.editText = item,
		this.index = this.list.indexOf(item)
	},
	saveEdit: function() {
		Vue.set(this.list, this.index, this.editText),
		this.tableShown = true,
		this.editShown = false,
		sessionStorage.setItem(this.list.indexOf(this.message), 
	  		toJSON(this.message, this.picked, this.selected))
	},
	back: function(item) {
		this.tableShown = true,
		this.editShown = false
	}
	}
	})
})();