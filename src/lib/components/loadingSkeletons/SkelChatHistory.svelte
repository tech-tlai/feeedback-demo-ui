<script>
	export let rows = 5;
	export let size = 'medium'; // 'small', 'medium', 'large'

	const sizeMap = {
		small: '1.5rem',
		medium: '2.5rem',
		large: '3.5rem'
	};
</script>

<div class="w-full p-4 bg-white rounded-lg flex flex-col gap-4">
	{#each Array(rows) as _, i (i)}
		<div
			class="p-4 bg-gray-light animate-pulse rounded-lg"
			style={`min-height: ${sizeMap[size] || sizeMap.medium}`}></div>
	{/each}
</div>
