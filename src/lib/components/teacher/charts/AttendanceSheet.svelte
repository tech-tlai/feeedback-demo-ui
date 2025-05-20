<script>
	import { LegacyDatatable, SearchBar } from '$lib';
	import { selectedClassStore } from '$lib/stores/globalFilters.js';
	import { onMount } from 'svelte';
	import { getMarkColor } from '$lib/utils';

	let studentData = [];
	let searchValue = '';
	let headers = [
		{ key: 'name', name: 'Name', align: 'left', width: '60%' },
		{
			key: 'percentage',
			name: 'Attendance(%)',
			align: 'center',
			highlightValue: true,
			width: '40%'
		}
	];
	const markThresholds = {
		poor: 50,
		average: 70
	};

	let tableData = [];

	let isLoading = true;
	let error = null;

	let customRenderers = {
		percentage: (data) => `
      <div>
		<span class="inline-block px-3 py-1 rounded-full text-center min-w-[60px] ${getMarkColor(data.percentage, markThresholds)}"}>
				${data.percentage}
			</span>
		</div>
    `
	};

	async function createTableData() {
		if (!studentData?.error)
			// Format data for display
			tableData = studentData?.map((student) => ({
				present: student?.present,
				total: student?.total,
				name: student?.name,
				rank: student?.rank,
				percentage: student?.percentage
			}));
		else {
			tableData = [];
		}
	}

	function sendSearchValueToDatatable(e) {
		searchValue = e.detail;
	}

	let isMounted = false;

	async function fetchAttendance() {
		try {
			isLoading=true;
			const { className, division, subject } = $selectedClassStore;
			const classSubject = `${className}${division}_${subject}`;
			const response = await fetch(`/apis/teacher/attendance/${classSubject}`);
			if (!response.ok) {
				throw new Error('Failed to fetch attendance data');
			}
			studentData = await response.json();
			
		} catch (err) {
			error = err.message;
		} finally {
			isLoading = false;
		}
		createTableData();
	}

	$: if (isMounted && $selectedClassStore) {
		fetchAttendance();
	}

	onMount(async () => {
		isMounted = true;
	});
</script>

<div class="bg-white rounded-lg shadow-md overflow-hidden h-full">
	<div class="p-4 space-y-4">
		<h4 class="text-sm font-bold text-black">Attendance Sheet</h4>

		<div class="chart-meta text-gray-dark text-sm flex gap-4">
			<span>{$selectedClassStore.fullClassName ?$selectedClassStore.fullClassName :''}</span>
			<span>Total: {studentData.length}</span>
		</div>
	</div>

	{#if isLoading}
		<p class="p-4 text-center">Loading...</p>
	{:else if error}
		<p class="p-4 text-center text-red-500">{error}</p>
	{:else}
		<div class="mb-4 px-4">
			<SearchBar
				on:handleSearchValue={sendSearchValueToDatatable}
				placeholder={'Search by name'}
				searchButton={false}
			/>
		</div>
		<LegacyDatatable
			tableData={studentData}
			tableHeadersDisplay={headers}
			entriesPerPage={5}
			rowHeight="normal"
			headerTheme="neutral"
			searchParameter="name"
			{searchValue}
			{customRenderers}
		/>
	{/if}
</div>
