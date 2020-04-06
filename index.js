const Bar = require('./lib/Bar');
const Log = require('./lib/Log');
const Divider = require('./lib/Divider');
const EmptyLine = require('./lib/EmptyLine');
const Counter = require('./lib/Counter');
const Todo = require('./lib/Todo');
const TodoList = require('./lib/TodoList');
const { root } = require('./lib/render');

// const bar = options => new Bar(options);
// const todo = options => new Todo(options);
// const todoList = (list, options) => new TodoList(list, options);
// const divider = () => new Divider();
// const emptyLine = () => new EmptyLine();
// const counter = options => new Counter(options);

const log = (...args) => root.add(new Log(...args));
const bar = (...args) => root.add(new Bar(...args));
const todo = (...args) => root.add(new Todo(...args));
const todoList = (...args) => root.add(new TodoList(...args));
const counter = (...args) => root.add(new Counter(...args));
const emptyLine = (...args) => root.add(new EmptyLine(...args));
const divider = (...args) => root.add(new Divider(...args));

const setTheme = theme => root.setTheme(theme);

const addComponentAfter = (...args) => root.addComponentAfter(...args);
const addComponentBefore = (...args) => root.addComponentBefore(...args);
const addComponentFirst = (...args) => root.addComponentFirst(...args);

module.exports = {
	log,
	bar,
	todo,
	todoList,
	divider,
	emptyLine,
	counter,
	setTheme,
	addComponentAfter,
	addComponentBefore,
	addComponentFirst,
};
