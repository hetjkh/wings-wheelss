import { writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { html } from './src/slides.mjs';

mkdirSync('dist', { recursive: true });
writeFileSync('dist/index.html', html('tw.css'));
execSync('npx @tailwindcss/cli -i src/input.css -o dist/tw.css', { stdio: 'inherit' });
console.log('built dist/index.html');
