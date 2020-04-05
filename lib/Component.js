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

	destroy() {
		render.removeComponent(this);
	}
}

module.exports = Component;
