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

	destroy() {
		super.destroy();
		const { children } = this;
		children.forEach(c => c.destroy());
	}

	render() {
		const { children } = this;
		return children.filter(c => c.render).reduce((acc, child) => {
			acc.push(...child.render());
			return acc;
		}, []);
	}
};
