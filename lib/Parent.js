const Component = require('./Component');

module.exports = class Parent extends Component {
	constructor(...args) {
		super(...args);
		this.children = [];
	}

	get isAnimating() {
		const { children } = this;
		return children.some(c => c.isAnimating);
	}

	add(component) {
		const { children } = this;
		if (!children.includes(component)) {
			children.push(component);
			component.setParent(this);
			this.refresh(true);
		}
		return component;
	}

	remove(component) {
		const { children } = this;
		const i = children.indexOf(component);
		if (i > -1) {
			children.splice(i, 1);
			this.refresh(true);
		}
		return component;
	}

	render() {
		const { children } = this;
		return children.reduce((acc, child) => {
			acc.push(...child.render());
			return acc;
		}, []);
	}
};
