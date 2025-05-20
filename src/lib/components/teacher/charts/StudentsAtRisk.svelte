<script>
	import { onMount } from 'svelte';
	import { Datatable, SearchBar, LegacyDatatable } from '$lib';
	import { selectedClassStore, chatContextStore } from '$lib/stores/globalFilters.js';
	import { FilterIcon } from '$lib/svgComponents';
	import { getMarkColor } from '$lib/utils';

	const chartTitle = 'Students at Risk';
	let studentData = [];
	let isLoading = true;
	let error = null;
	let searchValue = '';
	let isMounted = false;

	const markThresholds = {
		poor: 50,
		average: 70
	};

	let tableData = [];

	const headers = [
		{ key: 'rank', name: 'Rank', align: 'left', width: '10%' },
		{ key: 'name', name: 'Name', align: 'left' },
		{ key: 'total', name: 'Total Marks', width: '15%' },
		{ key: 'marksObtained', name: 'Marks Obtained', width: '15%' },
		{ key: 'percentage', name: 'Marks (in %)', align: 'center', highlightValue: true, width: '15%' }
	];

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
				...student,
				marksObtained: student?.marksObtained,
				total: student?.total,
				subject: student?.subject,
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

	function setContextInChatBox() {
		const context = {
			type: 'performance',
			title: `${$selectedClassStore ? `${$selectedClassStore} -` : ''} ${chartTitle}`
		};
		chatContextStore.set(context);
	}

	async function fetchStudentsAtRisk() {
		try {
			const { className, division, subject } = $selectedClassStore;
			const classSubject = `${className}${division}_${subject}`;
			const response = await fetch(`/apis/teacher/students-at-risk/${classSubject}`);
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			const data = await response.json();
			studentData = data;
			createTableData();
		} catch (err) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	}

	$: if (isMounted && $selectedClassStore) {
		fetchStudentsAtRisk();
	}

	onMount(async () => {
		isMounted = true;
	});
</script>

<div class="bg-white rounded-lg shadow-md overflow-hidden h-full text-sm">
	<div class="p-4 space-y-4">
		<div class="flex justify-between items-center">
			<h4 class="text-sm font-semibold text-black">Students at Risk</h4>
			<button class="flex gap-2 items-center text-link font-medium" on:click={setContextInChatBox}>
				Explore with AI <FilterIcon size={16} /></button
			>
		</div>

		<div class="chart-meta text-gray-dark text-sm flex gap-4">
			<span>{$selectedClassStore.fullClassName ?$selectedClassStore.fullClassName :''}</span>
			<span>Total: {studentData.length}</span>
		</div>
	</div>

	{#if isLoading}
		<div class="p-4 text-center">Loading...</div>
	{:else if error}
		<div class="p-4 text-center text-red-500">{error}</div>
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
			headerTheme="negative"
			searchParameter="name"
			{searchValue}
			{customRenderers}
		/>
	{/if}
</div>
