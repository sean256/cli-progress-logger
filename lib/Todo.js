const chalk = require('chalk');
const expand = require('expand-template')();
const Component = require('./Component');

module.exports = class Todo extends Component {
	constructor(label, options) {
		super(options);
		this.label = label;
		this._status = 'todo';
		this.charsProgressIndex = 0;
	}

	get isAnimating() {
		return this._status === 'active';
	}

	set status(v) {
		this._status = v;
		this.refresh();
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
		const {
			status, theme, label, options,
		} = this;
		const {
			charTodo, charDone, charFailed, charPaused, format, charsProgress,
		} = theme;
		const map = {
			todo: charTodo, done: charDone, failed: charFailed, paused: charPaused, canceled: charTodo,
		};
		let icon;
		if (status === 'active') {
			icon = charsProgress[this.charsProgressIndex];
			this.charsProgressIndex += 1;
			const max = charsProgress.length - 1;
			this.charsProgressIndex = this.charsProgressIndex > max ? 0 : this.charsProgressIndex;
		} else icon = map[status];
		const line = expand(format, { icon, label, ...options });
		return status === 'canceled' ? [chalk.strikethrough(line)] : [line];
	}
};
