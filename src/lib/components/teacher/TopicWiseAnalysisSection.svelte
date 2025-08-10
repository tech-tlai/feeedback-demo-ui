<script>
	import { TopicWiseAnalysis, SectionTitle } from '$lib';
	import { onMount } from 'svelte';
	import ErrorComponent from '$lib/components/ErrorComponent.svelte';
	import SkelClassSummary from '$lib/components/loadingSkeletons/SkelClassSummary.svelte';
	import { fetchApi } from '$lib/apiUtils.js';
	import { selectedClassStore, chatContextStore } from '$lib/stores/globalFilters.js';

	export let strengthAnalysis = {};
	export let chartDataError = '';
	let strengths = [];
	let weaknesses = [];
	let isLoadingStrengths = false;
	let isLoadingWeaknesses = false;
	let errorStrengths = null;
	let errorWeaknesses = null;
	let isMounted = false;

	$: if (chartDataError) {
		errorStrengths = `Failed to load key strengths data. ${chartDataError}`;
		errorWeaknesses = `Failed to load key weaknesses data. ${chartDataError}`;
	}
	// async function loadStrengths() {
	// 	try {
	// 		isLoadingStrengths = true;
	// 		const { className, division, subject } = $selectedClassStore;
	// 		const classSubject = `${className}${division}_${subject}`;
	// 		strengths = await fetchApi(
	// 			`/apis/teacher/topic-wise-analysis/strengths/${classSubject}`,
	// 			{
	// 				action: 'fetch',
	// 				entity: 'topic-wise strengths'
	// 			}
	// 		);
	// 	} catch (err) {
	// 		errorStrengths = err.message;
	// 	} finally {
	// 		isLoadingStrengths = false;
	// 	}
	// }

	// async function loadWeaknesses() {
	// 	try {
	// 		isLoadingWeaknesses = true;
	// 		const { className, division, subject } = $selectedClassStore;
	// 		const classSubject = `${className}${division}_${subject}`;
	// 		weaknesses = await fetchApi(
	// 			`/apis/teacher/topic-wise-analysis/weaknesses/${classSubject}`,
	// 			{
	// 				action: 'fetch',
	// 				entity: 'topic-wise weaknesses'
	// 			}
	// 		);
	// 	} catch (err) {
	// 		errorWeaknesses = err.message;
	// 	} finally {
	// 		isLoadingWeaknesses = false;
	// 	}
	// }

	// $: if (isMounted && $selectedClassStore) {
	// 	loadStrengths();
	// 	loadWeaknesses();
	// }

	function transformData(data, attribute) {
		if (!data || !Array.isArray(data)) {
			return null; // or handle the error as needed
		}
		if (data.length === 0) {
			return [];
		}
		const transformedData = {
			name: attribute,
			children: data.map((item) => ({
				name: item.name,
				value: item.value
			}))
		};
		return transformedData;
	}

	$: transformedStrengths = transformData(strengths, 'Strengths');
	$: transformedWeaknesses = transformData(weaknesses, 'Weaknesses');


	// Map strengthAnalysis.strong_topics and challenging_topics to strengths and weaknesses
	$: strengths = (strengthAnalysis.strong_topics || []).map((t) => ({
		name: t.name,
		value: t.accuracy
	}));
	$: weaknesses = (strengthAnalysis.challenging_topics || []).map((t) => ({
		name: t.name,
		value: t.accuracy
	}));

	onMount(() => {
		isMounted = true;
	});

</script>

<div class="flex w-full justify-center my-6">
	<SectionTitle title="Topic-wise insights" />
</div>
<!-- <div class="flex gap-5">
	<TopicWiseAnalysis
		dataForChart={transformedStrengths}
		keywords={strengths}
		title="Topic-wise Strengths"
		chartSentiment="positive"
		chartType={'strengths'}
	/>
	<TopicWiseAnalysis
		dataForChart={transformedWeaknesses}
		keywords={weaknesses}
		title="Topic-wise Weaknesses"
		chartSentiment="negative"
		chartType={'weaknesses'}
	/>
</div> -->
<div class="grid grid-cols-2 gap-5">
	{#if isLoadingStrengths}
		<SkelClassSummary />
	{:else if errorStrengths}
		<div class="min-h-40 h-full text-sm bg-white p-4 rounded-lg shadow-sm">
			<!-- <div class="flex justify-between items-center mb-4">
				<h4 class="text-black font-bold">{'Key Weaknesses'}</h4>
			</div> -->
			<div class=" text-red-500 mb-4 flex gap-4 items-center">
				<div class="grid 6">{errorStrengths}</div>
			</div>
		</div>
	{:else}
		<TopicWiseAnalysis
			dataForChart={transformedStrengths}
			showNewKeywordsMsg={true}
			keywords={strengths}
			title="Strength Analysis"
			chartSentiment="positive"
			chartType={'strengths'}
		/>
	{/if}

	{#if isLoadingWeaknesses}
		<SkelClassSummary />
	{:else if errorWeaknesses}
		<div class="min-h-40 h-full text-sm bg-white p-4 rounded-lg shadow-sm">
			<!-- <div class="flex justify-between items-center mb-4">
				<h4 class="text-black font-bold">{'Key Weaknesses'}</h4>
			</div> -->
			<div class=" text-red-500 mb-4 flex gap-4 items-center">
				<div class="grid 6">{errorWeaknesses}</div>
			</div>
		</div>
	{:else}
		<TopicWiseAnalysis
			dataForChart={transformedWeaknesses}
			showNewKeywordsMsg={true}
			keywords={weaknesses}
			title="Weakness Analysis"
			chartSentiment="negative"
			chartType={'weaknesses'}
		/>
	{/if}
</div>
