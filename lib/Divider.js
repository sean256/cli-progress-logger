const Component = require('./Component');

module.exports = class Divider extends Component {
	render() {
		const { char } = this.options;
		return [char.repeat(process.stdout.columns)];
	}
};
