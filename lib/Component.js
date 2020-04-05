const readline = require('readline');
const defaultTheme = require('../themes/default');

const renderables = [];

const REFRESH_TIME = 300;

class Component {
	static resetLine() {
		if (!Component.linesOut) return;
		readline.moveCursor(process.stdout, 0, Component.linesOut * -1);
		readline.clearScreenDown(process.stdout);
		Component.linesOut = 0;
	}

	static renderAll() {
		this.pendingRefresh = true;
		let lineCount = 1; // 1 for horizontal line
		this.resetLine();
		this.writeLine('━'.repeat(process.stdout.columns));
		renderables.forEach((r) => {
			const lines = r.render();
			lines.forEach(l => this.writeLine(`${l}\n`));
			lineCount += lines.length;
		});
		this.linesOut = lineCount;
	}

	static writeLine(line) {
		process.stdout.write(line);
	}

	static writeLogLine(line) {
		this.resetLine();
		readline.clearLine(process.stdout);
		process.stdout.write(`${line}\n`);
		this.renderAll();
	}

	static refresh() {
		if (this.refreshCheckTimeout) this.needsRefresh = true;
		else {
			// do a refresh now, set a timeout to see if another one is needed in REFRESH_TIME
			this.renderAll();
			this.needsRefresh = false;
			this.refreshCheckTimeout = setTimeout(() => {
				this.refreshCheckTimeout = null;
				const somethingAnimating = renderables.some(s => s.isAnimating);
				if (this.needsRefresh || somethingAnimating) this.refresh();
			}, REFRESH_TIME);
		}
	}

	static setTheme(theme) {
		this.theme = theme;
	}

	static getTheme() {
		return this.theme;
	}

	constructor(options = {}) {
		if (this.render) renderables.push(this);
		process.nextTick(() => this.refresh(true));
		const selectedTheme = Component.getTheme();
		const { name } = this.constructor;
		this.options = {
			...defaultTheme[name],
			...selectedTheme[name],
			...options,
		};
	}

	// eslint-disable-next-line class-methods-use-this
	get isAnimating() {
		return false;
	}

	// eslint-disable-next-line class-methods-use-this
	refresh(now) {
		// todo: add parameter to force refresh now
		if (now) Component.renderAll();
		else Component.refresh();
	}

	destroy() {
		const i = renderables.indexOf(this);
		renderables.splice(i, 1);
		if (!renderables.length) Component.end();
	}
}

Component.setTheme(defaultTheme);

module.exports = Component;
