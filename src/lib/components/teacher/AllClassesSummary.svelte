<script>
	import { onMount } from 'svelte';
	import { OtherClassSummary } from '$lib';
	import SkelClassSummary from '$lib/components/loadingSkeletons/SkelClassSummary.svelte';
      import { selectedClassStore } from '$lib/stores/globalFilters.js';

	let classes = [];
	let isLoading = true;
	let error = null;

	onMount(async () => {
		try {
			
			const response = await fetch(`/apis/teacher/perf-summary/all-classes`);
			if (response.ok) {
				classes = await response.json();
			} else {
				//get mock data
				classes = await response.json();
				// error = 'Failed to fetch class summaries';
				console.log('classes when api fails', classes);
			}
		} catch (err) {
			error = 'An error occurred while fetching class summaries';
		} finally {
			isLoading = false;
		}
	});
</script>

<!-- {#each classes as classItem}
    {/each} -->

{#if error}
	<div class="text-red-500">{error}</div>
{:else}
	<div class="overflow-hidden relative">
		<div class="overflow-x-auto scroll-smooth pr-16">
			<div class="flex space-x-4 min-w-max pb-4">
				{#if isLoading}
					{#each Array(5) as _, i}
						<SkelClassSummary showSubjects={3} />
					{/each}
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
{/if}
