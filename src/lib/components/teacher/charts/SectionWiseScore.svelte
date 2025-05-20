<script>
	import { onMount } from 'svelte';
	import { Histogram } from '$lib';
	import { selectedClassStore, chatContextStore } from '$lib/stores/globalFilters.js';
	import { FilterIcon } from '$lib/svgComponents';
	import { transformForHistogram } from '$lib/utils';

	const chartTitle = 'Section-wise Score Comparison';
	let students = 'All students';
	let subject = 'English';
	let testPeriod = 'Last 1 test';
	let sections = [];
	let scoreRanges = [];
	let data = [];
	let isLoading = true;
	let error = null;
	let isMounted = false;

	function setContextInChatBox() {
		const context = {
			type: 'performance',
			title: `${$selectedClassStore ? `${$selectedClassStore} -` : ''} ${chartTitle}`
		};
		chatContextStore.set(context);
	}

	
	async function fetchSectionWiseScore() {
		try {
			isLoading = true;
			error = null;
			const { className, division, subject } = $selectedClassStore;
			const classSubject = `${className}${division}_${subject}`;
			const response = await fetch(`/apis/teacher/section-wise-comparison/${classSubject}`);
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			const apiData = await response.json();
			
			({ scoreRanges, sections, histogramData: data } = transformForHistogram(apiData));
						
		} catch (err) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	}

	$: if (isMounted && $selectedClassStore) {
		fetchSectionWiseScore();
	}

	onMount(async () => {
		isMounted = true;
	});
</script>

<div class="bg-white rounded-lg shadow-sm p-4 w-full max-w-4xl h-full text-sm">
	<div class="flex justify-between items-center text-sm mb-4">
		<h4 class="text-sm font-bold text-black">{chartTitle}</h4>
		<button class="flex gap-2 items-center text-link font-medium" on:click={setContextInChatBox}>
			Explore with AI <FilterIcon size={16} /></button
		>
	</div>

	<div class="flex flex-wrap gap-6 mb-6 text-sm text-gray-dark">
		<span>{sections.join(', ')} - {$selectedClassStore.subject}</span>
		<span>Students: {students}</span>
		<span>Tests: {testPeriod}</span>
	</div>

	{#if isLoading}
		<div class="p-4 text-center">Loading...</div>
	{:else if error}
		<div class="p-4 text-center text-red-500">{error}</div>
	{:else}
		<Histogram classNames={sections} {scoreRanges} {data} />
	{/if}
</div>
