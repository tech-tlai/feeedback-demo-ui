<script>
	import { goto } from '$app/navigation';
	import { CommonDashCard, MultiFileUpload } from '$lib';
	// Get students and teachers from the page data
	export let data;
	const { students = [], teachers = [] } = data || {};

	// Transform for SearchableComboBox: id, name
	const studentOptions = students.map((s) => ({ ...s, id: s.id, name: s.name }));
	const teacherOptions = teachers.map((t) => ({ ...t, id: t.id, name: t.name }));

	function handleEntitySelected(e) {
		const { entity, selectedEntityId, selectedEntityName, selectedEntity } = e.detail;
		if (entity === 'teacher') {
			const teacherId = selectedEntityId;
			const teacherName = encodeURIComponent(selectedEntityName || selectedEntity.name || '');
			const teacherSubject = encodeURIComponent(
				selectedEntity.subject || selectedEntity.subjects?.[0] || ''
			);
			// Optionally set selectedClassStore here if needed
			// selectedClassStore.set(...)
			goto(
				`/teacher/dashboard/${teacherId}?id=${teacherId}&&name=${teacherName}&&sub=${teacherSubject}`
			);
		} else if (entity === 'student') {
			goto('/student/dashboard');
		}
	}
</script>

<main
	class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6"
	id="content-section"
>
	<div class="w-full max-w-6xl mx-auto">
		<div class="text-center mb-10">
			<h1 class="text-3xl font-bold text-slate-800">Dashboard Portal</h1>
			<!-- <p class="mb-2 text-gray-dark">Pattom, Trivandrum</p>
			<h2 class="text-xl text-black">Dashboard Portal</h2> -->
		</div>

		<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
			
			<!-- Teacher Dashboard Card -->
			<CommonDashCard
				title="Teacher Dashboard"
				description="Analyze class performance, track student progress, and manage academic insights."
				image="/school-thumbnail.png"
				href="/teacher-dashboard"
				fileUploadHelperText="Upload class performance data"
				entity="teacher"
				entityList={teacherOptions}
				dashboardUrl="/teacher/dashboard"
				dataUploadPageUrl="/teacher/upload"
				comboPlaceholder="Search teacher..."
				on:entitySelected={handleEntitySelected}
			/>
			<!-- Student Dashboard Card -->
			<CommonDashCard
				title="Student Dashboard"
				description="Track your performance, view exam schedules, and get personalized insights."
				image="/students-thumbnail.png"
				gradient="from-black/50 to-transparent"
				fileUploadHelperText="Upload student performance data"
				entity="student"
				entityList={studentOptions}
				dashboardUrl="/student/dashboard"
				dataUploadPageUrl="/student/upload"
				comboPlaceholder="Search student..."
				on:entitySelected={handleEntitySelected}
			/>

		</div>
	</div>
</main>
