const Bar = require('./lib/Bar');
const Log = require('./lib/Log');
const Divider = require('./lib/Divider');
const EmptyLine = require('./lib/EmptyLine');
const Counter = require('./lib/Counter');
const Todo = require('./lib/Todo');
const TodoList = require('./lib/TodoList');
const { root } = require('./lib/render');

const log = () => new Log();

// const bar = options => new Bar(options);
// const todo = options => new Todo(options);
// const todoList = (list, options) => new TodoList(list, options);
// const divider = () => new Divider();
// const emptyLine = () => new EmptyLine();
// const counter = options => new Counter(options);

const bar = options => root.add(new Bar(options));
const todo = options => root.add(new Todo(options));
const todoList = options => root.add(new TodoList(options));

module.exports = {
	log,
	bar,
	todo,
	todoList,
	// divider,
	// emptyLine,
	// counter,
	// setTheme,
};
