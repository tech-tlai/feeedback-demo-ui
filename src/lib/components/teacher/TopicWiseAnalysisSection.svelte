<script>
	import { TopicWiseAnalysis, SectionTitle } from '$lib';
	import { onMount } from 'svelte';
	import ErrorComponent from '$lib/components/ErrorComponent.svelte';
	import SkelClassSummary from '$lib/components/loadingSkeletons/SkelClassSummary.svelte';
	import { fetchStrengths, fetchWeaknesses } from '$lib/apiUtils.js';
	import { selectedClassStore, chatContextStore } from '$lib/stores/globalFilters.js';

	// const strengths = [
	// 			{ id: 1, name: 'Subject - Verb Agreement', category: 'major', isNew: false, value: 60 },
	// 			{ id: 2, name: 'Verbs', category: 'major', isNew: false, value: 30 },
	// 			{ id: 3, name: 'Nouns', category: 'major', isNew: false, value: 50 },
	// 			{ id: 4, name: 'Synonyms and Antonyms', category: 'major', isNew: false, value: 110 },
	// 			{ id: 5, name: 'Punctuation', category: 'major', isNew: false, value: 10 },
	// 			{ id: 6, name: 'Compound Words', category: 'major', isNew: true, value: 70 },
	// 			{ id: 7, name: 'Creative Writing', category: 'major', isNew: true, value: 160 }
	// 		];

	// const weaknesses = [
	// 		{ id: 1, name: 'Basic Conversation', category: 'major', isNew: false, value: 235 },
	// 		{ id: 2, name: 'Comprehension', category: 'major', isNew: false, value: 195 },
	// 		{ id: 3, name: 'Homophones', category: 'major', isNew: false, value: 130 },
	// 		{ id: 4, name: 'Prefixes and Suffixes', category: 'major', isNew: false, value: 50 },
	// 		{ id: 5, name: 'Compound Words', category: 'major', isNew: false, value: 90 },
	// 		{ id: 6, name: 'Letter Writing', category: 'major', isNew: true, value: 75 },
	// 		// { id: 7, name: 'Parts of speech', category: 'major', isNew: false, value: 100 }
	// 	]

	// function transformData(data, attribute) {
	// 	const transformedData = {
	// 		name: attribute,
	// 		children: data.map(item => ({
	//             name: item.name,
	//             value: item.value
	//         }))
	// 	};
	// 	return transformedData;
	// }

	// const transformedStrengths = transformData(strengths, 'Strengths');
	// const transformedWeaknesses = transformData(weaknesses, 'Weaknesses');
	let strengths = [];
	let weaknesses = [];
	let isLoadingStrengths = true;
	let isLoadingWeaknesses = true;
	let errorStrengths = null;
	let errorWeaknesses = null;
	let isMounted = false;

	async function loadStrengths() {
		try {
			isLoadingStrengths=true;
			const { className, division, subject } = $selectedClassStore;
			const classSubject = `${className}${division}_${subject}`;
			strengths = await fetchStrengths(
				`/apis/teacher/topic-wise-analysis/strengths/${classSubject}`
			);
		} catch (err) {
			errorStrengths = err.message;
		} finally {
			isLoadingStrengths = false;
		}
	}

	async function loadWeaknesses() {
		try {
			isLoadingWeaknesses=true;
			const { className, division, subject } = $selectedClassStore;
			const classSubject = `${className}${division}_${subject}`;
			weaknesses = await fetchWeaknesses(
				`/apis/teacher/topic-wise-analysis/weaknesses/${classSubject}`
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
