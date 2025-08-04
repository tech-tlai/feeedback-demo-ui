<script>
	import { onMount } from 'svelte';
	import { ProgressTrendChart } from '$lib';
	import { formatDateDDMonthShortYear } from '$lib/utils';
	import { fetchApi } from '$lib/apiUtils.js';

	let examDates = [];
	export let subjectData = {};
	let isLoading = false;
	export let error = null;
	// const STUDENT_ID = 1;

	// onMount(async () => {
	// 	try {
	// 		const apiData = await fetchApi(`/apis/student/progress-trend/${STUDENT_ID}`, {
	// 			action: 'fetch',
	// 			entity: 'progress trend'
	// 		});

	// 		// Sorting the data by date in chronological order
	// 		const sortedData = apiData.sort((a, b) => new Date(a.date) - new Date(b.date));

	// 		// Extracting exam dates
	// 		const uniqueDates = new Set(sortedData.map((item) => formatDateDDMonthShortYear(item.date)));
	// 		examDates = Array.from(uniqueDates);
	// 		// Constructing subjectData
	// 		subjectData = sortedData.reduce((acc, item) => {
	// 			if (!acc[item.subject]) {
	// 				acc[item.subject] = [];
	// 			}

	// 			acc[item.subject].push({
	// 				percentage: item.marksPercentage,
	// 				total: item.totalMarks,
	// 				obtained: item.marks,
	// 				date: formatDateDDMonthShortYear(item.date)
	// 			});
	// 			return acc;
	// 		}, {});
	// 	} catch (err) {
	// 		error = err.message;
	// 	} finally {
	// 		isLoading = false;
	// 	}
	// });
	// Transform subjectData to ProgressTrendChart format
	$: transformedSubjectData = (() => {
		if (!Array.isArray(subjectData)) return {};
		return subjectData.reduce((acc, subj) => {
			acc[subj.subject] = (subj.exams || []).map(exam => ({
				percentage: exam.marksPercentage,
				total: exam.totalMarks,
				obtained: exam.marks,
				date: formatDateDDMonthShortYear(exam.date)
			}));
			return acc;
		}, {});
	})();

	$: examDates = (() => {
		if (!Array.isArray(subjectData)) return [];
		const allDates = subjectData.flatMap(subj => (subj.exams || []).map(exam => formatDateDDMonthShortYear(exam.date)));
		return Array.from(new Set(allDates)).sort((a, b) => new Date(a) - new Date(b));
	})();
</script>

{#if isLoading}
	<div class="p-4 text-center">Loading...</div>
{:else if error}
	<div class="p-4 text-center text-red-500">{error}</div>
{:else}
	<ProgressTrendChart title="Progress Trend" subjectFilter="All" {examDates} {transformedSubjectData} />
{/if}
