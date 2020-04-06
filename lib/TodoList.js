const Parent = require('./Parent');
const Todo = require('./Todo');

module.exports = class TodoList extends Parent {
	constructor(list = [], options) {
		super(options);
		list.forEach(label => this.add(new Todo(label, options)));
	}

	get(label) {
		const todo = this.children.find(c => c.label === label);
		if (!todo) throw new Error(`Todo item not found for label: ${label}`);
		return todo;
	}
};
