const sortableStyleSheet = new CSSStyleSheet();
sortableStyleSheet.replaceSync(`
  ul { position: relative; margin: 0; padding: 0; list-style: none; }
  ul:has(.active) li { cursor: grabbing;}
  li { padding: 0.75rem 0; touch-action: none; user-select: none; -webkit-user-drag: none; cursor: grab; }
  li.active { opacity: 0; }

  #s-sortable-list-clone { 
  	position: fixed; 
  	top: 0; 
  	left: 0; 
  	z-index: 2; 
  	list-style: none;
		pointer-events: none;
		transform: translate3d(0, 0, 0);
		will-change: transform;
		background-color: #fff;
		opacity: 0.75;
  }

  #s-sortable-list-clone.active { opacity: 0 }
`);

class SortableListItem extends HTMLElement {
	connectedCallback() {
		if (!this.closest('s-sortable-list')) {
			console.warn('<s-sortable-list-item> must be used inside <s-sortable-list>');
		}

		if (!this.id) {
			console.warn('<s-sortable-list-item> must be have ID to render');
		}
	}
}

class SortableList extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.shadow.adoptedStyleSheets = [sortableStyleSheet];
		this.items = [];
		this.dragging = null;
	}

	connectedCallback() {
		this.items = Array.from(this.querySelectorAll('s-sortable-list-item')).filter(
			(item) => item.id
		);
		this.render();
	}

	static get observedAttributes() {
		return ['sorting'];
	}

	attributeChangedCallback(attribute, prev, next) {
		if (prev === next) return;

		this[attribute] = next;

		this.render();
	}

	cloneDragElement(event) {
		const clone = this.shadowRoot.getElementById('s-sortable-list-clone');

		if (!event || !clone) return null;

		const bounds = clone.getBoundingClientRect();
		const yDiff = bounds.height / 2;
		const xDiff = bounds.width / 2;
		clone.style.top = event.clientY - yDiff + 'px';
		clone.style.left = event.clientX - xDiff + 'px';
	}

	onPointerDown(event, index) {
		const sorting = this.getAttribute('sorting') == 'true';

		if (!sorting) return null;

		const elements = this.shadowRoot.querySelectorAll('li');
		const element = elements[index];

		element.classList.add('active');

		this.dragging = {
			index,
			item: this.items[index]
		};

		const clone = element.cloneNode(true);
		clone.id = 's-sortable-list-clone';
		this.shadowRoot.append(clone);

		setTimeout(() => {
			this.cloneDragElement(event);
			clone.classList.remove('active');
		}, 50);
	}

	onPointerMove(event) {
		const clone = this.shadowRoot.getElementById('s-sortable-list-clone');

		if (!this.dragging || !clone) return null;

		this.cloneDragElement(event);
	}

	onPointerUp(event, index) {
		if (!this.dragging) return null;

		const clone = this.shadowRoot.getElementById('s-sortable-list-clone');
		clone.remove();

		const isTouch = 'ontouchstart' in window;

		this.items.splice(this.dragging.index, 1);

		if (isTouch) {
			const items = Array.from(this.shadowRoot.querySelectorAll('li'));

			let dropIndex = items.length - 1;

			for (let i = 0; i < items.length; i++) {
				const bounds = items[i].getBoundingClientRect();
				const yLimit = bounds.top + bounds.height / 2;

				if (event.clientY < yLimit) {
					dropIndex = i;
					break;
				}
			}

			this.items.splice(dropIndex, 0, this.dragging.item);
		}

		if (!isTouch) {
			this.items.splice(index, 0, this.dragging.item);
		}

		this.dragging = null;
		this.render();

		this.dispatchEvent(
			new CustomEvent('change', {
				detail: {
					items: this.items.map((item) => item.id)
				},
				bubbles: true,
				composed: true
			})
		);
	}

	render() {
		const sorting = this.getAttribute('sorting') == 'true';
		const border = this.getAttribute('with-border') == 'true';

		this.shadow.innerHTML = `
			<ul>
				${this.items
					.filter((item) => item.id)
					.map((item, index) => {
						return `
					<li${border && index > 0 ? ' style="border-top: 1px solid rgb(235, 235, 235);"' : ''}>
						<s-grid gridTemplateColumns="${sorting ? 'auto 1fr' : '1fr'}" justifyContent="start">
							${sorting ? `<s-grid-item><s-icon type="drag-handle"></s-icon></s-grid-item>` : ''}
							<s-grid-item>${item.textContent}</s-grid-item>
						</s-grid>
					</li>
				`;
					})
					.join('')}<ul>
		`;

		this.shadowRoot.querySelectorAll('li').forEach((li, index) => {
			li.addEventListener('pointerdown', (event) => this.onPointerDown(event, index));
			li.addEventListener('pointermove', (event) => this.onPointerMove(event));
			li.addEventListener('pointerup', (event) => this.onPointerUp(event, index));
		});
	}
}

customElements.define('s-sortable-list', SortableList);
customElements.define('s-sortable-list-item', SortableListItem);
