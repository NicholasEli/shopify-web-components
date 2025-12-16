const carouselStyleSheet = new CSSStyleSheet();
carouselStyleSheet.replaceSync(`
	ul { width: 100%; max-width: 100%; overflow: hidden; position: relative; margin: 0; padding: 0; list-style: none; }
	li { width: 100%; display: inline-block; }
`);

class CarouselItem extends HTMLElement {
	connectedCallback() {
		if (!this.closest('s-carousel-item')) {
			console.warn('<s-carousel-item> must be used inside <s-sortable-list>');
		}
	}
}

class Carousel extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.shadow.adoptedStyleSheets = [carouselStyleSheet];
		this.items = [];
		this.index = 0;
	}

	connectedCallback() {
		this.items = Array.from(this.querySelectorAll('s-carousel-item'));
		this.render();
	}

	static get observedAttributes() {
		return ['index'];
	}

	attributeChangedCallback(attribute, prev, next) {
		if (prev === next) return;

		this[attribute] = next;

		this.render();
	}

	dispatch() {
		const item = this.items[this.index];
		const title = item.getAttribute('title');
		const details = item.getAttribute('details');
		const image = item.getAttribute('image');

		this.dispatchEvent(
			new CustomEvent('change', {
				detail: {
					item: {
						title,
						details,
						image
					}
				},
				bubbles: true,
				composed: true
			})
		);
	}

	uuid() {
		var S4 = function () {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};

		return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
	}

	prev() {
		let index = this.index - 1;
		if (index < 0) index = this.items.length - 1;
		this.index = index;

		this.render();
		this.dispatch();
	}

	next() {
		let index = this.index + 1;
		if (index >= this.items.length) index = 0;
		this.index = index;

		this.render();
		this.dispatch();
	}

	render() {
		const heading = this.getAttribute('title');
		const prev = this.uuid();
		const next = this.uuid();
		const item = this.items[this.index];
		const title = item.getAttribute('title');
		const details = item.getAttribute('details');
		const image = item.getAttribute('image');

		this.shadow.innerHTML = `
			<s-section${heading ? ` heading="${this.getAttribute('title')}` : ''}">
				<s-grid gridTemplateColumns="1rem auto 1rem" justifyContent="space-between" alignItems="center" gap="small">
					<s-grid-item>
						<s-button id="${prev}" icon="chevron-left" accessibilityLabel="Previous Slide"></s-button>
					</s-grid-item>
					<s-grid-item>
						<ul>
							<li>
								<s-stack>
									${image ? `<s-stack-item><s-image src="${image}" /></s-stack-item>` : ''}
									${title ? `<s-stack-item><s-heading>${title}</s-heading></s-stack-item>` : ''}
									${details ? `<s-stack-item><s-paragraph>${details}</s-paragraph></s-stack-item>` : ''}
								</s-stack>
							</li>
						</ul>
					</s-grid-item>
					<s-grid-item>
						<s-button id="${next}" icon="chevron-right" accessibilityLabel="Next Slide"></s-button>
					</s-grid-item>
				</s-grid>
			</s-section>
		`;

		if (this.shadowRoot.getElementById(prev)) {
			this.shadowRoot.getElementById(prev).addEventListener('click', () => this.prev());
		}

		if (this.shadowRoot.getElementById(next)) {
			this.shadowRoot.getElementById(next).addEventListener('click', () => this.next());
		}
	}
}

customElements.define('s-carousel', Carousel);
customElements.define('s-carousel-item', CarouselItem);
