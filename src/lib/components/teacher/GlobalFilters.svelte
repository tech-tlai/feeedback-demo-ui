<script>
	import { Tabs, SearchBar } from '$lib';
	import { onMount } from 'svelte';
	import { selectedClassStore } from '$lib/stores/globalFilters.js'; // Import the store

	function handleClassTabSelection(e) {
		const { index, tab } = e.detail;

		if (tab) {
			const { class: className, division, subject } = tab;

			selectedClassStore.update((prev) => ({
				...prev,
				className: className + division,
				division,
				subject,
				fullClassName: `${className}${division} ${subject}`
			}));
		}
	}

	// Example structure for tabs array:
	// [{ id: 1, text: 'Class 7A English', class: '7', division: 'A', subject: 'English' }]
	export let tabs = [];
</script>

<div class="flex flex-col gap-8 items-center w-full my-8">
	<Tabs on:tabSelected={handleClassTabSelection} {tabs} />
	<div class="w-full lg:w-1/2">
		<SearchBar placeholder="Filter by student" />
	</div>
</div>
