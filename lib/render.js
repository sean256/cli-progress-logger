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

const removeComponent = (c) => {
	const i = renderables.indexOf(c);
	if (i > -1) renderables.splice(i, 1);
};

const setTheme = (t) => {
	theme = t;
};

const getTheme = () => theme;

const addComponent = (component) => {
	if (!renderables.includes(component)) {
		renderables.push(component);
		process.nextTick(() => refresh(true));
	}
};

const moveToLast = (component) => {
	removeComponent(component);
	renderables.push(component);
	refresh(true);
};

const addComponentToFirst = (component) => {
	removeComponent(component);
	renderables.unshift(component);
	refresh(true);
};

/**
 * Add a component after the given component
 * If the reference component is not found the new component
 * will be added at the end of the list.
 * @param {component} component the component to insert
 * @param {component} reference the component to add after
 */
const addComponentAfter = (component, reference) => {
	removeComponent(component);
	const i = renderables.indexOf(reference);
	if (i > -1) {
		renderables.splice(i + 1, 0, component);
	} else renderables.push(component);
	refresh(true);
};

/**
 * Add a component before the given component
 * If the reference component is not found the new component
 * will be added at the end of the list.
 * @param {component} component the component to insert
 * @param {component} reference the component to add after
 */
const addComponentBefore = (component, reference) => {
	removeComponent(component);
	const i = renderables.indexOf(reference);
	if (i > -1) {
		renderables.splice(i, 0, component);
	} else renderables.push(component);
	refresh(true);
};

module.exports = {
	write,
	refresh,
	writeLogLine,
	renderAll,
	addComponent,
	removeComponent,
	setTheme,
	getTheme,
	addComponentAfter,
	addComponentBefore,
	addComponentToFirst,
	moveToLast,
};
