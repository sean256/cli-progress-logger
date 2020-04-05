const chalk = require('chalk');

const Bar = {
	size: 10,
	charIncomplete: '🌑',
	charComplete: '🌕',
	charCurrent: '🌗',
	format: '{bar} {percent}%',
};

const TodoList = {
	charTodo: '🔲',
	charDone: '✅',
	charFailed: '❌',
	charPaused: '⏸',
	charsProgress: ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛'],
};

const Log = {
	format: '[{date}] {levelTag} {message}',
	dateFormat: 'LTS',
	levelTags: {
		default: '✏️ ',
		debug: '🥼',
		info: chalk.blue('🗒 '),
		warn: chalk.yellow('⚠️ '),
		error: chalk.red('❗️'),
	},
};

module.exports = {
	Bar,
	TodoList,
	Log,
};
