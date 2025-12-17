class SortableListDemo extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
		this.onChange();
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback(attribute, prev, next) {
		if (prev === next) return;

		this[attribute] = next;

		this.render();
		this.onChange();
	}

	onChange() {
		const toggle_sort = this.querySelector('#toggle-sort');
		const sortable_list = this.querySelector('s-sortable-list');

		if (!toggle_sort || !sortable_list) return null;
		toggle_sort.addEventListener('change', (event) =>
			sortable_list.setAttribute('sorting', event.target.checked)
		);

		this.querySelector('#sortable-list').addEventListener('change', (event) =>
			console.log(event.detail.items)
		);
	}

	render() {
		this.innerHTML = `
			<util-toggle 
				title="Sortable List" 
				text="Simple drag and drop list with toggle on and off functionality"
				url="https://cdn.jsdelivr.net/gh/NicholasEli/s-snax@main/snax/s-sortable-list.js"
			>
				<div slot="usage">
					<template>
					<div>
					<h1>Sortable List</h1>
					<s-sortable-list id="sortable-list" sorting="false" with-border="true">
					 <s-sortable-list-item slot="item" id="one">One</s-sortable-list-item>
					 <s-sortable-list-item slot="item" id="two">Two</s-sortable-list-item>
					 <s-sortable-list-item slot="item" id="three">Three</s-sortable-list-item>
					 <s-sortable-list-item slot="item" id="four">Four</s-sortable-list-item>
					 <s-sortable-list-item slot="item" id="five">Five</s-sortable-list-item>
					</s-sortable-list>

					<script>
					 // On change event returns array of list item IDs ['one', 'three', 'five', 'two', 'four']
					 const list = document.getElementById('sortable-list');
					 list.addEventListener('change', (event) => console.log(event.detail.items));
					</script>
					</div>
					</template>
				</div>
				<div slot="preview">
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
				</div>
			</util-toggle>
		`;
	}
}

customElements.define('s-sortable-list-demo', SortableListDemo);
