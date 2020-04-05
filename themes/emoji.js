const chalk = require('chalk');

const Bar = {
	charIncomplete: '🌑',
	charComplete: '🌕',
	charCurrent: '🌗',
	format: '{bar} {percent}%',
};

const Todo = {
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
	Todo,
	Log,
};
