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
		},
		addListItem(obj, type) {
			// Create HTML string with placeholder text
			let html, element;

			if (type === 'inc') {
				element = document.querySelector('.income__list');
				html = `<div class="item clearfix" id="income-%id%">
					<div class="item__description">%description%</div>
					<div class="right clearfix">
							<div class="item__value">%value%</div>
							<div class="item__delete">
									<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
							</div>
					</div>
			</div>`;
			} else if (type === 'exp') {
				element = document.querySelector('.expenses__list');
				html = `<div class="item clearfix" id="income-%id%">
						<div class="item__description">%description%</div>
						<div class="right clearfix">
								<div class="item__value">%value%</div>
								<div class="item__delete">
										<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
								</div>
						</div>
				</div>`;
			}

			// Replace the placeholder text with some actual data
			let newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			// Insert HTML into the DOM
			element.insertAdjacentHTML('beforeend', newHtml);
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
		const newItem = model.addItem(input.type, input.description, input.value);

		// 3. Add the item to the UICtrl
		UI.addListItem(newItem, input.type);

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
