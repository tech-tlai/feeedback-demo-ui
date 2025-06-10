<script>
	import { createEventDispatcher } from 'svelte';
	import { Upload, CheckCircle, FileText, Target, Shield, Award, Loader2 } from 'lucide-svelte';

	export let uploadText = 'Click to upload files';
	export let dragText = 'or drag and drop';
	export let fileTypes = '.csv,.xlsx,.xls';
	export let placeholderImage = '/placeholder.svg?height=120&width=120&query=file upload icon';
	export let maxFileSize = 5;
	export let files = [];

	let isDragOver = false;
	let isSubmitting = false;
	let submittedIndexes = [];
	const id = Math.ceil(Math.random() * 1000) + 1;
	
	function handleFiles(event) {
		const newFiles = Array.from(event.target.files);
		const existingNames = files.map((f) => f.name);
		const filteredFiles = newFiles.filter((f) => !existingNames.includes(f.name));
		if (filteredFiles.length < newFiles.length) {
			uploadError = 'Some files were already added and have been skipped.';
		}
		files = [...files, ...filteredFiles];
	}

	function handleDrop(event) {
		event.preventDefault();
		isDragOver = false;
		const droppedFiles = Array.from(event.dataTransfer.files);
		const existingNames = files.map((f) => f.name);
		const filteredFiles = droppedFiles.filter((f) => !existingNames.includes(f.name));
		if (filteredFiles.length < droppedFiles.length) {
			uploadError = 'Some files were already added and have been skipped.';
		}
		files = [...files, ...filteredFiles];
	}

	function handleDragOver(event) {
		event.preventDefault();
		isDragOver = true;
	}
	function handleDragLeave(event) {
		event.preventDefault();
		isDragOver = false;
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
	$: if (!isSubmitting && files.length === 0) {
		uploadError = '';
	}

	function handleSubmit() {
		if (files.length === 0) {
			uploadError = 'Please upload at least one file before submitting.';
			return;
		}
		uploadError = '';
		isSubmitting = true;
		dispatch('fileUploadSubmit', {
			files,
			done: () => {
				isSubmitting = false;
				submittedIndexes = files.map((_, idx) => idx);
			}
		});
	}

	// function removeFile(indexOfItem) {
	// 	files = files.filter((_, index) => index !== indexOfItem);
	// submittedIndexes = submittedIndexes.filter((idx) => idx !== indexOfItem);
	// }
	function handleRemove(indexOfItem) {
		submittedIndexes = submittedIndexes.filter((idx) => idx !== indexOfItem);
		dispatch('fileRemove', { index: indexOfItem });
	}

	$: allFilesSubmitted = files.length > 0 && submittedIndexes.length === files.length;
</script>

<div>
	<!-- <h1 class="text-2xl font-bold mb-6">Upload Files</h1> -->

	<div
		class="mb-6 border-2 border-dashed border-gray-300 bg-white rounded-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition {isDragOver
			? 'border-accent-blue/70 bg-accent-blue/10'
			: ''}"
		on:drop={handleDrop}
		on:dragover={handleDragOver}
		on:dragleave={handleDragLeave}
	>
		<div class="mb-4 w-full flex justify-center">
			<Upload
				class="h-12 w-12 p-2 rounded-lg  bg-gradient-to-r from-accent-blue/50 to-accent-blue/10"
			/>
		</div>

		<label for={`file-upload-${id}`} class="cursor-pointer">
			<p class="font-semibold text-lg mb-2">Drag and drop files here</p>
			<p class=" mb-4">
				Or <span class="text-accent-blue">click to select files</span> from your computer
			</p>
		</label>

		<input
			id={`file-upload-${id}`}
			type="file"
			multiple
			accept={fileTypes}
			on:change={handleFiles}
			class="hidden"
		/>
		<p class="mb-2">Maximum file size: {maxFileSize} MB</p>
	</div>

	{#if files.length > 0}
		<div
			class="space-y-3 rounded-lg p-4 {allFilesSubmitted
				? 'bg-green-light'
				: 'bg-gradient-to-r from-accent-blue/20 to-accent-blue/10'}"
		>
			<h4
				class="font-medium flex items-center gap-2 {allFilesSubmitted
					? 'text-green-dark'
					: 'text-black'}"
			>
				<CheckCircle class="h-4 w-4" />
				{allFilesSubmitted ? 'All files added!' : 'Files to upload'}
			</h4>
			{#each files as file, index}
				<div class="flex items-center gap-3 text-sm text-gray-dark bg-white rounded-lg p-2">
					<FileText class="h-4 w-4 text-purple" />
					<span class="flex-1">{file.name}</span>
					{#if submittedIndexes && submittedIndexes.includes(index)}
						<span class="text-xs text-green-dark">✓ Submitted</span>
					{:else}
						<button
							on:click={() => handleRemove(index)}
							class="text-red-dark hover:text-red-dark/80 text-xs"
						>
							Remove
						</button>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
	{#if uploadError}
		<p class="text-red-600 text-sm mt-4">{uploadError}</p>
	{/if}
	<div class="w-full flex justify-end">
		{#if files?.length > 0 && !allFilesSubmitted}
			<button
				class="mt-8 px-6 py-2 bg-accent-blue text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-dark disabeld:cursor-not-allowed flex items-center gap-2"
				on:click={handleSubmit}
				disabled={isSubmitting}
			>
				{#if isSubmitting}
					<Loader2 class="animate-spin h-5 w-5" /> Submitting
				{:else}
					Submit
				{/if}
			</button>
		{/if}
	</div>
</div>
