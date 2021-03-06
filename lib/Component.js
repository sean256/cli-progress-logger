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
		const selectedTheme = render.getTheme();
		const { name } = this.constructor;
		this.options = options;
		const themeToProxy = {
			...defaultTheme[name],
			...selectedTheme[name],
			...(options.theme || {}),
		};
		this.theme = new Proxy(themeToProxy, {
			get: (theme, prop) => {
				const v = theme[prop];
				if (typeof v === 'function') return v(this);
				return v;
			},
		});
		process.nextTick(() => {
			if (!this.parent && this.render) render.addComponent(this);
		});
	}

	get isAnimating() {
		return false;
	}

	setParent(component) {
		this.parent = component;
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
