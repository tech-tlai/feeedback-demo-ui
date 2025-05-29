<script>
	import { Datatable, SearchBar, LegacyDatatable } from '$lib';
	import { onMount } from 'svelte';
	import { fetchApi } from '$lib/apiUtils.js';

	let searchValue = '';
	let goalsData = [];
	let isLoading = true;
	let error = null;
	const STUDENT_ID=1

	onMount(async () => {
		try {
			goalsData = await fetchApi(`/apis/student/goals/current-goals/${STUDENT_ID}`, {
				action: 'fetch',
				entity: 'current goals'
			});
		} catch (err) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	});

	function sendSearchValueToDatatable(e) {
		searchValue = e.detail;
	}

	// Custom headers configuration
	const headers = [
		{ key: 'subject', name: 'Subject', align: 'left' },
		{ key: 'goalType', name: 'Goal Type', align: 'left' },
		{ key: 'goalDescr', name: 'Goal Description' },
		{ key: 'targetExam', name: 'Target Exam' }
	];
</script>

<div class="bg-white rounded-lg shadow-md overflow-hidden">
	<div class="p-4 space-y-4">
		<h4 class="text-sm font-bold text-black">Current Goals</h4>

		{#if isLoading}
			<p>Loading Current Goals...</p>
		{:else if error}
			<p class="text-red-500">Error: {error}</p>
		{:else}
			<div class="chart-meta text-gray-dark text-sm flex gap-4">
				<span>Total: {goalsData.length}</span>
			</div>
			<div class="mb-4 px-4">
				<SearchBar
					on:handleSearchValue={sendSearchValueToDatatable}
					placeholder={'Search by subject'}
					searchButton={false}
				/>
			</div>
			<LegacyDatatable
				tableData={goalsData}
				tableHeadersDisplay={headers}
				entriesPerPage={5}
				rowHeight="normal"
				headerTheme="positive"
				{searchValue}
			/>
		{/if}
	</div>
</div>
