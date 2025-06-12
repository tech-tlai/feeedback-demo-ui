<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	// export let colorScheme = d3.schemePastel1;
	export let colorScheme = [
  'rgba(173, 216, 255, 0.7)', // light blue
  'rgba(187, 255, 132, 0.7)', // light green
  'rgba(255, 195, 113, 0.7)', // light orange
  'rgba(255, 140, 148, 0.7)'  // light red
]

	let data = {
		name: 'Student Distribution',
		children: [
			{ name: '0-35%', value: '15', unit:"%" },
			{ name: '36-50%', value: '23', unit:"%" },
			{ name: '51-75%', value: '22', unit:"%" },
			{ name: '76-100%', value: '40', unit:"%" }
		]
	};

	let container;

	onMount(() => {
		if (!data) return;

		const width = 350;
		const height = 350;

		d3.select(container).selectAll('*').remove();

		const root = d3
			.hierarchy(data)
			.sum((d) => +d.value)
			.sort((a, b) => b.value - a.value);

		const pack = d3.pack()
			.size([width, height])
			.padding(2); // Reduce padding for tighter packing

		const rootNode = pack(root);

		const nodes = rootNode.descendants();

		const svg = d3
			.select(container)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', `0 0 ${width} ${height}`)
			.attr('style', 'font-family: sans-serif; overflow: visible;');

		const tooltip = d3
			.select(container)
			.append('div')
			.style('position', 'absolute')
			.style('background', '#333')
			.style('color', '#fff')
			.style('padding', '4px 8px')
			.style('border-radius', '4px')
			.style('font-size', '12px')
			.style('pointer-events', 'none')
			.style('opacity', 0);

		const node = svg
			.selectAll('g')
			.data(nodes)
			.enter()
			.append('g')
			.attr('transform', (d) => `translate(${d.x},${d.y})`);

		node
			.append('circle')
			.attr('r', (d) => d.r)
			.attr('fill', (d, i) =>
				d.depth === 1 ? colorScheme[i % colorScheme.length] : 'none'
			)
			.attr('stroke', (d) => (d.depth === 0 ? '#999' : '#ccc'))
			.attr('stroke-width', (d) => (d.depth === 0 ? 1 : 0.5))
			.on('mouseover', function(event, d) {
				if (d.depth === 1) {
					tooltip.style('opacity', 1).html(`<strong>${d.data.name}:</strong> ${d.data.value}% of students`);
					// Get the fill color of the bubble
					const fill = d3.select(this).attr('fill');
					// Use d3 to darken the color
					const darker = d3.color(fill)?.darker(1.2).formatHex() || '#555';
					d3.select(this)
						.attr('stroke', darker)
						.attr('stroke-width', 3);
				}
			})
			.on('mousemove', (event) => {
				const containerRect = container.getBoundingClientRect();
				tooltip
					.style('left', (event.clientX - containerRect.left + 10) + 'px')
					.style('top', (event.clientY - containerRect.top - 20) + 'px');
			})
			.on('mouseleave', function(event, d) {
				tooltip.style('opacity', 0);
				if (d.depth === 1) {
					d3.select(this)
						.attr('stroke', '#ccc')
						.attr('stroke-width', 1);
				}
			});

		node
			.filter((d) => d.depth === 1)
			.append('text')
			.text((d) => d.data.name)
			.attr('text-anchor', 'middle')
			.attr('dy', '0.3em')
			.style('fill', '#000')
			.style('font-size', (d) => Math.min((2 * d.r) / d.data.name.length, 14) + 'px')
			.style('pointer-events', 'none');
	});
</script>

<div bind:this={container} ></div>

<style>
	div {
		position: relative;
	}
</style>
