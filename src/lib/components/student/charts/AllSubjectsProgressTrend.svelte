<script>
	import { onMount } from 'svelte';
	import { ProgressTrendChart } from '$lib';
	import { formatDateDDMonthShortYear } from '$lib/utils';
	import { fetchApi } from '$lib/apiUtils.js';

	let examDates = [];
	let subjectData = {};
	let isLoading = true;
	let error = null;
	const STUDENT_ID = 1;

	onMount(async () => {
		try {
			const apiData = await fetchApi(`/apis/student/progress-trend/${STUDENT_ID}`, {
				action: 'fetch',
				entity: 'progress trend'
			});

			// Sorting the data by date in chronological order
			const sortedData = apiData.sort((a, b) => new Date(a.date) - new Date(b.date));

			// Extracting exam dates
			const uniqueDates = new Set(sortedData.map((item) => formatDateDDMonthShortYear(item.date)));
			examDates = Array.from(uniqueDates);
			// Constructing subjectData
			subjectData = sortedData.reduce((acc, item) => {
				if (!acc[item.subject]) {
					acc[item.subject] = [];
				}

				acc[item.subject].push({
					percentage: item.marksPercentage,
					total: item.totalMarks,
					obtained: item.marks,
					date: formatDateDDMonthShortYear(item.date)
				});
				return acc;
			}, {});
		} catch (err) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	});
</script>

{#if isLoading}
	<div class="p-4 text-center">Loading...</div>
{:else if error}
	<div class="p-4 text-center text-red-500">{error}</div>
{:else}
	<ProgressTrendChart title="Progress Trend" subjectFilter="All" {examDates} {subjectData} />
{/if}
