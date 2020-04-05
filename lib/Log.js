const expand = require('expand-template')();
const moment = require('moment');
const readline = require('readline');
const chalk = require('chalk');
const Renderable = require('./Renderable');

class Log {
	constructor({
		format = '[{date}] {tag}: {message}',
		dateFormat = 'LTS',
	} = {}) {
		this.format = format;
		this.dateFormat = dateFormat;
	}

	write(messageToWrite, { tag }) {
		Renderable.resetLine();
		readline.clearLine(process.stdout);
		let msg = messageToWrite;
		if (messageToWrite instanceof Error) {
			const { message, stack } = messageToWrite;
			msg = `${message}\n${stack}\n`;
		}
		const line = expand(this.format, {
			message: msg,
			tag,
			date: moment().format(this.dateFormat),
		});
		process.stdout.write(`${line}\n`);
		Renderable.renderAll();
	}

	log(message) { // eslint-disable-line
		this.write(message, { tag: 'LOG' });
	}

	debug(message) {
		this.write(message, { tag: 'DEBUG' });
	}

	info(message) {
		this.write(message, { tag: chalk.blue('INFO') });
	}

	warn(message) {
		this.write(message, { tag: chalk.yellow('WARN') });
	}

	error(message) {
		this.write(message, { tag: chalk.red('ERROR') });
	}
}

const processLogger = new Log();
process.on('uncaughtException', (err) => {
	processLogger.write(err, { tag: chalk.red('UNCAUGHT EXCEPTION')});
});

process.on('unhandledRejection', (err) => {
	processLogger.write(err, { tag: chalk.red('UNHANDLED REJECTION')});
});

module.exports = Log;
