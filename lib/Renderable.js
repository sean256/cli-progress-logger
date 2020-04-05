const readline = require('readline');
const defaultTheme = require('../themes/default');

const renderables = [];

const REFRESH_TIME = 300;

class Renderable {
	static resetLine() {
		if (!Renderable.linesOut) return;
		readline.moveCursor(process.stdout, 0, Renderable.linesOut * -1);
		readline.clearScreenDown(process.stdout);
		Renderable.linesOut = 0;
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

	constructor() {
		renderables.push(this);
		process.nextTick(() => this.refresh(true));
	}

	// eslint-disable-next-line class-methods-use-this
	get isAnimating() {
		return false;
	}

	// eslint-disable-next-line class-methods-use-this
	refresh(now) {
		// todo: add parameter to force refresh now
		if (now) Renderable.renderAll();
		else Renderable.refresh();
	}

	destroy() {
		const i = renderables.indexOf(this);
		renderables.splice(i, 1);
		if (!renderables.length) Renderable.end();
	}
}

Renderable.setTheme(defaultTheme);

module.exports = Renderable;
