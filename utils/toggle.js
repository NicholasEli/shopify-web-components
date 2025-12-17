import { highlightElement } from 'https://cdn.jsdelivr.net/gh/speed-highlight/core/dist/index.js';

const toggleStyleSheet = new CSSStyleSheet();
toggleStyleSheet.replaceSync(`
	.toggle__options { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
	.toggle__options div { display: flex; align-items: center; }
	h3 { font-size: 1.25rem; font-family: var(--font-sour-gummy); color: var(--light-yellow) }
	button { padding: 0.25rem 0.5rem; outline: none; border: none; background-color: transparent; color: var(--light-gray); cursor: pointer; }
	.toggle__options--usage [name="usage"], .toggle__options--preview [name="preview"] { color: var(--dark-green); }
	button:hover { color: var(--light-green) }
	#cdn { overflow-x: auto; }
	[class*=shj-lang-]{white-space:pre;color:#112;text-shadow:none;box-sizing:border-box;background:#fff;border-radius:10px;max-width:min(100%,100vw);margin:10px 0;padding:30px 20px;font:18px/24px Consolas,Courier New,Monaco,Andale Mono,Ubuntu Mono,monospace;box-shadow:0 0 5px #0001}.shj-inline{border-radius:5px;margin:0;padding:2px 5px;display:inline-block}[class*=shj-lang-]::selection{background:#bdf5}[class*=shj-lang-] ::selection{background:#bdf5}[class*=shj-lang-]>div{display:flex;overflow:auto}[class*=shj-lang-]>div :last-child{outline:none;flex:1}.shj-numbers{counter-reset:line;padding-left:5px}.shj-numbers div{padding-right:5px}.shj-numbers div:before{color:#999;content:counter(line);opacity:.5;text-align:right;counter-increment:line;margin-right:5px;display:block}.shj-syn-cmnt{font-style:italic}.shj-syn-err,.shj-syn-kwd{color:#e16}.shj-syn-num,.shj-syn-class{color:#f60}.shj-numbers,.shj-syn-cmnt{color:#999}.shj-syn-insert,.shj-syn-str{color:#7d8}.shj-syn-bool{color:#3bf}.shj-syn-type,.shj-syn-oper{color:#5af}.shj-syn-section,.shj-syn-func{color:#84f}.shj-syn-deleted,.shj-syn-var{color:#f44}.shj-oneline{padding:12px 10px}.shj-lang-http.shj-oneline .shj-syn-kwd{color:#fff;background:#25f;border-radius:5px;padding:5px 7px}
	[class*=shj-lang-]{white-space:pre;color:#112;text-shadow:none;box-sizing:border-box;background:#fff;border-radius:10px;max-width:min(100%,100vw);margin:10px 0;padding:30px 20px;font:18px/24px Consolas,Courier New,Monaco,Andale Mono,Ubuntu Mono,monospace;box-shadow:0 0 5px #0001}.shj-inline{border-radius:5px;margin:0;padding:2px 5px;display:inline-block}[class*=shj-lang-]::selection{background:#bdf5}[class*=shj-lang-] ::selection{background:#bdf5}[class*=shj-lang-]>div{display:flex;overflow:auto}[class*=shj-lang-]>div :last-child{outline:none;flex:1}.shj-numbers{counter-reset:line;padding-left:5px}.shj-numbers div{padding-right:5px}.shj-numbers div:before{color:#999;content:counter(line);opacity:.5;text-align:right;counter-increment:line;margin-right:5px;display:block}.shj-syn-cmnt{font-style:italic}.shj-syn-err,.shj-syn-kwd{color:#e16}.shj-syn-num,.shj-syn-class{color:#f60}.shj-syn-insert,.shj-syn-str{color:#7d8}.shj-syn-bool{color:#3bf}.shj-syn-type,.shj-syn-oper{color:#5af}.shj-syn-section,.shj-syn-func{color:#84f}.shj-syn-deleted,.shj-syn-var{color:#f44}.shj-oneline{padding:12px 10px}.shj-lang-http.shj-oneline .shj-syn-kwd{color:#fff;background:#25f;border-radius:5px;padding:5px 7px}[class*=shj-lang-]{color:#abb2bf;background:#161b22}[class*=shj-lang-]:before{color:#6f9aff}.shj-syn-deleted,.shj-syn-err,.shj-syn-var{color:#e06c75}.shj-syn-section,.shj-syn-oper,.shj-syn-kwd{color:#c678dd}.shj-syn-class{color:#e5c07b}.shj-numbers,.shj-syn-cmnt{color:#76839a}.shj-syn-insert{color:#98c379}.shj-syn-type{color:#56b6c2}.shj-syn-num,.shj-syn-bool{color:#d19a66}.shj-syn-str,.shj-syn-func{color:#61afef}

`);

class Toggle extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [toggleStyleSheet];
		this.display = 'usage';
	}

	connectedCallback() {
		this.render();
		this.setCDN();
		this.setUsage();
	}

	setDisplay(display) {
		this.display = display;
		this.render();
		this.setCDN();
		this.setUsage();
	}

	dedent(str) {
		const lines = str.split('\n');
		// remove empty lines at start/end
		while (lines.length && lines[0].trim() === '') lines.shift();
		while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();

		const indentLengths = lines
			.filter((line) => line.trim())
			.map((line) => line.match(/^(\s*)/)[1].length);
		const minIndent = Math.min(...indentLengths);

		return lines.map((line) => line.slice(minIndent)).join('\n');
	}

	setUsage() {
		const slots = this.querySelectorAll('[slot]');
		const code = this.shadowRoot.querySelector('#code');

		slots.forEach((slot) => {
			const template = slot.querySelector('template');
			if (template && code) {
				code.textContent = this.dedent(template.content.querySelector('div').innerHTML);
				highlightElement(code, 'html', null, { hideLineNumbers: true });
			}
		});
	}

	setCDN() {
		const slots = this.querySelectorAll('[slot]');
		const cdn = this.shadowRoot.querySelector('#cdn');

		slots.forEach((slot) => {
			if (cdn) {
				cdn.textContent = `<script src="${this.getAttribute('url')}"></script>`;
				highlightElement(cdn, 'html', null, { hideLineNumbers: true });
			}
		});
	}

	render() {
		this.shadowRoot.innerHTML = `
      <div class="toggle">
        <div class="toggle__options toggle__options--${this.display}">
					<h3>${this.getAttribute('title')}</h3>
					<div>
	          <button type="button" name="usage">usage</button>
	          <button type="button" name="preview">preview</button>
					</div>
        </div>
				
				${
					this.display === 'usage'
						? `
					<code id="cdn" class="shj-lang-html"></code>
					<div id="code" class='shj-lang-html'></div>
				`
						: ``
				}
        ${this.display === 'usage' ? `<slot name="usage"></slot>` : `<slot name="preview"></slot>`}
      </div>
    `;

		this.shadowRoot
			.querySelector('[name="usage"]')
			.addEventListener('click', () => this.setDisplay('usage'));
		this.shadowRoot
			.querySelector('[name="preview"]')
			.addEventListener('click', () => this.setDisplay('preview'));
	}
}

customElements.define('util-toggle', Toggle);
