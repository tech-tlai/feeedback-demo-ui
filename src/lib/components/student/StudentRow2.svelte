<script>
	import {
		AllSubjectsProgressTrend,
		AllSubjectsPercentileTrend
	} from '$lib';

export let progressTrend={}
// export let percentileTrend=[]
// export let percentileTrendError=false
export let progressTrendError=false
</script>

<div class="grid grid-cols-12 gap-5">
	<div class="col-span-6">
		<AllSubjectsProgressTrend subjectData={progressTrend} error={progressTrendError}/>
	</div>
	<!-- <div class="col-span-6">
		<AllSubjectsPercentileTrend subjectData={percentileTrend} error={percentileTrendError} />
	</div> -->
</div>
