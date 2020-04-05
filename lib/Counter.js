const Component = require('./Component');
const expand = require('expand-template')();
const render = require('./render');

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
		render.refresh();
	}

	get value() {
		return this.options.value;
	}

	render() {
		const { format, value, label } = this.options;
		const output = expand(format, { value, label });
		return [output];
	}
};
