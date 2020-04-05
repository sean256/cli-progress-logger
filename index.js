const Bar = require('./lib/Bar');
const TodoList = require('./lib/TodoList');
const Log = require('./lib/Log');
const { setTheme } = require('./lib/render');

const bar = options => new Bar(options);
const log = () => new Log();
const todoList = options => new TodoList(options);

module.exports = {
	bar,
	log,
	todoList,
	setTheme,
};
