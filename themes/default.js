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
		info: chalk.blue(' INFO'),
		warn: chalk.yellow(' WARN'),
		error: chalk.red('ERROR'),
	},
};

const Divider = {
	char: '━',
};

module.exports = {
	Bar,
	TodoList,
	Log,
	Divider,
};
