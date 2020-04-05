const expand = require('expand-template')();
const moment = require('moment');
const chalk = require('chalk');
const Component = require('./Component');
const render = require('./render');

class Log extends Component {
	write(messageToWrite, { levelTag }) {
		const { format, dateFormat } = this.theme;
		let msg = messageToWrite;
		if (messageToWrite instanceof Error) {
			const { message, stack } = messageToWrite;
			msg = `${message}\n${stack}\n`;
		}
		const line = expand(format, {
			message: msg,
			levelTag,
			date: moment().format(dateFormat),
		});
		render.writeLogLine(line);
	}

	log(message) {
		this.write(message, { levelTag: this.theme.levelTags.default });
	}

	debug(message) {
		this.write(message, { levelTag: this.theme.levelTags.debug });
	}

	info(message) {
		this.write(message, { levelTag: this.theme.levelTags.info });
	}

	warn(message) {
		this.write(message, { levelTag: this.theme.levelTags.warn });
	}

	error(message) {
		this.write(message, { levelTag: this.theme.levelTags.error });
	}
}

const processLogger = new Log();
process.on('uncaughtException', (err) => {
	processLogger.write(err, { levelTag: chalk.red('UNCAUGHT EXCEPTION') });
});

process.on('unhandledRejection', (err) => {
	processLogger.write(err, { levelTag: chalk.red('UNHANDLED REJECTION') });
});

module.exports = Log;
