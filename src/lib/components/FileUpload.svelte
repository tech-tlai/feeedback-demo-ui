<script>
import { createEventDispatcher } from 'svelte';

export let helperText='Upload file'

let fileInput;
let selectedFile;
const dispatch = createEventDispatcher();

function handleFileSelect(e){
	fileInput.click();
}
function onFileSelected(e){
    	const file = e.target.files[0];
		if (file) {
			selectedFile = file;
			console.log('selectedFile', selectedFile);
			dispatch('fileSelected', file);
		}

}
</script>

<div
	class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center  bg-gray-50 cursor-pointer transition-colors duration-200 hover:bg-gray-100 flex flex-col items-center justify-center h-full"
	on:click={handleFileSelect}
>
	<!-- Upload icon -->
	<div class="text-blue-500 mb-2">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="40"
			height="40"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
			<polyline points="17 8 12 3 7 8"></polyline>
			<line x1="12" y1="3" x2="12" y2="15"></line>
		</svg>
	</div>
	{#if selectedFile}
		<p class="text-center font-medium text-accent-blue">{selectedFile.name} uploaded</p>
	{:else}
		<p class="text-center font-medium">{helperText}</p>
	{/if}
	<p class="text-center text-sm text-gray-500 mt-1">Supported format: XLS</p>
	<input
		type="file"
		bind:this={fileInput}
		on:change={onFileSelected}
		accept=".xls, .xlsx"
		class="hidden"
	/>
</div>
