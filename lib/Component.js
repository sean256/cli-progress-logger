const defaultTheme = require('../themes/default');

class Component {
	constructor(options = {}) {
		this.options = options;
		this.theme = new Proxy({}, {
			get: (_, prop) => {
				const scopedTheme = this.getScopedTheme();
				const v = scopedTheme[prop];
				if (typeof v === 'function') return v(this);
				return v;
			},
		});
	}

	/**
	 * Get the theme block for this component by name
	 * It will merge the default, selected theme and options.theme overrides
	 * @returns {Theme}
	 */
	getScopedTheme() {
		const { name } = this.constructor;
		const masterTheme = this.getTheme();
		return {
			...(defaultTheme[name] || {}),
			...(masterTheme[name] || {}),
			...(this.options.theme || {}),
		};
	}

	/**
	 * Get the current master theme
	 * @returns {Theme} the set master theme
	 */
	getTheme() {
		const { masterTheme, parent } = this;
		if (masterTheme) return masterTheme;
		if (parent && parent.getTheme) return parent.getTheme();
		return defaultTheme;
	}

	/**
	 * Set the master theme object to use
	 * This is different then constructor({ theme }) which is for
	 * component level overrides
	 * @param {Theme} theme the master theme to set
	 */
	setTheme(masterTheme) {
		this.masterTheme = masterTheme;
	}

	setOption(key, value) {
		this.options[key] = value;
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
