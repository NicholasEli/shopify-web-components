import { highlightElement } from 'https://cdn.jsdelivr.net/gh/speed-highlight/core/dist/index.js';
import { asyncTimeout, randomInt } from './utils/helpers.js';

const widths = [20, 20, 20, 20, 40, 40, 40, 80, 640];
const snacks = ['cheese', 'chicken', 'dog', 'dounut', 'egg', 'ham', 'pizza', 'burger'];

const animateSnack = async function () {
	const snack = snacks[randomInt(0, snacks.length - 1, true)];
	const left = randomInt(-100, window.innerWidth + 100, true);
	const width = widths[randomInt(0, widths.length - 1, true)];
	const rotate = randomInt(-540, 540, true);

	const img = document.createElement('img');
	img.classList.add('snack');
	img.style.width = width + 'px';
	img.style.left = left + 'px';

	document.body.appendChild(img);
	img.src = `./assets/bg/${snack}.png`;
	img.alt = snack;
	img.classList.add('animate');

	setTimeout(() => {
		img.style.transform = `rotate(${rotate}deg)`;
	}, 1000);

	setTimeout(() => img.remove(), 22000);

	await asyncTimeout(10000);
	await animateSnack();
};

window.onload = function () {
	polaris.textContent = '<script src="https://cdn.shopify.com/shopifycloud/polaris.js"></script>';
	highlightElement(polaris, 'html', null, { hideLineNumbers: true });

	animateSnack();
};
