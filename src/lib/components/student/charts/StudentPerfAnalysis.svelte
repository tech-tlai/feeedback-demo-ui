<script>
	import { PerformanceAnalysis } from '$lib';
	import { onMount } from 'svelte';

	let isLoading = false;
	let error = null;
	let perfData = {
		achievement: [],
		roomForImprovement: [],
		suggestions: []
	};

	async function fetchPerformanceAnalysis(id) {
		isLoading = true;
		error = null;
		try {
			const response = await fetch(`/apis/student/perf-analysis/${id}`);
			if (!response.ok) throw new Error('Failed to fetch performance analysis');
			const data = await response.json();
			const { achievement, roomForImprovement, suggestions } = data;
			perfData = {
				achievement: achievement.feedback,
				roomForImprovement: roomForImprovement.feedback,
				suggestions: suggestions.feedback
			};
			console.log('perfData', perfData);
		} catch (err) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		// Replace 'studentId' with the actual id as needed
		const studentId = '1';
		fetchPerformanceAnalysis(studentId);
	});
</script>

{#if isLoading}
	<div class="p-4 text-center">Loading...</div>
{:else if error}
	<div class="p-4 text-center text-red-500">{error}</div>
{:else if perfData}
	<PerformanceAnalysis
		roomForImprovement={perfData.roomForImprovement}
		suggestions={perfData.suggestions}
		achievement={perfData.achievement}
	/>
{/if}
