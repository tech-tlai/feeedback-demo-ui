<script>
	import { createEventDispatcher } from 'svelte';
	let files = [];
	$: console.log('files', files);
	function handleFiles(event) {
		const newFiles = Array.from(event.target.files);
		files = [...files, ...newFiles];
	}

	function handleDrop(event) {
		event.preventDefault();
		const droppedFiles = Array.from(event.dataTransfer.files);
		files = [...files, ...droppedFiles];
	}

	function handleDragOver(event) {
		event.preventDefault();
	}

	function formatSize(size) {
		const ONE_MB = 1024 * 1024;
		const ONE_KB = 1024;

		if (size < ONE_MB) {
			return (size / ONE_KB).toFixed(1) + ' KB';
		} else {
			return (size / ONE_MB).toFixed(1) + ' MB';
		}
	}

	let uploadError = '';
	const dispatch = createEventDispatcher();

	$: uploadError = files && files?.length > 0 ? '' : uploadError;

	function handleSubmit() {
		if (files.length === 0) {
			uploadError = 'Please upload at least one file before submitting.';
			return;
		}
		uploadError = '';
		// Dispatch event to parent with all files
		dispatch('fileUploadSubmit', { files });
	}
</script>

<div class="p-8 bg-gray-50 ">
	<!-- <h1 class="text-2xl font-bold mb-6">Upload Files</h1> -->

	<div
		class="border-2 border-dashed border-gray-300 bg-white rounded-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition"
		on:drop={handleDrop}
		on:dragover={handleDragOver}
	>
		<p class="font-semibold text-lg mb-2">Drag and drop files here</p>
		<p class="text-gray-500 mb-4">Or click to select files from your computer</p>
		<label
			class="inline-block px-5 py-2 bg-accent-blue text-white font-medium rounded-lg cursor-pointer hover:bg-blue-600 transition"
		>
			Select Files
			<input
				type="file"
				multiple
				accept=".xls, .xlsx, .csv"
				class="hidden"
				on:change={handleFiles}
			/>
		</label>
	</div>

	{#if files.length > 0}
		<div class="mt-10">
			<h2 class="text-xl font-semibold mb-4">Uploaded Files</h2>
			<div class="border border-gray-200 rounded-lg overflow-hidden">
				<div class="grid grid-cols-2 bg-gray-100 p-3 font-semibold">
					<span>Name</span>
					<span>Size</span>
				</div>
				{#each files as file}
					<div
						class="grid grid-cols-2 p-3 border-t border-gray-100 bg-white hover:bg-gray-50 transition"
					>
						<span>{file.name}</span>
						<span class="text-blue-500">{formatSize(file.size)}</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	{#if uploadError}
		<p class="text-red-600 text-sm mt-4">{uploadError}</p>
	{/if}
	<div class="w-full flex justify-end">
		<button
			class="mt-8 px-6 py-2 bg-accent-blue text-white rounded-lg hover:bg-blue-600 transition"
			on:click={handleSubmit}
		>
			Submit
		</button>
	</div>
</div>
