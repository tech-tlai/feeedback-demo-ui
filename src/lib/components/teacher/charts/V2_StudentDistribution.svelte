<script>
	import { onMount } from 'svelte';
	import { Card, DrilldownChart } from '$lib';
	import V2DrillDown from '$lib/components/charts/V2_DrillDown.svelte';
	import { selectedClassStore, chatContextStore } from '$lib/stores/globalFilters.js';
	import { FilterIcon } from '$lib/svgComponents';
	import { fetchApi } from '$lib/apiUtils.js';

	const chartTitle = 'Student distribution';
	let transformedData = null;
	let isLoading = false;
	export let error = null;
	export let sectionWiseData = {}
	let isMounted = false;

	function setContextInChatBox() {
		const context = {
			type: 'performance',
			title: `${$selectedClassStore ? `${$selectedClassStore} -` : ''} ${chartTitle}`
		};
		chatContextStore.set(context);
	}

	$: transformedData = (() => {
		if (!sectionWiseData || !sectionWiseData.sectionData || !$selectedClassStore.className) return null;

		// Find the section object for the selected class (e.g., "7A")
		const selectedSection = sectionWiseData.sectionData.find(
			(sec) => sec.section === $selectedClassStore.className
		);
		if (!selectedSection) return null;

		// Map all scoreRanges to ensure 0 scores are included
		return {
			name: 'Student Distribution',
			children: (sectionWiseData.scoreRanges || []).map((range) => {
				const score = (selectedSection.scores || []).find(s => s.scoreRange === range.name);
				return {
					name: range.name,
					value: score ? score.studentProportion : 0,
					unit: '%'
				};
			})
		};
	})();


	// async function fetchStudentDistribution(){
	//     try {
	//         isLoading=true;
	// 		error=null;
	// 		const { className, division, subject } = $selectedClassStore;
	// 		const classSubject = `${className}${division}_${subject}`;
	// 		const data = await fetchApi(`/apis/teacher/student-distribution/3A_English`, {
	// 			action: 'fetch',
	// 			entity: 'student distribution'
	// 		});

	//         transformedData = {
	//             name: 'Student Distribution',
	//             children: Object.entries(data.scoreRanges).map(([range, details]) => ({
	//                 name: range,
	//                 children: details.students.map(student => ({
	//                     name: student.name,
	//                     value: details.studentCount
	//                 }))
	//             }))
	//         };
	//         console.log('transformedData',transformedData)
	//     } catch (err) {
	//         error = err.message;
	//     } finally {
	//         isLoading = false;
	//     }
	// }

	// $: if (isMounted && $selectedClassStore) {
	// 	fetchStudentDistribution();
	// }

	// onMount(async () => {
	//     isMounted=true;

	// });
</script>

<Card>
	<div class="flex justify-between items-center text-sm mb-4">
		<h4 class="text-black text-sm font-bold">{chartTitle}</h4>
		<button class="flex gap-2 items-end text-link font-medium" on:click={setContextInChatBox}>
			Explore with AI <FilterIcon size={16} /></button
		>
	</div>
	<div class="chart-meta text-gray-dark text-sm mb-4 flex gap-4">
		<span>{$selectedClassStore.fullClassName ? $selectedClassStore.fullClassName : ''}</span>
		<span>Date: {new Date().toLocaleDateString()}</span>
	</div>

	{#if isLoading}
		<div class="p-4 text-center">Loading...</div>
	{:else if error}
		<div class="p-4 text-center text-red-500 h-full flex items-center justify-center text-sm">{error}</div>
	{:else}
		<V2DrillDown data={transformedData} />
	{/if}
</Card>
