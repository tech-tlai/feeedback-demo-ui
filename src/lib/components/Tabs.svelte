<script>
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	// Array of class names to display as tabs
	export let tabs = [
		{ id: 1, text: 'Class 3A English' } // id and text are mandatory fields, can add more metadata as required.
	];

	$: console.log('tabs', tabs);

	// Index of the currently selected tab (default to first tab)
	export let selectedIndex = 0;

	// Array of optional icons for each tab
	export let icons = [];

	// Function to handle tab selection
	function selectTab(index, tab) {
		selectedIndex = index;
		dispatch('tabSelected', { index, tab });
	}

	onMount(() => {
		dispatch('tabSelected', {
			index: selectedIndex,
			tab: tabs[selectedIndex]
		});
	});
</script>

<div class=" border-b border-gray-light">
	<div class="flex">
		{#each tabs as tab, index}
			<button
				class="px-4 py-3 text-base relative {selectedIndex === index
					? 'text-black font-semibold'
					: 'text-gray-dark font-medium'}"
				on:click={() => selectTab(index, tab)}
				aria-selected={selectedIndex === index}
				role="tab"
			>
				{#if icons[index]}
					<!-- img src={icons[index]} alt="" class="inline-block mr-2" /> -->
					<span>{icons[index]}</span>
				{/if}
				{tab.text}
				{#if selectedIndex === index}
					<div class="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
				{/if}
			</button>
		{/each}
	</div>
</div>
