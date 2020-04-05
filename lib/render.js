const readline = require('readline');
const defaultTheme = require('../themes/default');

const renderables = [];
const REFRESH_TIME = 300;

let refreshCheckTimeout;
let needsRefresh = false;
let theme = defaultTheme;

const write = (line) => {
	process.stdout.write(line);
};

const renderAll = () => {
	this.pendingRefresh = true;
	let lineCount = 2; // 1 for empty, 1 for horizontal linee
	readline.clearScreenDown(process.stdout);
	write('\n');
	write('━'.repeat(process.stdout.columns));
	renderables.forEach((r) => {
		const lines = r.render();
		lines.forEach(l => write(`${l}\n`));
		lineCount += lines.length;
	});
	// reset line
	readline.moveCursor(process.stdout, 0, lineCount * -1);
};

const writeLogLine = (line) => {
	readline.clearLine(process.stdout);
	process.stdout.write(`${line}\n`);
	renderAll();
};

const refresh = (now) => {
	if (now) {
		renderAll();
		return;
	}
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

const addComponent = (c) => {
	renderables.push(c);
	process.nextTick(() => refresh(true));
};

const removeComponent = (c) => {
	const i = renderables.indexOf(c);
	renderables.splice(i, 1);
};

const setTheme = (t) => {
	theme = t;
};

const getTheme = () => theme;

module.exports = {
	write,
	refresh,
	writeLogLine,
	renderAll,
	addComponent,
	removeComponent,
	setTheme,
	getTheme,
};
