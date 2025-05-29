<script>
	import { PerformanceAnalysis } from '$lib';
	import { onMount } from 'svelte';
	import { selectedClassStore, chatContextStore } from '$lib/stores/globalFilters.js';
	import { fetchApi } from '$lib/apiUtils.js';

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
			const data = await fetchApi(`/apis/teacher/perf-analysis/${classSubject}`, {
				action: 'fetch',
				entity: 'performance analysis'
			});
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
	<div class="p-4 text-center bg-white h-64 rounded-lg shadow-sm flex justify-center items-center">Loading...</div>
{:else if error}
	<div class="p-4 text-center text-red-500 bg-white h-64 rounded-lg shadow-sm flex justify-center items-center">{error}</div>
{:else if perfData}
	<PerformanceAnalysis
		roomForImprovement={perfData.roomForImprovement}
		suggestions={perfData.suggestions}
		achievement={perfData.achievement}
	/>
{/if}
