<script>
	import { PerformanceAnalysis } from '$lib';
	import { onMount } from 'svelte';
	import { selectedClassStore, chatContextStore } from '$lib/stores/globalFilters.js';

	let isLoading = false;
	let error = null;
	let perfData = {
		achievement: [],
		roomForImprovement: [],
		suggestions: []
	};
	let isMounted = false;

	async function fetchPerformanceAnalysis() {
		isLoading = true;
		error = null;
		try {
			const { className, division, subject } = $selectedClassStore;
			const classSubject = `${className}${division}_${subject}`;
			const response = await fetch(`/apis/teacher/perf-analysis/${classSubject}`);
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

	
	$: if (isMounted && $selectedClassStore) {
		fetchPerformanceAnalysis();
	}

	onMount(async () => {
		isMounted = true;
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
