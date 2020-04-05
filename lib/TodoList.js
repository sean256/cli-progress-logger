const chalk = require('chalk');
const Component = require('./Component');
const Todo = require('./Todo');
const render = require('./render');

module.exports = class TodoList extends Component {
	constructor(list = [], options) {
		super(options);
		this.list = list.map(label => new Todo(label, options));
	}

	setItemStatus(label, status) {
		const item = this.statuses.find(i => i.label === label);
		if (item) item.status = status;
		render.refresh();
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

	pauseItem(label) {
		this.setItemStatus(label, 'paused');
	}

	cancelItem(label) {
		this.setItemStatus(label, 'canceled');
	}

	addItem(label) {
		if (!this.statuses.find(i => i.label === label)) this.statuses.push({ label, status: 'todo' });
	}

	render() {
		const { statuses, options } = this;
		const {
			charTodo, charDone, charFailed, charPaused, charsProgress,
		} = options;
		const map = {
			todo: charTodo, done: charDone, failed: charFailed, paused: charPaused, canceled: charTodo,
		};
		const lines = statuses.map(({ label, status }) => {
			let icon;
			if (status === 'active') {
				icon = charsProgress.shift();
				charsProgress.push(icon);
			} else icon = map[status];
			const line = `${icon} ${label}`;
			return status === 'canceled' ? chalk.strikethrough(line) : line;
		});
		return lines;
	}
};
