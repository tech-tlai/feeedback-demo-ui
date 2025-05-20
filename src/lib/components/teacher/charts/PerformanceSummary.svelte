<script>
	import { Card, ProgressIndicator } from '$lib';
	import { onMount } from 'svelte';
	import { selectedClassStore } from '$lib/stores/globalFilters.js';
	// Props
	export let className = 'Class 3 A';
	export let studentCount = 37;
	export let indicators = [
		{ label: 'Avg. Score', value: 61, period: 'Last 5 tests' },
		{ label: 'Attendance score', value: 65, period: 'Last 5 tests' },
		{ label: 'Pass Percentage', value: 82, period: 'Last 5 tests' }
	];

	let isLoading = true;
	let error = null;
	let isMounted = false;
	let unsubscribe;

	async function fetchPerformanceSummary() {
		isLoading = true;
		error = null;
		try {
			const { className, division, subject } = $selectedClassStore;
			const classSubject = `${className}${division}_${subject}`;
			const response = await fetch(`/apis/teacher/perf-summary/${classSubject}`);
			if (!response.ok) throw new Error('Failed to fetch performance summary');
			const data = await response.json();

			studentCount = data.studentCount || studentCount;
			indicators = data.indicators || indicators;
		} catch (err) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	}

	$: if (isMounted && $selectedClassStore) {
		fetchPerformanceSummary($selectedClassStore);
	}

	onMount(() => {
		isMounted = true;
	});
</script>

<Card>
	<div class="h-full flex flex-col justify-between">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-black text-sm font-bold">Performance Summary</h2>
		</div>
		{#if isLoading}
			<div class="p-4 text-center">Loading...</div>
		{:else if error}
			<div class="p-4 text-center text-red-500">{error}</div>
		{:else}
			<div>
				<h4 class="text-2xl font-bold text-accent-blue mb-2">
					Class: {$selectedClassStore.fullClassName?$selectedClassStore.fullClassName :''}
				</h4>
				<div class="flex items-center mb-8">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-gray-dark"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
						<circle cx="9" cy="7" r="4" />
						<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
						<path d="M16 3.13a4 4 0 0 1 0 7.75" />
					</svg>
					<span class="ml-2 text-sm text-gray-dark">{studentCount} Students</span>
				</div>
				<div class="space-y-6 mb-6">
					{#each indicators as indicator}
						<ProgressIndicator
							label={indicator.label}
							value={indicator.value}
							period={indicator.period}
						/>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</Card>
