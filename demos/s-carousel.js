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
			<util-toggle 
				title="Carousel" 
				text="Rotating content display with simple previous and next controls"
				url="https://cdn.jsdelivr.net/gh/NicholasEli/s-snax@main/snax/s-carousel.js"
			>
				<div slot="usage">
					<template>
						<div>
						<s-carousel id="carousel" title="Carousel Items">
						 <s-carousel-item slot="item" title="Item 1" details="Lorem ipsum dolor sit amet, consectetur adipisicing elit." image="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png" accessibilityRole="none" alt="Image 1"></s-carousel-item>
						 <s-carousel-item slot="item" title="Item 2" details="Lorem ipsum dolor sit amet, consectetur adipisicing elit." image="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-2_large.png" accessibilityRole="none" alt="Image 2"></s-carousel-item>
						 <s-carousel-item slot="item" title="Item 3" details="Lorem ipsum dolor sit amet, consectetur adipisicing elit." image="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-3_large.png" accessibilityRole="none" alt="Image 3"></s-carousel-item>
						</s-carousel>

						<script>
						 // On change event returns object of visible carousel item {title: '...', details: '...', image: '...'}
						 const carousel = document.getElementById('carousel');
						 list.addEventListener('change', (event) => console.log(event.detail.item));
						</script>
						</div>
					</template>
				</div>
				<div slot="preview">
					<s-section heading="Carousel">
						<s-carousel id="carousel" title="Carousel Items">
							<s-carousel-item
								slot="item"
								title="Item 1"
								details="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
								image="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png"
								accessibilityRole="none"
								alt="Image 1"
							>
							</s-carousel-item>
							<s-carousel-item
								slot="item"
								title="Item 2"
								details="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
								image="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-2_large.png"
								accessibilityRole="none"
								alt="Image 2"
							>
							</s-carousel-item>
							<s-carousel-item
								slot="item"
								title="Item 3"
								details="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
								image="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-3_large.png"
								accessibilityRole="none"
								alt="Image 3"
							>
							</s-carousel-item>
						</s-carousel>
					</s-section>
				</div>
			</util-toggle>
		`;
	}
}

customElements.define('s-carousel-demo', CarouselDemo);
