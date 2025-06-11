<script>
	import { Card, ProgressIndicator } from '$lib';
	import { selectedClassStore } from '$lib/stores/globalFilters.js';
	import { onMount } from 'svelte';
	import { fetchApi } from '$lib/apiUtils.js';

	// Props
	export let title = 'Learning Outcome scores';
	export let outcomes = [
		{ label: 'Knowledge', value: 0 },
		{ label: 'Application', value: 0 },
		{ label: 'Understanding', value: 0 }
	];
	let isLoading = false;
	let error = '';

	let isMounted = false;

	// async function fetchLearningOutcomes() {
	// 	try {
	// 		isLoading = true;
	// 		error = '';
	// 		const { className, division, subject } = $selectedClassStore;
	// 		const classSubject = `${className}${division}_${subject}`;
	// 		outcomes = await fetchApi(`/apis/teacher/learningOutcomes/${classSubject}`, {
	// 			action: 'fetch',
	// 			entity: 'learning outcomes'
	// 		});
	// 	} catch (err) {
	// 		error = err.message;
	// 	} finally {
	// 		isLoading = false;
	// 	}
	// }

	// $: if (isMounted && $selectedClassStore) {
	// 	fetchLearningOutcomes();
	// }

	// onMount(() => {
	// 	isMounted = true;
	// });
</script>

<Card>
	<div>
		<h4 class="text-black text-sm font-bold mb-4">{title}</h4>
		<div class="text-gray-dark text-sm mb-6">
			{$selectedClassStore.fullClassName ?$selectedClassStore.fullClassName :''}
		</div>
	</div>
	{#if isLoading}
		<div class="p-4 text-center">Loading...</div>
	{:else if error}
		<div class="p-4 text-center text-red-500">{error}</div>
	{:else}
		<div class="flex flex-col h-full justify-between">
			<div class="space-y-8 mb-4">
				{#each outcomes as outcome, index}
					<div>
						<ProgressIndicator label={outcome.label} value={outcome.value} />

						{#if index < outcomes.length - 1}
							<div class="mt-8 border-b border-gray-light"></div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</Card>
