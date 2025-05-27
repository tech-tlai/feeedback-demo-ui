<script>
	import { goto } from '$app/navigation';
	import { FileUpload } from '$lib';
	export let title = 'Card title';
	export let description =
		'card description - lorem ipsum';
	export let image = '/placeholder.jpg';
	export let href = '/location';
	// export let highlight = 'Class Reports Updated';
	// export let highlightColor = 'text-blue-600';
	export let buttonText = 'View';
	export let gradient = 'from-blue-400 to-cyan-500';
	export let icon = 'teacher'; // for future extensibility
    export let fileUploadHelperText='Upload file'

	let uploadedFile = null;
	let uploadError = '';

	function handleFileSelected(e) {
		uploadedFile = e.detail;
		uploadError = '';
	}

	function handleButtonClick() {
		if (!uploadedFile) {
			uploadError = 'Please upload a file before proceeding.';
			return;
		}
		goto(href)
	}
</script>

<div
	class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[100.5%] hover:shadow-xl"
>
	<div class="h-64 bg-gradient-to-r {gradient} relative overflow-hidden">
		<img src={image} alt={title} class="w-full h-full object-cover" />
		<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
			<div class="p-4 text-white">
				<!-- <div class="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
						/>
					</svg>
					<span class="text-sm font-medium">Monitor class performance</span>
				</div> -->
			</div>
		</div>
	</div>
	<div class="p-6">
		<h3 class="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
		<p class="text-slate-600 mb-4">
			{description}
		</p>
		<div class="mb-4">
			<FileUpload on:fileSelected={handleFileSelected} helperText={fileUploadHelperText}/>
			{#if uploadError}
				<p class="text-red-600 text-sm mt-2">{uploadError}</p>
			{/if}
		</div>
		<div class="flex items-center justify-end">
			<!-- <div class="flex items-center gap-2 {highlightColor}">
				<span class="text-sm font-medium">{highlight}</span>
				<div class="w-2 h-2 rounded-full bg-green-500"></div>
			</div> -->
			<button
				type="button"
				class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
				on:click={handleButtonClick}
			>
				{buttonText}
			</button>
		</div>
	</div>
</div>
