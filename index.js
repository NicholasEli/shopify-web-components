window.onload = function () {
	const toggle_sort = document.getElementById('toggle-sort');
	const sortable_list = document.querySelector('s-sortable-list');

	toggle_sort.addEventListener('change', (event) =>
		sortable_list.setAttribute('sorting', event.target.checked)
	);

	document
		.getElementById('sortable-list')
		.addEventListener('change', (event) => console.log(event.detail.items));

	document
		.getElementById('carousel')
		.addEventListener('change', (event) => console.log(event.detail.item));
};
