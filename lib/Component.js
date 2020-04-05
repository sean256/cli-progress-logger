/* eslint-disable class-methods-use-this */
const render = require('./render');
const defaultTheme = require('../themes/default');

class Component {
	static setTheme(theme) {
		this.theme = theme;
	}

	static getTheme() {
		return this.theme;
	}

	constructor(options = {}) {
		if (this.render) render.addComponent(this);
		const selectedTheme = render.getTheme();
		const { name } = this.constructor;
		this.options = {
			...defaultTheme[name],
			...selectedTheme[name],
			...options,
		};
	}

	get isAnimating() {
		return false;
	}

	after(reference) {
		render.addComponentAfter(this, reference);
		return this;
	}

	before(reference) {
		render.addComponentBefore(this, reference);
		return this;
	}

	toFirst() {
		render.addComponentToFirst(this);
		return this;
	}

	toLast() {
		render.moveComponentToLast(this);
		return this;
	}

	destroy() {
		this.destroyed = true;
		render.removeComponent(this);
	}
}

module.exports = Component;
