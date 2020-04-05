const csi = '\x1b[';

const clearFrom = n => process.stdout.write(`${csi + (n || 0)}K`);

const hideCursor = () => process.stdout.write(`${csi}?25l`);
const showCursor = () => process.stdout.write(`${csi}?25h`);

module.exports = {
	clearFrom,
	hideCursor,
	showCursor,
};
