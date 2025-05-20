<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { Card } from '$lib';
	import { chatContextStore, selectedClassStore } from '$lib/stores/globalFilters.js';
	import { FilterIcon } from '$lib/svgComponents';

	// Props with default values
	export let title = 'Progress Trend';
	export let dateRange = "Nov '24 - Feb '25";
	export let subjectFilter = 'All';
	export let examDates = ['12-Nov-24'];
	export let subjectData = {
		English: [65, 70, 68, 53, 65, 72, 85]
		// Mathematics: [80, 85, 82, 87, 80, 78],
		// Hindi: [72, 75, 72, 85, 83, 80, 75],
		// 'General Science': [68, 70, 75, 80, 82, 78],
		// 'Social Science': [70, 72, 68, 65, 70, 75]
	};

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
		Science: '#FFEB3B',
		'Social Science': '#F44336'
	};

	function setContextInChatBox() {
		// const {className, division, subject} = $selectedClassStore
		// const context = {
		// 	type: 'performance',
		// 	// title: 'Progress Trend',
		// 		title:`${$selectedClassStore?`${className}${division} ${subject} -`:''} ${title}`,

		// };
		// chatContextStore.set(context);
		dispatch('setContextInChatBox', { type: 'performance' });
	}

	function createChart() {
		if (!chartCanvas) return;

		const ctx = chartCanvas.getContext('2d');

		// Prepare datasets
		// const datasets = Object.keys(subjectData).map((subject) => ({
		// 	label: subject,
		// 	data: subjectData[subject],
		// 	borderColor: subjectColors[subject],
		// 	backgroundColor: subjectColors[subject],
		// 	tension: 0.3,
		// 	borderWidth: 2,
		// 	pointRadius: 3
		// }));

		//verion 2
		// const datasets = Object.keys(subjectData)?.map((subject) => ({
		// 	label: subject,
		// 	data: subjectData[subject].map((d) => d.percentage), // use provided percentage
		// 	meta: subjectData[subject], // store obtained/total for tooltip
		// 	borderColor: subjectColors[subject],
		// 	backgroundColor: subjectColors[subject],
		// 	tension: 0.3,
		// 	borderWidth: 2,
		// 	pointRadius: 3
		// }));

		//version 3

		const datasets = Object.keys(subjectData).map((subject) => {
			// Map examDates => get data OR null
			const normalized = examDates.map((date) => {
				const record = subjectData[subject].find((d) => d.date === date);
				return record ? { ...record } : null; // null for no exam
			});

			return {
				label: subject,
				data: normalized.map((d) => (d ? d.percentage : null)),
				meta: normalized,
				borderColor: subjectColors[subject],
				backgroundColor: subjectColors[subject],
				tension: 0.3,
				borderWidth: 2,
				pointRadius: 3,
				spanGaps: true // <- ensures lines don't connect across nulls
			};
		});
		// Create chart
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
							maxRotation: 45, // degrees
							minRotation: 0 // degrees (start rotating early)
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
							pointStyle: 'circle'
						}
					},
					tooltip: {
						enabled: true, // default is true anyway
						mode: 'index',
						intersect: true,
						callbacks: {
							label: function (context) {
								// const subject = context.dataset.label;
								// const index = context.dataIndex;
								// const { obtained, total, percentage } = context.dataset.meta[index];

								// return `${subject}: ${obtained}/${total} marks (${percentage}%)`;
								const subject = context.dataset.label;
								const index = context.dataIndex;
								const metaItem = context.dataset.meta[index];

								if (!metaItem) {
									return `${subject}: No exam`;
								}

								const { obtained, total, percentage } = metaItem;
								return `${subject}: ${obtained}/${total} marks (${percentage}%)`;
							}
						}
					}
				}
			}
		});
	}

	// Initialize chart on component mount
	onMount(() => {
		createChart();

		// Cleanup on component destroy
		return () => {
			if (chart) chart.destroy();
		};
	});
</script>

<Card>
	<div class="chart-header text-sm">
		<div>
			<h4 class=" font-bold text-black mb-4">{title}</h4>
			<div class="chart-meta text-gray-dark">
				<!-- <span>{$selectedClassStore.fullClassName}</span> -->
				<span>Date: {dateRange}</span>
				<span>Subject: {subjectFilter}</span>
			</div>
		</div>
		<button class="flex gap-2 items-center text-link font-medium" on:click={setContextInChatBox}>
			Explore with AI <FilterIcon size={16} /></button
		>
	</div>
	<div class="chart-container">
		<canvas bind:this={chartCanvas}></canvas>
	</div>
</Card>

<style>
	/* .chart-card {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      padding: 16px;
      width: 100%;
    }
     */
	.chart-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 16px;
	}

	h2 {
		font-size: 18px;
		font-weight: 600;
		color: #333;
		margin: 0 0 8px 0;
	}

	.chart-meta {
		display: flex;
		gap: 20px;
		font-size: 14px;
		color: #666;
	}

	.explore-button {
		display: flex;
		align-items: center;
		gap: 8px;
		background: none;
		border: none;
		color: #4285f4;
		font-size: 14px;
		cursor: pointer;
	}

	.chart-container {
		height: 300px;
		background-color: #fff9f5;
		border-radius: 8px;
		padding: 8px;
	}
</style>
