import { highlightElement } from 'https://cdn.jsdelivr.net/gh/speed-highlight/core/dist/index.js';

window.onload = function () {
	polaris.textContent = '<script src="https://cdn.shopify.com/shopifycloud/polaris.js"></script>';
	highlightElement(polaris, 'html', null, { hideLineNumbers: true });
};
