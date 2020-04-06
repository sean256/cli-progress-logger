const Component = require('./Component');
const expand = require('expand-template')();

module.exports = class Counter extends Component {
	constructor(options) {
		super({
			label: 'Counter',
			value: 0,
			...options,
		});
	}

	set value(v) {
		this.options.value = v;
		this.refresh();
	}

	get value() {
		return this.options.value;
	}

	render() {
		const { value, label } = this.options;
		const { format } = this.theme;
		const output = expand(format, { value, label });
		return [output];
	}
};
