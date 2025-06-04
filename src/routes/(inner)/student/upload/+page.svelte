<script>
	import { FileUploadComponent } from '$lib';
	import StepsIndicator from '$lib/components/StepsIndicator.svelte';
	import CommonDashCard from '$lib/components/CommonDashCard.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { studentUploadState } from '$lib/stores/studentUploadState.js';
	import { onMount } from 'svelte';

	let currentStep = 0; // 0-based index for steps


	// Add as many steps as you want, just update the array
	const steps = [
		{ label: 'Upload data' },
		{ label: 'Select student' }
		// { label: 'Review & Submit' }, // Example: add more steps here
	];

	let files;

	// Restore files from store on mount


	// Derive step states for the indicator
	$: stepsWithState = steps.map((step, i) => ({
		...step,
		complete: i < currentStep,
		active: i === currentStep
	}));

	async function onAnswerSheetUploadSubmit(e) {
		 files = e.detail.files;
		 studentUploadState.update(state => ({ ...state, files })); // Save to store
		const done = e.detail.done;
		if (!files || files.length === 0) {
			done && done();
			return;
		}
		const formData = new FormData();
		files.forEach((file) => formData.append('files', file));
		try {
			// Artificial delay to simulate submission
			await new Promise((res) => setTimeout(res, 1500));
			const res = await fetch('/apis/teacher/upload', { method: 'POST', body: formData });
			if (res.ok) {
				currentStep = 1; // Move to next step
				// goto(`?step=1`, { replaceState: false }); // This adds to history
			}
		} catch (err) {
			console.error('Teacher file upload failed', err);
		} finally {
			done && done();
		}
	}

	// Example student options, replace with real data as needed
	let studentsList = [
		{ id: 1, name: 'Aarav Nair', grade: '10', section: 'A' },
		{ id: 2, name: 'Saanvi Das', grade: '10', section: 'A' },
		{ id: 3, name: 'Ishaan Gupta', grade: '10', section: 'B' },
		{ id: 4, name: 'Meera Menon', grade: '10', section: 'B' },
		{ id: 5, name: 'Aditya Pillai', grade: '10', section: 'C' },
		{ id: 6, name: 'Riya Sharma', grade: '10', section: 'C' },
		{ id: 7, name: 'Krishna Reddy', grade: '10', section: 'D' }
	];
</script>

<div class="px-12">
	<StepsIndicator steps={stepsWithState} />
	<div class="mt-16">
		{#if currentStep === 0}
			<FileUploadComponent
				title="Upload Answer sheets"
				on:fileUploadSubmit={onAnswerSheetUploadSubmit}
			/>
		{/if}
		{#if currentStep === 1}
			<div class="grid max-w-md mx-auto  mt-12">
			<h3 class="text-xl font-semibold mb-4 text-black text-center">Select Student</h3>
			
				<CommonDashCard
					title="Student Dashboard"
					description="Track your performance, view exam schedules, and get personalized insights."
					image="/students-thumbnail.png"
					gradient="from-black/50 to-transparent"
					fileUploadHelperText="Upload student performance data"
					entity="student"
					entityList={studentsList}
					dashboardUrl="/student/dashboard"
					comboPlaceholder="Search student..."
				/>
			</div>
		{/if}
	</div>
</div>
