const render = require('./render');
const Component = require('./Component');

module.exports = class Parent extends Component {
	constructor(...args) {
		super(...args);
		this.children = [];
	}

	addChild(component) {
		const { children } = this;
		if (!children.includes(component)) {
			children.push(component);
			component.setParent(this);
			render.refresh(true);
		}
	}

	render() {
		const { children } = this;
		return children.map(c => c.render());
	}
};
