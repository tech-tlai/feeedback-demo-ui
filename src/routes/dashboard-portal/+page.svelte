<script>
	import { CommonDashCard, MultiFileUpload } from '$lib';
	// Get students and teachers from the page data
	export let data;
	const { students = [], teachers = [] } = data || {};

	// Transform for SearchableComboBox: id, name
	const studentOptions = students.map(s => ({ id: s.id, name: s.name }));
	const teacherOptions = teachers.map(t => ({ id: t.id, name: t.name }));
</script>

<main class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
	<div class="w-full max-w-6xl mx-auto">
		<div class="text-center mb-10">
			<h1 class="text-3xl font-bold text-slate-800">Govt. Higher Secondary School</h1>
			<p class="mb-2 text-gray-dark">Pattom, Trivandrum</p>
			<h2 class="text-xl text-black">Dashboard Portal</h2>
		</div>

		<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
			<!-- Student Dashboard Card -->
			<CommonDashCard
				title="Student Dashboard"
				description="Track your performance, view exam schedules, and get personalized insights."
				image="/students-thumbnail.png"
				href="/student-dashboard"
				gradient="from-black/50 to-transparent"
				fileUploadHelperText="Upload student performance data"
				entityList={studentOptions}
				
				comboPlaceholder="Search student..."
			/>

			<!-- Teacher Dashboard Card -->
			<CommonDashCard
				title="Teacher Dashboard"
				description="Analyze class performance, track student progress, and manage academic insights."
				image="/school-thumbnail.png"
				href="/teacher-dashboard"
				fileUploadHelperText="Upload class performance data"
				entityList={teacherOptions}
				
				comboPlaceholder="Search teacher..."
			/>
		</div>
	</div>
</main>
