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
	export let sectionWiseData={}
	// export let perfAnalysis = {
	// 	achievement: { feedback: [] },
	// 	roomForImprovement: { feedback: [] },
	// 	suggestions: { feedback: [] }
	// };
</script>

<div class="grid grid-cols-12 gap-5">
	<div class="col-span-4">
		<TopPerformers studentData={topPerformers} />
	</div>
	<div class="col-span-5">
		<StudentsAtRisk studentData={studentsAtRisk} />
	</div>
	<div class="col-span-3">
		<AttendanceSheet studentData={[...topPerformers, ...studentsAtRisk]} />
	</div>
</div>

<div class="grid grid-cols-12 gap-5">
	<div class="col-span-12">
		<TeacherPerfAnalysis perfData={perfAnalysis} />
	</div>
	<div class="col-span-6">
		<SectionWiseScore {sectionWiseData}/>
	</div>
</div>
