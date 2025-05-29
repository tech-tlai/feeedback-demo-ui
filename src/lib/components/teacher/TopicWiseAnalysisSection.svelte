<script>
	import { TopicWiseAnalysis, SectionTitle } from '$lib';
	import { onMount } from 'svelte';
	import ErrorComponent from '$lib/components/ErrorComponent.svelte';
	import SkelClassSummary from '$lib/components/loadingSkeletons/SkelClassSummary.svelte';
	import { fetchApi } from '$lib/apiUtils.js';
	import { selectedClassStore, chatContextStore } from '$lib/stores/globalFilters.js';

	
	let strengths = [];
	let weaknesses = [];
	let isLoadingStrengths = true;
	let isLoadingWeaknesses = true;
	let errorStrengths = null;
	let errorWeaknesses = null;
	let isMounted = false;

	async function loadStrengths() {
		try {
			isLoadingStrengths = true;
			const { className, division, subject } = $selectedClassStore;
			const classSubject = `${className}${division}_${subject}`;
			strengths = await fetchApi(
				`/apis/teacher/topic-wise-analysis/strengths/${classSubject}`,
				{
					action: 'fetch',
					entity: 'topic-wise strengths'
				}
			);
		} catch (err) {
			errorStrengths = err.message;
		} finally {
			isLoadingStrengths = false;
		}
	}

	async function loadWeaknesses() {
		try {
			isLoadingWeaknesses = true;
			const { className, division, subject } = $selectedClassStore;
			const classSubject = `${className}${division}_${subject}`;
			weaknesses = await fetchApi(
				`/apis/teacher/topic-wise-analysis/weaknesses/${classSubject}`,
				{
					action: 'fetch',
					entity: 'topic-wise weaknesses'
				}
			);
		} catch (err) {
			errorWeaknesses = err.message;
		} finally {
			isLoadingWeaknesses = false;
		}
	}

	$: if (isMounted && $selectedClassStore) {
		loadStrengths();
		loadWeaknesses();
	}

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
		<ErrorComponent message={errorStrengths} />
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
		<ErrorComponent message={errorWeaknesses} />
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
