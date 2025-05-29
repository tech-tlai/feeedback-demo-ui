<script>
	export let size = 'medium'; // 'small', 'medium', 'large'

	// const sizeMap = {
	// 	small: '1.5rem',
	// 	medium: '2.5rem',
	// 	large: '3.5rem'
	// };
</script>

<div class="w-full p-4 bg-white rounded-lg flex flex-col gap-4 animate-pulse ">
	<!-- Title section -->
	<div class="h-4 w-1/3 bg-gray-light rounded"></div>
	<div class="flex justify-between text-sm text-gray-400">
		<div class="h-3 w-1/4 bg-gray-light rounded"></div>
		<div class="h-3 w-1/4 bg-gray-light rounded"></div>
	</div>

	<!-- Graph card -->
	<div class="bg-gray-light rounded-lg p-4">
		<!-- Graph axes and line placeholders -->
		<div class="h-64 w-full relative">
			<!-- Y-axis lines -->
			{#each Array(5) as _, i}
				<div
					class="absolute left-0 right-0 h-px bg-white/50"
					style={`top: ${(i + 1) * 20}px;`}
				></div>
			{/each}

			<!-- Graph line -->
			<div class="absolute left-0 right-0 h-1 bg-white/70 rounded-full top-1/2"></div>

			<!-- Dots -->
			<div class="absolute top-[45%] left-[15%] w-4 h-4 bg-white/80 rounded-full"></div>
			<div class="absolute top-[42%] left-[45%] w-4 h-4 bg-white/80 rounded-full"></div>
			<div class="absolute top-[38%] left-[75%] w-4 h-4 bg-white/80 rounded-full"></div>
		</div>
	</div>
</div>
