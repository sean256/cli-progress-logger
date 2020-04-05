const readline = require('readline');

const renderables = [];

const REFRESH_TIME = 300;

module.exports = class Renderable {
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
				if (this.needsRefresh) this.refresh();
			}, REFRESH_TIME);
		}
	}

	constructor() {
		renderables.push(this);
		process.nextTick(() => this.refresh(true));
	}

	refresh(now) {
		// todo: add parameter to force refresh now
		if (now) Renderable.renderAll();
		else Renderable.refresh();
	}

	set isAnimating(value) {
		// if true, 
	}

	destroy() {
		const i = renderables.indexOf(this);
		renderables.splice(i, 1);
		if (!renderables.length) Renderable.end();
	}
};

