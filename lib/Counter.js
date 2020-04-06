const Component = require('./Component');
const expand = require('expand-template')();

module.exports = class Counter extends Component {
	constructor(label, options) {
		super({
			value: 0,
			...options,
		});
		this.label = label || 'Counter';
	}

	set value(v) {
		this.options.value = v;
		this.refresh();
	}

	get value() {
		return this.options.value;
	}

	render() {
		const { label } = this;
		const { value } = this.options;
		const { format } = this.theme;
		const output = expand(format, { value, label });
		return [output];
	}
};
