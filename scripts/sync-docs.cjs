const { cpSync, rmSync, existsSync, mkdirSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const buildDir = join(root, 'build');
const docsDir = join(root, 'docs');

if (!existsSync(buildDir)) {
	console.error('Cannot find build directory. Run "npm run build" first.');
	process.exit(1);
}

if (existsSync(docsDir)) {
	rmSync(docsDir, { recursive: true, force: true });
}

mkdirSync(docsDir, { recursive: true });
cpSync(buildDir, docsDir, { recursive: true });

console.log('Copied build → docs');
