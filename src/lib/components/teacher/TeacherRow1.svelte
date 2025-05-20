<script>
	import { PerformanceSummary, LearningOutcome,  SectionTitle ,SubjectPerfTrend} from '$lib';
	import { selectedClassStore } from '$lib/stores/globalFilters.js';
</script>

<div class="flex w-full justify-center my-6">
	<SectionTitle title="Performance Dashboard" />
</div>
<div class="grid grid-cols-12 gap-5">
	<div class="col-span-3">
		<PerformanceSummary className={$selectedClassStore}/>
	</div>
	<div class="col-span-6">
		<SubjectPerfTrend />
	</div>
	<div class="col-span-3">
		<LearningOutcome />
	</div>
</div>
