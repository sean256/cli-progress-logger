const Component = require('./Component');
const expand = require('expand-template')();

module.exports = class Bar extends Component {
	constructor(options) {
		super({
			size: 25,
			total: 100,
			value: 0,
			...options,
		});
	}

	set value(value) {
		if (value === this.options.value) return;
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
			total, value, size, ...rest
		} = this.options;
		const {
			charIncomplete, charComplete, charCurrent, format,
		} = this.theme;
		const per = (value / total);
		const percent = Math.floor(per * 100);
		let filled = Math.floor(size * per);
		let empty = size - filled;
		if (charCurrent) {
			empty -= 1;
			if (filled === size) {
				empty = 0;
				filled -= 1;
			}
		}
		const bar = `${charComplete.repeat(filled)}${charCurrent}${charIncomplete.repeat(empty)}`;
		const output = expand(format, {
			bar, value, total, percent, ...rest,
		});
		return [output];
	}
};
