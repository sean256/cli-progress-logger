/* eslint-disable class-methods-use-this */
const readline = require('readline');
const defaultTheme = require('../themes/default');

const renderables = [];
const REFRESH_TIME = 300;

let linesOut = 0;
let refreshCheckTimeout;
let needsRefresh = false;

const writeLine = (line) => {
	process.stdout.write(line);
};

const resetLine = () => {
	if (!linesOut) return;
	readline.moveCursor(process.stdout, 0, linesOut * -1);
	readline.clearScreenDown(process.stdout);
	linesOut = 0;
};

const renderAll = () => {
	this.pendingRefresh = true;
	let lineCount = 1; // 1 for horizontal line
	resetLine();
	writeLine('━'.repeat(process.stdout.columns));
	renderables.forEach((r) => {
		const lines = r.render();
		lines.forEach(l => writeLine(`${l}\n`));
		lineCount += lines.length;
	});
	linesOut = lineCount;
};

const writeLogLine = (line) => {
	resetLine();
	readline.clearLine(process.stdout);
	process.stdout.write(`${line}\n`);
	renderAll();
};

const refresh = () => {
	if (refreshCheckTimeout) needsRefresh = true;
	else {
		// do a refresh now, set a timeout to see if another one is needed in REFRESH_TIME
		renderAll();
		needsRefresh = false;
		refreshCheckTimeout = setTimeout(() => {
			refreshCheckTimeout = null;
			const somethingAnimating = renderables.some(s => s.isAnimating);
			if (needsRefresh || somethingAnimating) refresh();
		}, REFRESH_TIME);
	}
};

class Component {
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

	writeLogLine(line) {
		writeLogLine(line);
	}

	get isAnimating() {
		return false;
	}

	refresh(now) {
		// todo: add parameter to force refresh now
		if (now) renderAll();
		else refresh();
	}

	destroy() {
		const i = renderables.indexOf(this);
		renderables.splice(i, 1);
	}
}

Component.setTheme(defaultTheme);

module.exports = Component;
