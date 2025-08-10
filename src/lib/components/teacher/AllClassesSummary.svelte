<script>
	import { OtherClassSummary } from '$lib';
	import SkelClassSummary from '$lib/components/loadingSkeletons/SkelClassSummary.svelte';
	import { selectedClassStore } from '$lib/stores/globalFilters.js';

	export let classes = [];
	let isLoading = false;
	export let error = null;

	// Commented out API call; classes are now passed as a prop from parent
	// onMount(async () => {
	// 	try {
	// 		const response = await fetch(`/apis/teacher/perf-summary/all-classes`);
	// 		if (response.ok) {
	// 			classes = await response.json();
	// 		} else {
	// 			//get mock data
	// 			classes = await response.json();
	// 			// error = 'Failed to fetch class summaries';
	// 			console.log('classes when api fails', classes);
	// 		}
	// 	} catch (err) {
	// 		error = 'An error occurred while fetching class summaries';
	// 	} finally {
	// 		isLoading = false;
	// 	}
	// });


</script>

<!-- {#each classes as classItem}
    {/each} -->

<div class="overflow-hidden relative">
	<div class="overflow-x-auto scroll-smooth pr-16">
		<div class="flex space-x-4 min-w-max pb-4">
			{#if isLoading}
				<div class="w-full grid grid-cols-[repeat(auto-fit,minmax(min(250px,100%),260px))] gap-5">
					{#each Array(3) as _, i}
						<SkelClassSummary key={i} />
					{/each}
				</div>
			{:else if error}
				<div class="text-red-500 text-sm bg-white min-h-40 w-full p-4 rounded-lg shadow-sm">{error}</div>
			{:else if classes.length === 0}
				<div class="text-gray-500">No classes available</div>
			{:else}
				{#each classes as classItem}
					<OtherClassSummary {...classItem} />
				{/each}
			{/if}
		</div>
	</div>
	<div
		class="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent"
	></div>
</div>
