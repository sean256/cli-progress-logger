const Component = require('./Component');

module.exports = class Divider extends Component {
	render() {
		const { char } = this.theme;
		return [char.repeat(process.stdout.columns)];
	}
};
