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

	add(component, where = null) {
		const { children } = this;
		const existingIndex = children.indexOf(component);
		if (existingIndex > -1) children.splice(existingIndex, 1);
		else {
			if (component.parent && component.parent !== this) component.parent.remove(component);
			component.setParent(this);
		}
		const insertAt = where !== null ? where : (children.length - 1);
		children.splice(insertAt, 0, component);
		this.refresh(true);
		return component;
	}

	remove(component, refresh = true) {
		const { children } = this;
		const i = children.indexOf(component);
		if (i > -1) {
			children.splice(i, 1);
			component.setParent(null);
			this.refresh(refresh);
		}
		return component;
	}

	addComponentAfter(component, reference) {
		const { children } = this;
		const i = children.indexOf(reference);
		if (i > -1) this.add(component, i + 1);
		else this.add(component);
	}

	addComponentBefore(component, reference) {
		const { children } = this;
		const i = children.indexOf(reference);
		if (i > -1) this.add(component, i);
		else this.add(component);
	}

	addComponentFirst(component) {
		this.add(component, 0);
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
