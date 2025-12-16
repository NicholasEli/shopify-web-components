class CarouselDemo extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback(attribute, prev, next) {
		if (prev === next) return;

		this[attribute] = next;

		this.render();
	}

	render() {
		this.innerHTML = `
			<s-section heading="Carousel">
				<s-carousel id="carousel" title="Carousel Items">
					<s-carousel-item
						slot="item"
						title="Item 1"
						details="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
						image="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png"
					>
					</s-carousel-item>
					<s-carousel-item
						slot="item"
						title="Item 2"
						details="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
						image="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-2_large.png"
					>
					</s-carousel-item>
					<s-carousel-item
						slot="item"
						title="Item 3"
						details="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
						image="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-3_large.png"
					>
					</s-carousel-item>
				</s-carousel>
			</s-section>
		`;
	}
}

customElements.define('s-carousel-demo', CarouselDemo);
