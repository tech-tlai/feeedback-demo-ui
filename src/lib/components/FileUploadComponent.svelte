<script>
	import { MultiFileUpload } from '$lib';
	
	export let title = 'Upload answer sheets';
	export let maxFileSize = '5';
	export let sampleFileUrl = '';
    export let files=[]
</script>

<div class=" card max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-sm">
	<div class="text-center mb-8">
		<h2 class="text-2xl font-bold text-black mb-2">{title}</h2>
		<p class="text-base text-gray-dark max-w-2xl mx-auto">Support for CSV and Excel.</p>
	</div>

	<a
		class="link-btn mb-2 flex gap-2"
		href={sampleFileUrl}
		download
		target="_blank"
		rel="noopener noreferrer"
	>
		Download sample template
	</a>
	<MultiFileUpload {maxFileSize} {files} on:fileUploadSubmit on:fileRemove/>
</div>
