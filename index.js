const expand = require('expand-template')();
const moment = require('moment');
const chalk = require('chalk');
const readline = require('readline');

class Log {
	constructor({
		format = '[{date}] {tag}: {message}',
		dateFormat = 'LTS',
	} = {}) {
		this.format = format;
		this.dateFormat = dateFormat;
	}

	write(message, { tag }) {
		Renderable.resetLine();
		readline.clearLine(process.stdout);
		const line = expand(this.format, {
			message,
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

const renderables = [];

class Renderable {
	static start() {
		process.nextTick(() => Renderable.renderAll());
		// todo: be smarter than a fixed interval
		Renderable.interval = setInterval(() => {
			Renderable.renderAll();
		}, 300);
	}

	static end() {
		if (Renderable.interval) clearInterval(Renderable.interval);
	}

	static resetLine() {
		if (!Renderable.linesOut) return;
		readline.moveCursor(process.stdout, 0, Renderable.linesOut * -1);
		readline.clearScreenDown(process.stdout);
		Renderable.linesOut = 0;
	}

	static renderAll() {
		let lines = 1; // 1 for horizontal line
		Renderable.resetLine();
		Renderable.writeLine('━'.repeat(process.stdout.columns));
		renderables.forEach((r) => {
			lines += r.render();
			Renderable.writeLine('\n');
		});
		Renderable.linesOut = lines;
	}

	static writeLine(line) {
		process.stdout.write(line);
	}

	constructor() {
		renderables.push(this);
		if (renderables.length === 1) Renderable.start();
	}

	destroy() {
		const i = renderables.indexOf(this);
		renderables.splice(i, 1);
		if (!renderables.length) Renderable.end();
	}
}

class Bar extends Renderable {
	constructor(options) {
		super();
		this.options = {
			total: 100,
			value: 0,
			charIncomplete: '\u2591',
			charComplete: '\u2593',
			format: '{bar} {percent}',
			...options,
		};
	}

	set value(value) {
		this.options.value = value;
		Renderable.renderAll();
	}

	get value() {
		return this.options.value;
	}

	get total() {
		return this.options.total;
	}

	render() {
		const {
			total, value, charIncomplete, charComplete, format, ...rest
		} = this.options;
		const size = 25; // todo: make this dynamic
		const per = (value / total);
		const percent = Math.round(per * 100);
		const filled = Math.round(size * per);
		const empty = size - filled;
		const bar = `${charComplete.repeat(filled)}${charIncomplete.repeat(empty)}`;
		const output = expand(format, {
			bar, value, total, percent, ...rest,
		});
		Renderable.writeLine(output);
		const lines = (output.match(/\n/g) || '').length + 1;
		return lines;
	}
}

class TodoList extends Renderable {
	constructor(options) {
		super();
		this.options = {
			list: [],
			charTodo: '◾️',
			charDone: '✅',
			charFailed: '❌',
			charsProgress: '⣾⣽⣻⢿⡿⣟⣯⣷',
			...options,
		};
		this.options.progressCharArray = this.options.charsProgress.split('');
		this.statuses = options.list.map(label => ({ label, status: 'todo' }));
	}

	setItemStatus(label, status) {
		const item = this.statuses.find(i => i.label === label);
		if (item) item.status = status;
		Renderable.renderAll();
	}

	completeItem(label) {
		this.setItemStatus(label, 'done');
	}

	failItem(label) {
		this.setItemStatus(label, 'failed');
	}

	activateItem(label) {
		this.setItemStatus(label, 'active');
	}

	addItem(label) {
		if (!this.statuses.find(i => i.label === label)) this.statuses.push({ label, status: 'todo' });
	}

	render() {
		const { statuses, options } = this;
		const {
			charTodo, charDone, charFailed, progressCharArray,
		} = options;
		const map = { todo: charTodo, done: charDone, failed: charFailed };
		const lines = statuses.map(({ label, status }) => {
			let icon;
			if (status === 'active') {
				icon = progressCharArray.shift();
				progressCharArray.push(icon);
			} else icon = map[status];
			return `${icon} ${label}`;
		});
		Renderable.writeLine(lines.join('\n'));
		return lines.length;
	}
}

class Active extends Renderable {

}

class Counter extends Renderable {

}

const bar = options => new Bar(options);
const log = () => new Log();
const todoList = options => new TodoList(options);

module.exports = {
	bar,
	log,
	todoList,
};
