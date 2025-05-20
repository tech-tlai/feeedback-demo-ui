<script>
	import { PerfHistoryCard, SectionTitle } from '$lib';
	import { onMount } from 'svelte';
	import ErrorComponent from '$lib/components/ErrorComponent.svelte';
	import SkelClassSummary from '$lib/components/loadingSkeletons/SkelClassSummary.svelte';

	let perfHistory = [];
	let isLoading = true;
	let error = null;
	const STUDENT_ID = 1;
	onMount(async () => {
		try {
			const response = await fetch(`/apis/student/performance-history/${STUDENT_ID}`);
			if (!response.ok) {
				throw new Error('Failed to fetch performance history');
			}
			perfHistory = await response.json();
		} catch (err) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	});

	// Function to handle details click
	function handleDetailsClick(className) {
		console.log(`Details clicked for ${className}`);
	}
</script>

<div class="flex w-full justify-center my-6">
	<SectionTitle title="Performance History" />
</div>

{#if isLoading}
	<SkelClassSummary />
{:else if error}
	<ErrorComponent message={error} />
{:else}
	<div class="grid grid-cols-[repeat(auto-fit,minmax(min(250px,100%),275px))] gap-5">
		{#each perfHistory as classData}
			<PerfHistoryCard
				className={classData.className}
				badges={classData.badges}
				achievements={classData.achievements}
				goalsAchieved={classData.goalsAchieved}
				totalGoals={classData.totalGoals}
				overallRank={classData.overallRank}
				overallScore={classData.overallScore}
				onDetailsClick={() => handleDetailsClick(classData.className)}
			/>
		{/each}
	</div>
{/if}
