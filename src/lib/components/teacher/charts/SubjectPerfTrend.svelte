<script>
	import { ProgressTrendChart, SkelChartWidget } from '$lib';
	import { chatContextStore, selectedClassStore } from '$lib/stores/globalFilters.js';

	export let perfTrend=[];
	
	let examDates = [];
	let subjectData = {};
	let isLoading = false;
	let error = null;
	const title = 'Progress Trend';

	$: if (perfTrend && perfTrend.length > 0) {
		examDates = perfTrend.map((item) => item.date);
		subjectData = perfTrend.reduce((acc, item) => {
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

		console.log('examDates',examDates)
		console.log('subjectData',subjectData)
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

	// async function fetchProgressTrend() {
	// 	isLoading = true;
	// 	error = null;
	// 	try {
	// 		const { className, division, subject } = $selectedClassStore;
	// 		const classSubject = `${className}${division}_${subject}`;
	// 		const apiData = await fetchApi(`/apis/teacher/progress-trend/${classSubject}`, {
	// 			action: 'fetch',
	// 			entity: 'progress trend'
	// 		});
	//
	// 		const sortedData = apiData.sort((a, b) => new Date(a.date) - new Date(b.date));
	// 		examDates = sortedData.map((item) => item.date);
	// 		subjectData = sortedData.reduce((acc, item) => {
	// 			if (!acc[item.subject]) {
	// 				acc[item.subject] = [];
	// 			}
	// 			acc[item.subject].push({
	// 				percentage: item.marksPercentage,
	// 				total: item.totalMarks,
	// 				obtained: item.marks,
	// 				date: item.date
	// 			});
	// 			return acc;
	// 		}, {});
	// 	} catch (err) {
	// 		error = err.message;
	// 	} finally {
	// 		isLoading = false;
	// 	}
	// }

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
