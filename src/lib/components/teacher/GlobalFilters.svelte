<script>
	import { Tabs, SearchBar } from '$lib';
	import { onMount } from 'svelte';
	import { selectedClassStore } from '$lib/stores/globalFilters.js'; // Import the store

	function handleClassTabSelection(e) {
		const { index, tab } = e.detail;
		console.log('Selected Tab:', index, 'Tab Name:', tab);
		if (tab) {
			const { class: className, division, subject } = tab;

			selectedClassStore.set({
				className,
				division,
				subject,
				fullClassName: `${className}${division} ${subject}`
			});
		}
	}

	const tabs = [
		{ id: 1, text: 'Class 3A English', class: '3', division: 'A', subject: 'English' },
		{
			id: 2,
			text: 'Class 3A Maths',
			class: '3',
			division: 'A',
			subject: 'Maths'
		},
		{ id: 3, text: 'Class 5A English', class: '5', division: 'A', subject: 'English' },
		{ id: 4, text: 'Class 5B Maths', class: '5', division: 'B', subject: 'Maths' }
	];
</script>

<div class="flex flex-col gap-8 items-center w-full my-8">
	<Tabs on:tabSelected={handleClassTabSelection} {tabs}/>
	<div class="w-full lg:w-1/2">
		<SearchBar placeholder="Filter by student" />
	</div>
</div>
