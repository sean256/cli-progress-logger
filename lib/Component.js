/* eslint-disable class-methods-use-this */
const defaultTheme = require('../themes/default');

class Component {
	static setTheme(theme) {
		this.theme = theme;
	}

	static getTheme() {
		return this.theme;
	}

	constructor(options = {}) {
		// const selectedTheme = render.getTheme();
		const { name } = this.constructor;
		this.options = options;
		const themeToProxy = {
			...defaultTheme[name],
			// ...selectedTheme[name],
			...(options.theme || {}),
		};
		this.theme = new Proxy(themeToProxy, {
			get: (theme, prop) => {
				const v = theme[prop];
				if (typeof v === 'function') return v(this);
				return v;
			},
		});
	}

	get isAnimating() {
		return false;
	}

	setParent(component) {
		this.parent = component;
	}

	destroy() {
		if (this.parent) this.parent.remove(this);
	}

	refresh(now) {
		if (this.parent) this.parent.refresh(now);
	}
}

module.exports = Component;
