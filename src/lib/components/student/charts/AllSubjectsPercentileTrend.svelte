<script>
	import { PercentileTrendChart, FilterDropdown, Button } from '$lib';
	import { onMount } from 'svelte';
	import { formatDateDDMonthShortYear } from '$lib/utils';

	let examDates = [];
	let subjectData = {};
	let isLoading = true;
	let error = null;
	const STUDENT_ID = 1;
	let selectedLanguage = 'English';
	let tempLanguage = 'English'; // temporary variable to store value since fitler hasnt been abstracted into a component yet
	let isMounted = false;

	async function fetchPercentileTrend() {
		try {
			const response = await fetch(
				`/apis/student/percentile-trend/${STUDENT_ID}?subject=${selectedLanguage}`
			);
			if (!response.ok) {
				throw new Error('Failed to fetch progress trend data');
			}
			const apiData = await response.json();

			// Sorting the data by date in chronological order
			const sortedData = apiData.sort((a, b) => new Date(a.date) - new Date(b.date));

			// // Extracting exam dates
			// examDates = sortedData.map((item) => item.date);
			const uniqueDates = new Set(sortedData.map((item) => formatDateDDMonthShortYear(item.date)));
			examDates = Array.from(uniqueDates);

			// Constructing subjectData
			subjectData = sortedData.reduce((acc, item) => {
				if (!acc[item.subject]) {
					acc[item.subject] = [];
				}
				acc[item.subject].push({
					percentage: item.marksPercentage,
					studentScorePercentage: item.studentScorePercentage,
					percentile25: item.percentile25,
					percentile50: item.percentile50,
					percentile75: item.percentile75,
					date: formatDateDDMonthShortYear(item.date)
				});
				return acc;
			}, {});
		} catch (err) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	}


	function handleApplyFilter(e) {
		selectedLanguage = tempLanguage;
	}

	$: if (isMounted && selectedLanguage) {
		fetchPercentileTrend();
	}

	onMount(async () => {
		isMounted = true;
	});
</script>

{#if isLoading}
	<div class="p-4 text-center">Loading...</div>
{:else if error}
	<div class="p-4 text-center text-red-500">{error}</div>
{:else}
	<PercentileTrendChart
		title="Score and Percentile trend subject wise"
		{examDates}
		{subjectData}
		subjectFilter={selectedLanguage}
	>
		<FilterDropdown slot="filter" let:close>
			<!-- Subject Dropdown -->
			<div>
				<label for="subject" class="block text-sm text-gray-500 mb-1">Select subject:</label>
				<select
					id="subject"
					class="w-full border rounded px-3 py-2 text-black"
					bind:value={tempLanguage}
				>
					<option value="English">English</option>
					<option value="Maths">Maths</option>
					<option value="Hindi">Hindi</option>
					<option value="Science">Science</option>
					<option value="Social">Social Science</option>
				</select>
			</div>
			<Button
				customClass="bg-accent-blue py-1 px-2"
				on:click={() => {
					handleApplyFilter();
					close();
				}}>Apply</Button
			>
		</FilterDropdown>
	</PercentileTrendChart>
{/if}
