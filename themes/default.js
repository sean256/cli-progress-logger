const chalk = require('chalk');

const Bar = {
	charIncomplete: '\u2591',
	charComplete: '\u2593',
	charCurrent: '',
	format: '{bar} {percent}% {label}',
};

const TodoList = {
	charTodo: '□',
	charDone: '✔︎',
	charFailed: '✕',
	charPaused: '■',
	charsProgress: ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'],
};

const Log = {
	format: '[{date}] {levelTag}: {message}',
	dateFormat: 'LTS',
	levelTags: {
		default: '  LOG',
		debug: 'DEBUG',
		info: chalk.blue.bold(' INFO'),
		warn: chalk.yellow.bold(' WARN'),
		error: chalk.red.bold('ERROR'),
	},
};

const Divider = {
	char: '━',
};

const Counter = {
	format: '{label} => {value}',
};

module.exports = {
	Bar,
	TodoList,
	Log,
	Divider,
	Counter,
};
