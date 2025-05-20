<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let classNames = [];
	export let scoreRanges = [];
	export let data = [];

	let chartCanvas;
	let chart;

	// Generate a list of colors for datasets (expandable)
	const backgroundColors = [
		'rgba(173, 216, 255, 0.7)', // light blue
		'rgba(187, 255, 132, 0.7)', // light green
		'rgba(255, 195, 113, 0.7)', // light orange
		'rgba(255, 140, 148, 0.7)', // light red
		'rgba(192, 179, 255, 0.7)'  // light purple
	];
	const borderColors = backgroundColors.map(color => color.replace('0.7', '1'));

	onMount(() => {
		// Dynamically build datasets
		const datasets = classNames.map((className, index) => ({
			label: className,
			data: data[index],
			backgroundColor: backgroundColors[index % backgroundColors.length],
			borderColor: borderColors[index % borderColors.length],
			borderWidth: 1
		}));

		chart = new Chart(chartCanvas, {
			type: 'bar',
			data: {
				labels: scoreRanges,
				datasets
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
						max: 100,
						title: {
							display: true,
							text: 'Students (%)',
							font: { size: 14 }
						},
						grid: { color: 'rgba(200, 200, 200, 0.3)' },
						ticks: { font: { size: 12 } }
					},
					x: {
						title: {
							display: true,
							text: 'Score (%)',
							font: { size: 14 }
						},
						grid: { display: false },
						ticks: { font: { size: 12 } }
					}
				},
				plugins: {
					legend: {
						position: 'bottom',
						labels: { boxWidth: 15, padding: 15, font: { size: 14 } }
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								return `${context.dataset.label}: ${context.raw}%`;
							}
						}
					}
				}
			}
		});

		return () => chart?.destroy();
	});
</script>

<div class="h-80 w-full">
	<canvas bind:this={chartCanvas}></canvas>
</div>
