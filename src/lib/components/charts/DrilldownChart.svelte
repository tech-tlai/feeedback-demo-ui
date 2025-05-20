<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { markBrackets } from '$lib/data.js';

	export let data = markBrackets;
	let container;
	let root;
	let focus;
	let svg;
	let view;

	const width = 400;
	const height = 400;
	const format = d3.format(',d');
	const color = d3
		.scaleLinear()
		.domain([0, 5])
		.range(['#dae8fc', '#00529b'])
		.interpolate(d3.interpolateHcl);

	function createChart(data) {
		root = d3.pack().size([width, height]).padding(3)(
			d3
				.hierarchy(data)
				.sum((d) => d.value || 1)
				.sort((a, b) => b.value - a.value)
		);

		focus = root;

		svg = d3
			.select(container)
			.append('svg')
			.attr('viewBox', `-${width / 2} -${height / 2} ${width} ${height}`)
			.attr('width', width)
			.attr('height', height)
			.style('cursor', 'pointer')
			.on('click', (event) => zoom(event, root));

		const node = svg
			.append('g')
			.selectAll('circle')
			.data(root.descendants())
			.join('circle')
			.attr('fill', (d) => (d.children ? color(d.depth) : 'white'))
			.attr('stroke', (d) => (d.children ? d3.rgb(color(d.depth)).darker() : '#999'))
			.attr('pointer-events', (d) => (!d.children ? 'none' : null))
			.on('click', (event, d) => {
				if (focus !== d) {
					zoom(event, d);
					event.stopPropagation();
				}
			});

		const label = svg
			.append('g')
			.style('font', 'bold 14px sans-serif')
			.attr('text-anchor', 'middle')
			.selectAll('text')
			.data(root.descendants())
			.join('text')
			.style('fill-opacity', (d) => (d.parent === root ? 1 : 0))
			.style('display', (d) => (d.parent === root ? 'inline' : 'none'))
			.text((d) => (d.children ? d.data.name : ''));

		zoomTo([root.x, root.y, root.r * 2]);

		function zoomTo(v) {
			const k = width / v[2];

			view = v;

			label.attr('transform', (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
			node.attr('transform', (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
			node.attr('r', (d) => d.r * k);
		}

		function zoom(event, d) {
			focus = d;

			const transition = svg
				.transition()
				.duration(event.altKey ? 7500 : 750)
				.tween('zoom', (d) => {
					const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
					return (t) => zoomTo(i(t));
				});

			label
				.transition(transition)
				.style('fill-opacity', (d) => (d.parent === focus ? 1 : 0))
				.style('display', (d) => (d.parent === focus ? 'inline' : 'none'))
				.text((d) => (d.children ? d.data.name : d.parent === focus ? d.data.name : ''));
		}
	}

	onMount(() => {
		createChart(data);
	});
</script>

<div bind:this={container} class="w-full h-full"></div>

<style>
	svg {
		display: block;
		margin: auto;
	}
</style>
