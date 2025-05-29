<script>
	import { ProgressTrendChart, SkelChartWidget } from '$lib';
	import { onMount } from 'svelte';
	import { chatContextStore, selectedClassStore } from '$lib/stores/globalFilters.js';
	import { fetchApi } from '$lib/apiUtils.js';

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
			const apiData = await fetchApi(`/apis/teacher/progress-trend/${classSubject}`, {
				action: 'fetch',
				entity: 'progress trend'
			});

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
	<!-- <div class="p-4 text-center bg-white rounded-lg h-full">Loading...</div> -->
	<SkelChartWidget />
{:else if error}
	<div class="p-4 text-center text-red-500 bg-white rounded-lg h-full">{error}</div>
{:else}
	<ProgressTrendChart
		{title}
		subjectFilter={$selectedClassStore.subject}
		{examDates}
		{subjectData}
		on:setContextInChatBox={setContextInChatBox}
	/>
{/if}
