const Bar = require('./lib/Bar');
const TodoList = require('./lib/TodoList');
const Log = require('./lib/Log');
const Divider = require('./lib/Divider');
const EmptyLine = require('./lib/EmptyLine');
const Counter = require('./lib/Counter');
const { setTheme } = require('./lib/render');

const bar = options => new Bar(options);
const log = () => new Log();
const todoList = options => new TodoList(options);
const divider = () => new Divider();
const emptyLine = () => new EmptyLine();
const counter = options => new Counter(options);

module.exports = {
	bar,
	log,
	todoList,
	divider,
	emptyLine,
	counter,
	setTheme,
};
