const readline = require('readline');
const Parent = require('./Parent');

const root = new Parent();

const REFRESH_TIME = 300;

let refreshCheckTimeout;
let needsRefresh = false;

const write = (line) => {
	process.stdout.write(line);
};

const renderRoot = () => {
	this.pendingRefresh = true;
	let lineCount = 1;
	readline.clearScreenDown(process.stdout);
	readline.moveCursor(process.stdout, 0, 1);
	const lines = root.render();
	lines.forEach(l => write(`${l}\n`));
	lineCount += lines.length;
	// reset line
	readline.moveCursor(process.stdout, 0, lineCount * -1);
};

const writeLogLine = (line) => {
	readline.clearLine(process.stdout);
	process.stdout.write(`${line}\n`);
	renderRoot();
};

const refresh = (now) => {
	if (now) {
		renderRoot();
		return;
	}
	if (refreshCheckTimeout) needsRefresh = true;
	else {
		// do a refresh now, set a timeout to see if another one is needed in REFRESH_TIME
		renderRoot();
		needsRefresh = false;
		refreshCheckTimeout = setTimeout(() => {
			refreshCheckTimeout = null;
			const somethingAnimating = root.isAnimating;
			if (needsRefresh || somethingAnimating) refresh();
		}, REFRESH_TIME);
	}
};

root.parent = {
	refresh,
};

module.exports = {
	write,
	refresh,
	writeLogLine,
	root,
};
