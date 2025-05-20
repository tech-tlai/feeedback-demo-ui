<script>
	import { ProgressTrendChart } from '$lib';
	import { onMount } from 'svelte';
	import { chatContextStore, selectedClassStore } from '$lib/stores/globalFilters.js';

	let examDates = [];
	let subjectData = {};
	let isLoading = true;
	let error = null;
	let isMounted = false;
	const title = 'Progress Trend';

	async function fetchProgressTrend() {
		isLoading = true;
		error = null;
		try {
			const { className, division, subject } = $selectedClassStore;
			const classSubject = `${className}${division}_${subject}`;			
			const response = await fetch(`/apis/teacher/progress-trend/${classSubject}`);
			if (!response.ok) throw new Error('Failed to fetch progress trend data');
			const apiData = await response.json();
			const sortedData = apiData.sort((a, b) => new Date(a.date) - new Date(b.date));
			examDates = sortedData.map((item) => item.date);
			subjectData = sortedData.reduce((acc, item) => {
				if (!acc[item.subject]) {
					acc[item.subject] = [];
				}
				acc[item.subject].push({
					percentage: item.marksPercentage,
					total: item.totalMarks,
					obtained: item.marks,
					date: item.date
				});
				return acc;
			}, {});
		} catch (err) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	}

	function setContextInChatBox(e) {
		const storeValue = $selectedClassStore;
		if (storeValue) {
			const { className, division, subject } = storeValue;
			const context = {
				type: e.detail.type,
				title: `${className || ''}${division || ''} ${subject || ''} - ${title}`
			};
			chatContextStore.set(context);
		}
	}

	$: if (isMounted && $selectedClassStore) {
		fetchProgressTrend();
	}

	onMount(() => {
		isMounted = true;
	});

	
</script>

{#if isLoading}
	<div class="p-4 text-center">Loading...</div>
{:else if error}
	<div class="p-4 text-center text-red-500">{error}</div>
{:else}
	<ProgressTrendChart
		{title}
		subjectFilter={$selectedClassStore.subject}
		{examDates}
		{subjectData}
		on:setContextInChatBox={setContextInChatBox}
	/>
{/if}
