<script>
	import { onMount } from 'svelte';
	import { Histogram } from '$lib';
	import { selectedClassStore, chatContextStore } from '$lib/stores/globalFilters.js';
	import { FilterIcon } from '$lib/svgComponents';
	import { transformForHistogram } from '$lib/utils';
	import { transformSectionWiseData, toHistogramArray } from '$lib/utils.js';
	import { fetchApi } from '$lib/apiUtils.js';

	export let sectionWiseData = {};
	export let error = null;
	let sectionDataForChart;

	const chartTitle = 'Section-wise Score Comparison';
	let students = 'All students';
	let subject = 'English';
	let testPeriod = 'Last 1 test';
	let sections = [];
	let scoreRanges = [];
	let data = [];
	let isLoading = false;
	let isMounted = false;


	// Extract data from sectionWiseData prop
	$: if (sectionWiseData && Object.keys(sectionWiseData).length > 0) {
		sectionDataForChart = transformSectionWiseData(sectionWiseData);
		data = toHistogramArray(sectionDataForChart);
		scoreRanges = sectionWiseData.scoreRanges.map((d) => d.name);
		sections = sectionWiseData.sections.map((d) => d.name);
		// console.log('data in reactive block', toHistogramArray(sectionDataForChart));
		// console.log(
		// 	'sectionWiseData --- in reactive block',
		// 	sectionWiseData.scoreRanges.map((d) => d.name)
		// );
		// console.log(
		// 	'sectionWiseData --- in reactive block',
		// 	sectionWiseData.sections.map((d) => d.name)
		// );

		// Optionally update students, subject, testPeriod if available in sectionWiseData
		// students = sectionWiseData.students || students;
		// subject = sectionWiseData.subject || subject;
		// testPeriod = sectionWiseData.testPeriod || testPeriod;
	}
	function setContextInChatBox() {
		const context = {
			type: 'performance',
			title: `${$selectedClassStore ? `${$selectedClassStore.className} -` : ''} ${chartTitle}`
		};
		chatContextStore.set(context);
	}

	// async function fetchSectionWiseScore() {
	// 	try {
	// 		isLoading = true;
	// 		error = null;
	// 		const { className, division, subject } = $selectedClassStore;
	// 		const classSubject = `${className[0]}${division}_${subject}`;
	// 		const response = await fetchApi(`/apis/teacher/section-wise-comparison/3A_English`, {
	// 			action: 'fetch',
	// 			entity: 'section-wise score'
	// 		});
	// 		// ({ scoreRanges, sections, histogramData: data } = transformForHistogram(response));

	// 		// console.log('scorerange in api', scoreRanges);
	// 		// console.log('sections in api', sections);
	// 		// console.log('data in api', data);
	// 	} catch (err) {
	// 		error = err.message;
	// 	} finally {
	// 		isLoading = false;
	// 	}
	// }

	// $: if (isMounted && $selectedClassStore) {
	// 	fetchSectionWiseScore();
	// }

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
		<div class="p-4 text-center text-red-500 text-sm">{error}</div>
	{:else}
		<Histogram classNames={sections} {scoreRanges} {data} />
	{/if}
</div>
