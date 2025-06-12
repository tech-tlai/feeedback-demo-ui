<script>
	import { Datatable, SearchBar, LegacyDatatable } from '$lib';
	import { selectedClassStore, chatContextStore } from '$lib/stores/globalFilters.js';
	import { FilterIcon } from '$lib/svgComponents';
	import { getMarkColor } from '$lib/utils';
	import { fetchApi } from '$lib/apiUtils.js';

	import { onMount } from 'svelte';

	const chartTitle = 'Top Performers';
	export let studentData = [];
	let isLoading = false;
	let error = null;
	let searchValue = '';
	let isMounted = false;

	const markThresholds = {
		poor: 50,
		average: 70
	};

	function sendSearchValueToDatatable(e) {
		searchValue = e.detail;
	}

	let customRenderers = {
		percentage: (data) => {
			const percentage = data.percentage.toFixed(2);
			return `
      <div>
		<span class="inline-block px-3 py-1 rounded-full text-center min-w-[60px] ${getMarkColor(percentage, markThresholds)}"}>
				${percentage}
			</span>
		</div>
    `;
		}
	};

	let tableData = [];

	const tableHeadersDisplay = [
		{ key: 'rank', name: 'Rank', align: 'left', width: '10%' },
		{ key: 'name', name: 'Name', align: 'left' },
		{ key: 'marksObtained', name: 'Marks Obtained', width: '20%', align: 'left' },
		{ key: 'percentage', name: 'Marks (in %)', width: '25%', highlightValue: true }
	];

	function setContextInChatBox() {
		const context = {
			type: 'performance',
			title: `${$selectedClassStore ? `${$selectedClassStore.fullClassName} -` : ''} ${chartTitle}`
		};
		chatContextStore.set(context);
	}

	async function createTableData() {
		if (!studentData?.error) {
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
			console.log('tableData', tableData);
		} else {
			tableData = [];
		}
	}

	// async function fetchTopPerformers() {
	// 	try {
	// 		isLoading=true;
	// 		error=null;
	// 		const { className, division, subject } = $selectedClassStore;
	// 		const classSubject = `${className}${division}_${subject}`;
	// 		studentData = await fetchApi(`/apis/teacher/top-perf-students/${classSubject}`, {
	// 			action: 'fetch',
	// 			entity: 'top performers'
	// 		});
	// 	} catch (err) {
	// 		error = err.message;
	// 	} finally {
	// 		isLoading = false;
	// 	}
	// 	createTableData();
	// }

	$: if (isMounted && $selectedClassStore) {
		createTableData();
	}

	onMount(() => {
		isMounted = true;
	});
</script>

<div class="bg-white rounded-lg shadow-md overflow-hidden h-full text-sm">
	<div class="p-4 space-y-4">
		<div class="flex justify-between items-center">
			<h4 class="text-sm font-bold text-black">{chartTitle}</h4>

			<button class="flex gap-2 items-center text-link" on:click={setContextInChatBox}>
				Explore with AI <FilterIcon size={16} /></button
			>
		</div>

		<div class="chart-meta text-gray-dark text-sm flex gap-4">
			<span>{$selectedClassStore.fullClassName ? $selectedClassStore.fullClassName : ''}</span>
			<span>Total: {studentData.length}</span>
		</div>
	</div>

	{#if isLoading}
		<p class="p-4 text-center">Loading...</p>
	{:else if error}
		<p class="p-4 text-center text-red-500">{error}</p>
	{:else}
		<!-- <Datatable data={studentData} {headers} headerTheme="positive" itemsPerPage={5} /> -->
		<div class="mb-4 px-4">
			<SearchBar
				on:handleSearchValue={sendSearchValueToDatatable}
				placeholder={'Search by name'}
				searchButton={false}
			/>
		</div>
		<LegacyDatatable
			tableData={studentData}
			{tableHeadersDisplay}
			entriesPerPage={5}
			rowHeight="normal"
			headerTheme="positive"
			searchParameter="name"
			{searchValue}
			{customRenderers}
		/>
	{/if}
</div>
