<!-- <script>
	import { FileUploadComponent } from '$lib';

	let teacherFilesUploaded = false;

	async function onTeacherFileUploadSubmit(e) {
	const files = e.detail.files;
	const done = e.detail.done;
	if (!files || files.length === 0) { done && done(); return; }
	const formData = new FormData();
	files.forEach(file => formData.append('files', file));
	try {
		// Artificial delay to simulate submission
		await new Promise(res => setTimeout(res, 1500));
		const res = await fetch('/apis/teacher/upload', { method: 'POST', body: formData });
		if (res.ok) {
			teacherFilesUploaded = true;
			
		}
	} catch (err) {
		console.error('Teacher file upload failed', err);
	} finally {
		done && done();
	}
}
</script>

<div class="px-12">
	<div class="mt-20">
		<FileUploadComponent title="Upload Teachers' list" on:fileUploadSubmit={onTeacherFileUploadSubmit}/>
	</div>
</div> -->

<script>
	import { FileUploadComponent } from '$lib';
	import StepsIndicator from '$lib/components/StepsIndicator.svelte';
	import CommonDashCard from '$lib/components/CommonDashCard.svelte';
	import { teacherUploadedFiles } from '$lib/stores/teacherUploadStore.js';

	let currentStep = 0; // 0-based index for steps

	// Add as many steps as you want, just update the array
	const steps = [
		{ label: 'Upload teacher data' },
		{ label: 'Select teacher' }
		// Add more steps if needed
	];

	// Derive step states for the indicator
	$: stepsWithState = steps.map((step, i) => ({
		...step,
		complete: i < currentStep,
		active: i === currentStep
	}));

	async function onTeacherFileUploadSubmit(e) {
		const files = e.detail.files;
		const done = e.detail.done;
		
		if (!files || files.length === 0) {
			done && done();
			return;
		}
		// Store file in the teacherUploadedFiles store (single file)
		teacherUploadedFiles.set(files);
		const formData = new FormData();
		formData.append('excel_file', files[0]);
		try {
			const res = await fetch('/apis/teacher/upload', { method: 'POST', body: formData });
			if (res.ok) {
				const data = await res.json();
				teachersList = (data.teachers || []).map(t => ({
					id: t.teacherId + " " +t.className,
					name: t.teacherName + "("+t.className + " " +t.subjects[0]+")",
					subject: t.subjects[0],
					// className: t.className,
					class:t.className[0],
					division:t.className[1],

				}));
				
				console.log('teachersList',teachersList)
				currentStep = 1;
				done && done();
			} else {
				const result = await res.json();
				const errorMsg = result?.error || 'Upload failed. Please try again.';
				console.log('errorMsg in uplaod', errorMsg)
				done && done(errorMsg);
			}
		} catch (err) {
			console.error('Teacher master data upload failed', err);
			done && done(err.message || 'Upload failed. Please try again.');
		}
	}

	// Example teacher options, replace with real data as needed
	let teachersList = [
		{ id: 1, name: 'Mrs. Sharma', subject: 'Maths', section: 'A' },
		{ id: 2, name: 'Mr. Kumar', subject: 'Science', section: 'A' },
		{ id: 3, name: 'Ms. Iyer', subject: 'English', section: 'B' },
		{ id: 4, name: 'Mr. Singh', subject: 'Social', section: 'B' },
		{ id: 5, name: 'Ms. Reddy', subject: 'Hindi', section: 'C' }
	];
</script>

<div class="px-12">
	<StepsIndicator steps={stepsWithState} />
	<div class="mt-16">
		{#if currentStep === 0}
			<FileUploadComponent
				title="Upload Teachers' List"
				on:fileUploadSubmit={onTeacherFileUploadSubmit}
			/>
		{/if}
		{#if currentStep === 1}
			<div class="grid max-w-md mx-auto mt-12">
				<h3 class="text-xl font-semibold mb-4 text-black text-center">Select Teacher</h3>
				<CommonDashCard
					title="Teacher Dashboard"
					description="View teacher profiles, assign classes, and monitor performance."
					image="/school-thumbnail.png"
					gradient="from-black/50 to-transparent"
					fileUploadHelperText="Upload teacher master data"
					entity="teacher"
					entityList={teachersList}
					dashboardUrl="/teacher/dashboard"
					comboPlaceholder="Search teacher..."
				/>
			</div>
		{/if}
	</div>
</div>
