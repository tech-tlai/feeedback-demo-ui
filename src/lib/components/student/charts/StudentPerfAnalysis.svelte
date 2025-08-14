<script>
	import { PerformanceAnalysis } from '$lib';
	import { onMount } from 'svelte';
	import { fetchApi } from '$lib/apiUtils.js';

	let isLoading = false;
	let error = null;
	export let perfData = {
		achievement: [],
		roomForImprovement: [],
		suggestions: []
	};

	// async function fetchPerformanceAnalysis(id) {
	// 	isLoading = true;
	// 	error = null;
	// 	try {
	// 		const data = await fetchApi(`/apis/student/perf-analysis/${id}`, {
	// 			action: 'fetch',
	// 			entity: 'performance analysis'
	// 		});
	// 		const { achievement, roomForImprovement, suggestions } = data;
	// 		perfData = {
	// 			achievement: achievement.feedback,
	// 			roomForImprovement: roomForImprovement.feedback,
	// 			suggestions: suggestions.feedback
	// 		};
	// 		console.log('perfData', perfData);
	// 	} catch (err) {
	// 		error = err.message;
	// 	} finally {
	// 		isLoading = false;
	// 	}
	// }

	onMount(() => {
		// Replace 'studentId' with the actual id as needed
		const studentId = '1';
		// fetchPerformanceAnalysis(studentId);
	});
</script>

{#if isLoading}
	<div class="p-4 text-center bg-white rounded-lg shadow-sm h-64 flex justify-center items-center">
		Loading Performance Analysis...
	</div>
{:else if error}
	<div
		class="p-4 text-center text-red-500 bg-white rounded-lg shadow-sm h-64 flex justify-center items-center"
	>
		{error}
	</div>
{:else if perfData}
	<PerformanceAnalysis
		roomForImprovement={perfData.roomForImprovement && perfData.roomForImprovement.feedback
			? perfData.roomForImprovement.feedback
			: []}
		suggestions={perfData.suggestions && perfData.suggestions.feedback
			? perfData.suggestions.feedback
			: []}
		achievement={perfData.achievement && perfData.achievement.feedback
			? perfData.achievement.feedback
			: []}
	/>
{/if}
