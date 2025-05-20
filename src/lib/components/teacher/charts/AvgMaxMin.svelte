<script>
	import { onMount } from 'svelte';
	import { Card, Histogram } from '$lib';
	import { selectedClassStore, chatContextStore } from '$lib/stores/globalFilters.js';
	import { FilterIcon } from '$lib/svgComponents';

	const chartTitle = 'Avg-Max-Min Scores';
	let students = 'All students';
	let subject = 'English';
	let testPeriod = 'Last 3 tests';
	let testNames = [];
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
	

	async function fetchAvgMaxMin() {
		try {
			isLoading=true;
			error=null
			const { className, division, subject } = $selectedClassStore;
			const classSubject = `${className}${division}_${subject}`;
			const response = await fetch(`/apis/teacher/avg-max-min/${classSubject}`);
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			const apiData = await response.json();

			// Transforming the data
			testNames = apiData.testScores.map(
				(test) =>
					`${test.examName}-${new Date(test.dateOfExam).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, ' ')}`
			);
			scoreRanges = apiData.scoreTypes;
			data = apiData.testScores.map((test) => [test.avg, test.max, test.min]);
		} catch (err) {
			console.log(err.message);
			error = err.message;
		} finally {
			isLoading = false;
		}
	}

	$: if (isMounted && $selectedClassStore) {
		fetchAvgMaxMin();
	}

	onMount(async () => {
		isMounted = true;
	});
</script>

<Card>
	<div class="flex justify-between items-center text-sm mb-4">
		<h4 class="text-sm font-bold text-black">{chartTitle}</h4>
		<button class="flex gap-2 items-center text-link font-medium" on:click={setContextInChatBox}>
			Explore with AI <FilterIcon size={16} /></button
		>
	</div>

	<div class="flex flex-wrap gap-6 mb-4 text-sm text-gray-dark">
		<span>{$selectedClassStore.fullClassName ?$selectedClassStore.fullClassName :''}</span>
		<span>Students: {students}</span>
		<span>Tests: {testPeriod}</span>
	</div>

	{#if isLoading}
		<div class="p-4 text-center">Loading...</div>
	{:else if error}
		<div class="p-4 text-center text-red-500">{error}</div>
	{:else}
		<Histogram classNames={testNames} {scoreRanges} {data} />
	{/if}
</Card>
