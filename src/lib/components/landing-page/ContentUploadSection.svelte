<script>
import MultiFileUpload from '$lib/components/MultiFileUpload.svelte';
import { goto } from '$app/navigation';

let teacherFilesUploaded = false;
let answerFilesUploaded = false;
let generateBtnDisabled = true;

async function onTeacherFileUploadSubmit(e) {
	const files = e.detail.files;
	const done = e.detail.done;
	if (!files || files.length === 0) { done && done(); return; }
	const formData = new FormData();
	files.forEach(file => formData.append('files', file));
	try {
		// Artificial delay to simulate submission
		await new Promise(res => setTimeout(res, 1500));
		// const res = await fetch('/apis/teacher/upload', { method: 'POST', body: formData });
		teacherFilesUploaded = true;
		checkEnableGenerate();
		if (res.ok) {
		}
	} catch (err) {
		console.error('Teacher file upload failed', err);
	} finally {
		done && done();
	}
}

async function onAnswerFileUploadSubmit(e) {
	const files = e.detail.files;
	const done = e.detail.done;
	if (!files || files.length === 0) { done && done(); return; }
	const formData = new FormData();
	files.forEach(file => formData.append('files', file));
	try {
		// Artificial delay to simulate submission
		await new Promise(res => setTimeout(res, 1500));
		// const res = await fetch('/apis/data-upload/answers', { method: 'POST', body: formData });
		answerFilesUploaded = true;
		checkEnableGenerate();
		if (res.ok) {
		}
	} catch (err) {
		console.error('Answer file upload failed', err);
	} finally {
		done && done();
	}
}

function checkEnableGenerate() {
	generateBtnDisabled = !(teacherFilesUploaded && answerFilesUploaded);
}

function handleGenerateFeedback() {
	goto('/dashboard-portal');
}
</script>

<div class="flex gap-6 mb-6">
	<div class="w-1/2 max-w-6xl mx-auto p-4 border rounded-lg">
		<h1 class="text-black font-semibold mb-2">Step 1: Teacher Data Upload <span class="text-red-600">*</span></h1>
		<p class="text-gray-dark mb-6">Upload teacher's master data here</p>
		<MultiFileUpload on:fileUploadSubmit={onTeacherFileUploadSubmit} />
	</div>
	<div class="w-1/2 max-w-6xl mx-auto p-4 border rounded-lg">
		<h1 class="text-black font-semibold mb-2">Step 2: Answer Sheets Upload <span class="text-red-600">*</span></h1>
		<p class="text-gray-dark mb-6">Upload asnwer sheets here</p>
		<MultiFileUpload on:fileUploadSubmit={onAnswerFileUploadSubmit} />
	</div>
</div>
<div class="w-full flex justify-center">
    <button class="primary-btn "  on:click={handleGenerateFeedback}>Generate Feedback</button>
</div>
