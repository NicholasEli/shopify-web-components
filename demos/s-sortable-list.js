class SortableListDemo extends HTMLElement {
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
			<s-section heading="Sortable List">
				<s-stack gap="large">
					<s-stack-item>
						<s-grid gridTemplateColumns="1fr" gap="small">
							<s-grid-item>
								<s-checkbox id="toggle-sort" label="Toggle Sort" />
							</s-grid-item>
						</s-grid>
					</s-stack-item>

					<s-stack-item>
						<s-sortable-list id="sortable-list" sorting="false" with-border="true">
							<s-sortable-list-item slot="item" id="one">One</s-sortable-list-item>
							<s-sortable-list-item slot="item" id="two">Two</s-sortable-list-item>
							<s-sortable-list-item slot="item" id="three">Three</s-sortable-list-item>
							<s-sortable-list-item slot="item" id="four">Four</s-sortable-list-item>
							<s-sortable-list-item slot="item" id="five">Five</s-sortable-list-item>
						</s-sortable-list>
					</s-stack-item>
				</s-stack>
			</s-section>
		`;
	}
}

customElements.define('s-sortable-list-demo', SortableListDemo);
