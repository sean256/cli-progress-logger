const Bar = require('./lib/Bar');
const Log = require('./lib/Log');
const Divider = require('./lib/Divider');
const EmptyLine = require('./lib/EmptyLine');
const Counter = require('./lib/Counter');
const Todo = require('./lib/Todo');
const TodoList = require('./lib/TodoList');
const { setTheme } = require('./lib/render');

const bar = options => new Bar(options);
const log = () => new Log();
const todo = options => new Todo(options);
const todoList = (list, options) => new TodoList(list, options);
const divider = () => new Divider();
const emptyLine = () => new EmptyLine();
const counter = options => new Counter(options);

// add divider
divider();

module.exports = {
	bar,
	log,
	todo,
	todoList,
	divider,
	emptyLine,
	counter,
	setTheme,
};
