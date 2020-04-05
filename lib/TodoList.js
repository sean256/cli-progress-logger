const Component = require('./Component');

module.exports = class TodoList extends Component {
	constructor(list = [], options) {
		super(options);
		this.options = {
			...this.options,
			list,
		};
		this.options.progressCharArray = this.options.charsProgress.split('');
		this.statuses = this.options.list.map(label => ({ label, status: 'todo' }));
	}

	get isAnimating() {
		return this.statuses.some(s => s.status === 'active');
	}

	setItemStatus(label, status) {
		const item = this.statuses.find(i => i.label === label);
		if (item) item.status = status;
		this.refresh();
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

	addItem(label) {
		if (!this.statuses.find(i => i.label === label)) this.statuses.push({ label, status: 'todo' });
	}

	render() {
		const { statuses, options } = this;
		const {
			charTodo, charDone, charFailed, charPaused, progressCharArray,
		} = options;
		const map = {
			todo: charTodo, done: charDone, failed: charFailed, paused: charPaused
		};
		const lines = statuses.map(({ label, status }) => {
			let icon;
			if (status === 'active') {
				icon = progressCharArray.shift();
				progressCharArray.push(icon);
			} else icon = map[status];
			return `${icon} ${label}`;
		});
		return lines;
	}
};
