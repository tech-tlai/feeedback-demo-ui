<script>
	import { TopicWiseAnalysis, SectionTitle } from '$lib';
	import { onMount } from 'svelte';
	import ErrorComponent from '$lib/components/ErrorComponent.svelte';
	import SkelClassSummary from '$lib/components/loadingSkeletons/SkelClassSummary.svelte';
	import { fetchStrengths, fetchWeaknesses } from '$lib/apiUtils.js';

	let strengths = [];
	let weaknesses = [];
	let isLoadingStrengths = true;
	let isLoadingWeaknesses = true;
	let errorStrengths = null;
	let errorWeaknesses = null;

	const STUDENT_ID=1;

	async function loadStrengths() {

		try {
			strengths = await fetchStrengths(`/apis/student/topic-wise-analysis/strengths/${STUDENT_ID}`);
		} catch (err) {
			errorStrengths = err.message;
		} finally {
			isLoadingStrengths = false;
		}
	}

	async function loadWeaknesses() {
		try {
			weaknesses = await fetchWeaknesses(`/apis/student/topic-wise-analysis/weaknesses/${STUDENT_ID}`);
		} catch (err) {
			errorWeaknesses = err.message;
		} finally {
			isLoadingWeaknesses = false;
		}
	}

	onMount(() => {
		loadStrengths();
		loadWeaknesses();
	});

	function transformData(data, attribute) {
		if (!data || !Array.isArray(data)) {
			return null; // or handle the error as needed
		}
		if (data.length === 0) {
			return [];
		}
		const transformedData = {
			name: attribute,
			children: data.map(item => ({
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
		<ErrorComponent message={errorStrengths} />
	{:else}
		<TopicWiseAnalysis dataForChart={transformedStrengths} showNewKeywordsMsg={true} keywords={strengths} title="Strength Analysis" chartSentiment="positive" chartType={'strengths'} />
	{/if}

	{#if isLoadingWeaknesses}
		<SkelClassSummary />
	{:else if errorWeaknesses}
		<ErrorComponent message={errorWeaknesses} />
	{:else}
		<TopicWiseAnalysis dataForChart={transformedWeaknesses} showNewKeywordsMsg={true} keywords={weaknesses} title="Weakness Analysis" chartSentiment="negative" chartType={'weaknesses'} />
	{/if}
</div>
