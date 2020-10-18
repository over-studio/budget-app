const budgetCtrl = (() => {
	console.log('Model');

	const Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	const Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	const data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	};

	return {
		getData() {
			return data;
		},
		addItem(type, desc, val) {
			let newItem, ID;

			if (data.allItems[type].length)
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			else ID = 0;
			newItem = (type === 'exp') ? new Expense(ID, desc, val) : new Income(ID, desc, val);
			data.allItems[type].push(newItem);

			return newItem;
		}
	};

})();


const UICtrl = (() => {
	console.log('View');

	const DOMStrings = {
		inputType: '.add__type',
		inputDescption: '.add__description',
		inputValue: '.add__value',

		addBtn: '.add__btn',
	}

	return {
		getDOMStrings() {
			return DOMStrings;
		},
		getInput() {
			return {
				type: document.querySelector(DOMStrings.inputType).value,
				description: document.querySelector(DOMStrings.inputDescption).value,
				value: document.querySelector(DOMStrings.inputValue).value,
			}
		}
	};

})();

const controller = ((model, UI) => {
	console.log('Controller');

	
	const setupEventListeners = () => {
		const DOM = UI.getDOMStrings();

		document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function (e) {
	
			if (e.keyCode === 13 || e.which === 13) {
				ctrlAddItem(e);
			}
		});
	};

	const ctrlAddItem = (e) => {
		// 1. Get the field input data
		const input = UI.getInput();

		// 2. Add the item to the Model
		model.addItem(input.type, input.description, input.value);

		// 3. Add the item to the UICtrl

		// 4. Calculate the budgetCtrl

		// 5. Display the budget on the UI
	};

	return {
		init() {
			console.log('Application has started!');
			setupEventListeners();
		}
	};

})(budgetCtrl, UICtrl);

controller.init();
