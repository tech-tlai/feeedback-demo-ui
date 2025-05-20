<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import {Card} from '$lib';
	import { chatContextStore, selectedClassStore } from '$lib/stores/globalFilters.js';
	import { FilterIcon } from '$lib/svgComponents';

	import { clickOutside } from '$lib/utils';
	import { fly } from 'svelte/transition';

	// Props with default values
	export let title = 'Progress Trend';
	export let dateRange = "Nov '24 - Feb '25";
	export let subjectFilter = 'English';
	export let examDates = ['12-Nov-24'];
	export let subjectData = {};

	let isMounted = false;

	const dispatch = createEventDispatcher();
	// Update dateRange to dynamically get the value of the first and last item in examDates array
	$: dateRange =
		examDates.length > 0
			? `${examDates[0]} - ${examDates[examDates.length - 1]}`
			: 'No exams available';

	// DOM element for chart
	let chartCanvas;

	// Chart instance
	let chart;

	// Colors for subjects
	const subjectColors = {
		Mathematics: '#4CAF50',
		English: '#9C27B0',
		Hindi: '#2196F3',
		'General Science': '#FFEB3B',
		'Social Science': '#F44336'
	};

	function setContextInChatBox() {
		const { className, division, subject } = $selectedClassStore;
		const context = {
			type: 'performance',
			// title: 'Progress Trend',
			title: `${$selectedClassStore ? `${className}${division} ${subject} -` : ''} ${title}`
		};
		chatContextStore.set(context);
	}

	// Create the Progress Trend chart
	function createChart() {
		if (!chartCanvas) return;

		if (chart) chart.destroy();

		const ctx = chartCanvas.getContext('2d');

		const datasets = Object.keys(subjectData).flatMap((subject) => {
			const normalized = examDates.map((date) => {
				const record = subjectData[subject].find((d) => d.date === date);
				return record ? { ...record } : null;
			});

			return [
				{
					label: `${subject} - Your Score`,
					data: normalized.map((d) => (d ? d.studentScorePercentage : null)),
					borderColor: subjectColors[subject] || '#000',
					backgroundColor: subjectColors[subject] || '#000',
					borderWidth: 2,
					pointRadius: 3,
					spanGaps: true
				},
				{
					label: `${subject} - 75th Percentile`,
					data: normalized.map((d) => (d ? d.percentile75 : null)),
					borderColor: 'rgba(75, 192, 192, 1)',
					backgroundColor: 'rgba(75, 192, 192, 0.2)',
					borderDash: [5, 5],
					borderWidth: 2,
					pointRadius: 3,
					spanGaps: true
				},

				{
					label: `${subject} - 50th Percentile`,
					data: normalized.map((d) => (d ? d.percentile50 : null)),
					borderColor: 'rgba(54, 162, 235, 1)',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					borderDash: [5, 5],
					borderWidth: 2,
					pointRadius: 3,
					spanGaps: true
				},
				{
					label: `${subject} - 25th Percentile`,
					data: normalized.map((d) => (d ? d.percentile25 : null)),
					borderColor: 'rgba(255, 99, 132, 1)',
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					borderDash: [5, 5],
					borderWidth: 2,
					pointRadius: 3,
					spanGaps: true
				}
			];
		});

		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: examDates,
				datasets: datasets
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: false,
						min: 20,
						max: 100,
						title: {
							display: true,
							text: 'Marks (%)'
						},
						grid: {
							color: 'rgba(200, 200, 200, 0.3)'
						}
					},
					x: {
						title: {
							display: true,
							text: 'Date of Exam'
						},
						grid: {
							color: 'rgba(200, 200, 200, 0.3)'
						},
						ticks: {
							maxRotation: 45,
							minRotation: 0
						}
					}
				},
				plugins: {
					legend: {
						position: 'top',
						align: 'center',
						labels: {
							boxWidth: 12,
							usePointStyle: true,
							pointStyle: 'line'
						}
					},
					tooltip: {
						enabled: true,
						mode: 'index',
						intersect: true
					}
				}
			}
		});
	}

	let showFilterDropdown = false;
	function handleFilterClick(e) {
		showFilterDropdown = true;
		// dispatch('percentileFilter')
	}
	function closeFilter(e) {
		showFilterDropdown = false;
		// dispatch('percentileFilter')
	}

	$: if (isMounted && subjectData && examDates) {
		createChart();
	}

	// Initialize chart on component mount
	onMount(() => {
		isMounted = true;

		// Cleanup on component destroy
		return () => {
			if (chart) chart.destroy();
		};
	});
</script>

<Card>
	<div class="flex justify-between items-center text-sm mb-4">
		<h4 class=" font-semibold text-black">{title}</h4>
		<div class="relative">
			<div class="flex gap-2 items-center text-link font-medium">
				<button on:click={setContextInChatBox}> Explore with AI</button>
				<button on:click={handleFilterClick} class="text-black"
					><FilterIcon size={16} fillColor={showFilterDropdown ? 'bg-black' : 'none'} /></button
				>
			</div>
			{#if showFilterDropdown}
				<div
					class={`absolute right-0 top-8 w-[250px] `}
					transition:fly={{ y: -10, duration: 300 }}
					use:clickOutside={closeFilter}
				>
					<slot name="filter" close={closeFilter}></slot>
				</div>
			{/if}
		</div>
	</div>
	<div class="chart-meta text-gray-dark mb-4">
		<span>Date: {dateRange}</span>
		<span>Subject: {subjectFilter}</span>
	</div>

	<div class="chart-container">
		<canvas bind:this={chartCanvas}></canvas>
	</div>
</Card>

<style>
	.chart-meta {
		display: flex;
		gap: 20px;
		font-size: 14px;
		color: #666;
	}

	.chart-container {
		height: 300px;
		background-color: #fff9f5;
		border-radius: 8px;
		padding: 8px;
	}
</style>
