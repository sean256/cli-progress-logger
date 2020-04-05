const Renderable = require('./Renderable');
const expand = require('expand-template')();

module.exports = class Bar extends Renderable {
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
		this.refresh();
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
		return [output];
	}
};
