const chalk = require('chalk');
const Component = require('./Component');
const render = require('./render');

module.exports = class Todo extends Component {
	constructor(label, options) {
		super(options);
		this.label = label;
		this._status = 'todo';
	}

	get isAnimating() {
		return this._status === 'active';
	}

	set status(v) {
		this._status = v;
		render.refresh();
	}

	get status() {
		return this._status;
	}

	complete() {
		this.status = 'done';
		return this;
	}

	fail() {
		this.status = 'failed';
		return this;
	}

	active() {
		this.status = 'active';
		return this;
	}

	pause() {
		this.status = 'paused';
		return this;
	}

	cancel() {
		this.status = 'canceled';
		return this;
	}

	render() {
		const { status, options, label } = this;
		const {
			charTodo, charDone, charFailed, charPaused, charsProgress,
		} = options;
		const map = {
			todo: charTodo, done: charDone, failed: charFailed, paused: charPaused, canceled: charTodo,
		};
		let icon;
		if (status === 'active') {
			icon = charsProgress.shift();
			charsProgress.push(icon);
		} else icon = map[status];
		const line = `${icon} ${label}`;
		return status === 'canceled' ? [chalk.strikethrough(line)] : [line];
	}
};
