<script>
	import { TopicWiseAnalysis, SectionTitle } from '$lib';
	import { onMount } from 'svelte';
	import ErrorComponent from '$lib/components/ErrorComponent.svelte';
	import SkelClassSummary from '$lib/components/loadingSkeletons/SkelClassSummary.svelte';
	import { fetchApi } from '$lib/apiUtils.js';

	export let strengthAnalysis = {};
	export let apiError = false;
	let strengths = [];
	let weaknesses = [];
	let isLoadingStrengths = false;
	let isLoadingWeaknesses = false;
	let errorStrengths = null;
	let errorWeaknesses = null;

	const STUDENT_ID = 1;
	$: if (apiError) {
		errorStrengths = `Failed to load key strengths data. `;
		errorWeaknesses = `Failed to load key weaknesses data. `;
	}

	// Map strengthAnalysis.strong_topics and challenging_topics to strengths and weaknesses
	$: strengths = (strengthAnalysis.strong_topics || []).map((t) => ({
		name: t.name,
		value: t.accuracy
	}));
	$: weaknesses = (strengthAnalysis.challenging_topics || []).map((t) => ({
		name: t.name,
		value: t.accuracy
	}));

	// async function loadStrengths() {
	// 	try {
	// 		isLoadingStrengths = true;
	// 		strengths = await fetchApi(`/apis/student/topic-wise-analysis/strengths/${STUDENT_ID}`, {
	// 			action: 'fetch',
	// 			entity: 'topic-wise strengths'
	// 		});
	// 	} catch (err) {
	// 		errorStrengths = err.message;
	// 	} finally {
	// 		isLoadingStrengths = false;
	// 	}
	// }

	// async function loadWeaknesses() {
	// 	try {
	// 		isLoadingWeaknesses = true;
	// 		weaknesses = await fetchApi(`/apis/student/topic-wise-analysis/weaknesses/${STUDENT_ID}`, {
	// 			action: 'fetch',
	// 			entity: 'topic-wise weaknesses'
	// 		});
	// 	} catch (err) {
	// 		errorWeaknesses = err.message;
	// 	} finally {
	// 		isLoadingWeaknesses = false;
	// 	}
	// }

	// onMount(() => {
	// 	loadStrengths();
	// 	loadWeaknesses();
	// });

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
</script>

<div class="grid grid-cols-2 gap-5">
	{#if isLoadingStrengths}
		<SkelClassSummary />
	{:else if errorStrengths}
		<div class="min-h-40 h-full text-sm bg-white p-4 rounded-lg shadow-sm">
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
