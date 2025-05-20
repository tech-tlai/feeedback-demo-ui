<script>
	import {
		TopPerformers,
		SectionWiseScore,
		StudentsAtRisk,
		AttendanceSheet,
		PerformanceAnalysis,
		TeacherPerfAnalysis
	} from '$lib';
</script>

<div class="grid grid-cols-12 gap-5">
	<div class="col-span-4">
		<TopPerformers />
	</div>
	<div class="col-span-5">
		<StudentsAtRisk />
	</div>
	<div class="col-span-3">
		<AttendanceSheet />
	</div>
</div>

<div class="grid grid-cols-12 gap-5">
	<div class="col-span-12">
		<TeacherPerfAnalysis />
	</div>
	<div class="col-span-6">
		<SectionWiseScore />
	</div>
</div>
