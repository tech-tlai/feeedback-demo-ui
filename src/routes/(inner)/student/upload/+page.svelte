<script>
	import { FileUploadComponent } from '$lib';
	import StepsIndicator from '$lib/components/StepsIndicator.svelte';
	import CommonDashCard from '$lib/components/CommonDashCard.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { studentUploadState,studentListStore, studentUploadedFiles } from '$lib/stores/studentUploadState.js';
	import { onMount, onDestroy } from 'svelte';
	import { selectedClassStore, selectedStudentStore } from '$lib/stores/globalFilters';

	let currentStep = 0; // 0-based index for steps

	// Add as many steps as you want, just update the array
	const steps = [
		{ label: 'Upload data' },
		{ label: 'Select student' }
		// { label: 'Review & Submit' }, // Example: add more steps here
	];

	let files = [];

	let studentsList = [
		{ id: 1, name: 'Aarav Nair', grade: '10', section: 'A',className:'10A' },
		{ id: 2, name: 'Saanvi Das', grade: '10', section: 'A' ,className:'10A'},
		{ id: 3, name: 'Ishaan Gupta', grade: '10', section: 'B',className:'10B' },
		{ id: 4, name: 'Meera Menon', grade: '10', section: 'B',className:'10B' },
		{ id: 5, name: 'Aditya Pillai', grade: '10', section: 'C',className:'10C' },
		{ id: 6, name: 'Riya Sharma', grade: '10', section: 'C',className:'10C' },
		{ id: 7, name: 'Krishna Reddy', grade: '10', section: 'D',className:'10D' }
	];


	// Derive step states for the indicator
	$: stepsWithState = steps.map((step, i) => ({
		...step,
		complete: i < currentStep,
		active: i === currentStep
	}));

	// Helper to transform teachers to unique list with class_subject array
	// function transformStudentList(teachers) {
	// 	const studentMap = {};
	// 	(teachers || []).forEach((t) => {
	// 		if (!studentMap[t.studentId]) {
	// 			studentMap[t.studentId] = {
	// 				id: t.studentId,
	// 				name: t.name,
	// 				class_subject: []
	// 			};
	// 		}
	// 		(t.subjects || []).forEach((subj) => {
	// 			studentMap[t.studentId].class_subject.push({
	// 				class: t.className,
	// 				subject: subj
	// 			});
	// 		});
	// 	});
	// 	return Object.values(teacherMap);
	// }

	async function onStudentFileUploadSubmit(e) {
		const files = e.detail.files;
		const done = e.detail.done;

		if (!files || files.length === 0) {
			done && done();
			return;
		}
		// Store file in the teacherUploadedFiles store (single file)
		studentUploadedFiles.set(files);
		const formData = new FormData();
		formData.append('excel_file', files[0]);
		try {
			const res = await fetch('/apis/student/upload', { method: 'POST', body: formData });
			if (res.ok) {
				const data = await res.json();
				// const transformed = transformStudentList(data.teachers);
				studentListStore.set(data.students);
				studentsList = data.students;
				console.log('studentsList', studentsList);
				currentStep = 1;
				done && done();
			} else {
				const result = await res.json();
				const errorMsg = result?.error || 'Upload failed. Please try again.';
				console.log('errorMsg in uplaod', errorMsg);
				done && done(errorMsg);
			}
		} catch (err) {
			console.error('Student master data upload failed', err);
			done && done(err.message || 'Upload failed. Please try again.');
		}
	}

	function handleEntitySelected(e) {
		const { entity, selectedEntityId, selectedEntityName, selectedEntity } = e.detail;
		console.log('entitySelected event:', e.detail);

		selectedStudentStore.set({
			className: selectedEntity.className,
				// division: selectedEntity.className[1],
			subject: selectedEntity.subjects?.[0],
			studentId: selectedEntity.id,
			fullClassName: selectedEntity.className
		});
		goto(
			`/student/dashboard/${selectedEntity.id}?id=${encodeURIComponent(selectedEntity.id)}&&name=${encodeURIComponent(selectedEntity.name)}&&sub=${encodeURIComponent(selectedEntity.subject || '')}`
		);
		// console.log('selectedClassStore', $selectedClassStore);
		// You can perform any logic here, but do not navigate
		// For example, you could set a store, show a message, etc.
	}
</script>


<div class="px-12">
	<StepsIndicator steps={stepsWithState} />
	<div class="mt-16">
		{#if currentStep === 0}
			<FileUploadComponent
				title="Upload Students' List"
				on:fileUploadSubmit={onStudentFileUploadSubmit}
			/>
		{/if}
		{#if currentStep === 1}
			<div class="grid max-w-md mx-auto mt-12">
				<h3 class="text-xl font-semibold mb-4 text-black text-center">Select Student</h3>
				<CommonDashCard
					title="Student Dashboard"
					description="View teacher profiles, assign classes, and monitor performance."
					image="/students-thumbnail.png"
					gradient="from-black/50 to-transparent"
					fileUploadHelperText="Upload student master data"
					entity="student"
					entityList={studentsList}
					dashboardUrl="/student/dashboard"
					comboPlaceholder="Search student..."
					on:entitySelected={handleEntitySelected}
				/>
			</div>
		{/if}
	</div>
</div>
