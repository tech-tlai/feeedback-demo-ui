<script>
	import {
		TopPerformers,
		SectionWiseScore,
		StudentsAtRisk,
		AttendanceSheet,
		PerformanceAnalysis,
		TeacherPerfAnalysis
	} from '$lib';
	export let topPerformers = [];
	export let studentsAtRisk = [];
	export let perfAnalysis = {};
	export let sectionWiseData = {};
	export let sectionWiseError = '';
	export let chartDataError = '';
	// export let perfAnalysis = {
	// 	achievement: { feedback: [] },
	// 	roomForImprovement: { feedback: [] },
	// 	suggestions: { feedback: [] }
	// };
</script>

<div class="grid grid-cols-12 gap-5">
	<div class="col-span-4">
		<TopPerformers
			studentData={topPerformers}
			error={chartDataError ? `Failed to load top performers. ${chartDataError}` : ''}
		/>
	</div>
	<div class="col-span-5">
		<StudentsAtRisk
			studentData={studentsAtRisk}
			error={chartDataError ? `Failed to load Students at risk. ${chartDataError}` : ''}
		/>
	</div>
	<div class="col-span-3">
		<AttendanceSheet
			studentData={[...topPerformers, ...studentsAtRisk]}
			error={chartDataError ? `Failed to load attendance sheet. ${chartDataError}` : ''}
		/>
	</div>
</div>

<div class="grid grid-cols-12 gap-5">
	<div class="col-span-12">
		<TeacherPerfAnalysis
			perfData={perfAnalysis}
			error={chartDataError
				? `Failed to load class performance analysis data. ${chartDataError}`
				: ''}
		/>
	</div>
	<div class="col-span-6">
		<SectionWiseScore
			{sectionWiseData}
			error={sectionWiseError
				? `Failed to load section wise performance data. ${sectionWiseError}`
				: ''}
		/>
	</div>
</div>
