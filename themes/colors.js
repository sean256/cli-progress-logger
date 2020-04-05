const chalk = require('chalk');
const tinygradient = require('tinygradient');

const barGradient = tinygradient('#EF3E6C', '#27CB15');

const Bar = {
	charIncomplete: chalk.grey.dim('\u2591'),
	charComplete: ({ value, total }) => {
		const per = (value / total);
		const char = '\u2593';
		const hex = barGradient.rgbAt(per).toHexString();
		return chalk.hex(hex)(char);
	},
	charCurrent: '',
	format: '{bar} {percent}% {label}',
};

const Todo = {
	format: '{icon} - {label}',
	charTodo: '□',
	charDone: chalk.green('✔︎'),
	charFailed: chalk.red('✕'),
	charPaused: chalk.dim('■'),
	charsProgress: [
		chalk.rgb(10, 100, 200)('▁'),
		chalk.rgb(50, 125, 209)('▃'),
		chalk.rgb(91, 151, 218)('▄'),
		chalk.rgb(132, 177, 227)('▅'),
		chalk.rgb(173, 203, 236)('▆'),
		chalk.rgb(214, 229, 245)('▇'),
		chalk.rgb(255, 255, 255)('█'),
		chalk.rgb(214, 229, 245)('▇'),
		chalk.rgb(173, 203, 236)('▆'),
		chalk.rgb(132, 177, 227)('▅'),
		chalk.rgb(91, 151, 218)('▄'),
		chalk.rgb(50, 125, 209)('▃'),
	],
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

module.exports = {
	Bar,
	Todo,
	Log,
};
