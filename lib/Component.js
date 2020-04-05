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

	constructor(passedOptions = {}) {
		if (this.render) render.addComponent(this);
		const selectedTheme = render.getTheme();
		const { name } = this.constructor;
		const optionsToProxy = {
			...defaultTheme[name],
			...selectedTheme[name],
			...passedOptions,
		};
		this.options = new Proxy(optionsToProxy, {
			get: (options, prop) => {
				const v = options[prop];
				if (typeof v === 'function') return v(this);
				return v;
			},
		});
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
